import { ref, onMounted, onUnmounted } from "vue"
import { io, type Socket } from "socket.io-client"

export interface ChatMessage {
  _id?: string
  message: string
  sender: "USER" | "ADMIN" | "SYSTEM"
  timestamp: Date
  messageId?: string
}

export interface UserInfo {
  fullName: string
  email: string
}

export interface ChatState {
  chatId: string | null
  messages: ChatMessage[]
  isConnected: boolean
  isTyping: boolean
  userInfo: UserInfo | null
  showUserInfoForm: boolean
  connectionStatus: "connecting" | "connected" | "disconnected" | "error"
}

export const useUserChat = () => {
  const socket = ref<Socket | null>(null)
  const state = ref<ChatState>({
    chatId: null,
    messages: [],
    isConnected: false,
    isTyping: false,
    userInfo: null,
    showUserInfoForm: false,
    connectionStatus: "disconnected",
  })

  const connect = () => {
    if (socket.value?.connected) return

    state.value.connectionStatus = "connecting"

    socket.value = io("http://localhost:3000/chat", {
      transports: ["websocket"],
      autoConnect: true,
    })

    socket.value.on("connect", () => {
      console.log("Connected to chat server")
      state.value.isConnected = true
      state.value.connectionStatus = "connected"
    })

    socket.value.on("disconnect", () => {
      console.log("Disconnected from chat server")
      state.value.isConnected = false
      state.value.connectionStatus = "disconnected"
    })

    socket.value.on("connected", (data) => {
      console.log("Chat connection confirmed:", data)
    })

    socket.value.on("newMessage", (data) => {
      console.log("New message received:", data)
      state.value.messages.push({
        _id: data.messageId,
        message: data.message,
        sender: data.sender,
        timestamp: new Date(data.timestamp),
      })
    })

    socket.value.on("userTyping", (data) => {
      if (data.userInfo && data.userInfo.email !== state.value.userInfo?.email) {
        state.value.isTyping = data.isTyping
      }
    })

    socket.value.on("chatClosed", (data) => {
      console.log("Chat closed:", data)
      addSystemMessage(data.message || "This chat has been closed by an administrator.")
    })

    socket.value.on("announcement", (data) => {
      console.log("Announcement:", data)
      addSystemMessage(data.message)
    })

    socket.value.on("connect_error", (error) => {
      console.error("Connection error:", error)
      state.value.connectionStatus = "error"
    })
  }

  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect()
      socket.value = null
    }
    state.value.isConnected = false
    state.value.connectionStatus = "disconnected"
  }

  const initializeChat = async (userInfo: UserInfo, initialMessage: string) => {
    if (!socket.value?.connected) {
      throw new Error("Not connected to chat server")
    }

    return new Promise((resolve, reject) => {
      socket.value?.emit(
        "initChat",
        {
          email: userInfo.email,
          fullName: userInfo.fullName,
          message: initialMessage,
        },
        (response: any) => {
          if (response.success) {
            state.value.chatId = response.chatId
            state.value.userInfo = userInfo
            state.value.messages = response.messages.map((msg: any) => ({
              _id: msg._id,
              message: msg.message,
              sender: msg.sender,
              timestamp: new Date(msg.timestamp),
            }))
            state.value.showUserInfoForm = false

            // Join the chat room
            socket.value?.emit("joinChat", { chatId: response.chatId })

            // Send user presence
            socket.value?.emit("userPresence", {
              chatId: response.chatId,
              status: "online",
            })

            resolve(response)
          } else {
            reject(new Error(response.error || "Failed to initialize chat"))
          }
        },
      )
    })
  }

  const sendMessage = async (message: string) => {
    if (!socket.value?.connected || !state.value.chatId) {
      throw new Error("Not connected or chat not initialized")
    }

    return new Promise((resolve, reject) => {
      socket.value?.emit(
        "sendMessage",
        {
          chatId: state.value.chatId,
          message,
          sender: "user",
        },
        (response: any) => {
          if (response.success) {
            resolve(response)
          } else {
            reject(new Error(response.error || "Failed to send message"))
          }
        },
      )
    })
  }

  const sendTypingIndicator = (isTyping: boolean) => {
    if (!socket.value?.connected || !state.value.chatId) return

    socket.value.emit("typing", {
      chatId: state.value.chatId,
      isTyping,
      userInfo: state.value.userInfo,
    })
  }

  const addSystemMessage = (message: string) => {
    state.value.messages.push({
      message,
      sender: "SYSTEM",
      timestamp: new Date(),
    })
  }

  const getChatHistory = async (limit = 50, offset = 0) => {
    if (!socket.value?.connected || !state.value.chatId) return

    return new Promise((resolve, reject) => {
      socket.value?.emit(
        "getChatHistory",
        {
          chatId: state.value.chatId,
          limit,
          offset,
        },
        (response: any) => {
          if (response.success) {
            resolve(response)
          } else {
            reject(new Error(response.error || "Failed to get chat history"))
          }
        },
      )
    })
  }

  const leaveChat = () => {
    if (socket.value?.connected && state.value.chatId) {
      socket.value.emit("leaveChat", { chatId: state.value.chatId })
      socket.value.emit("userPresence", {
        chatId: state.value.chatId,
        status: "offline",
      })
    }
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    leaveChat()
    disconnect()
  })

  return {
    state: state,
    connect,
    disconnect,
    initializeChat,
    sendMessage,
    sendTypingIndicator,
    getChatHistory,
    leaveChat,
    addSystemMessage,
  }
}
