<template>
    <div class="flex flex-col h-full">
      <!-- User Info Form Modal -->
      <UserInfoForm
        v-if="chatState.showUserInfoForm"
        @submit="handleUserInfoSubmit"
        @cancel="chatState.showUserInfoForm = false"
      />
      
      <!-- Chat Header -->
      <div class="bg-black text-white p-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256">
              <path d="M168,112a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,112Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm72-8A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-medium">Art Support</h3>
            <p class="text-xs text-white/80">
              <span v-if="chatState.connectionStatus === 'connecting'">Connecting...</span>
              <span v-else-if="chatState.connectionStatus === 'connected'">We typically reply in a few minutes</span>
              <span v-else-if="chatState.connectionStatus === 'error'">Connection error</span>
              <span v-else>Disconnected</span>
            </p>
          </div>
        </div>
        <button @click="$emit('close')" class="text-white/80 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
        </button>
      </div>
      
      <!-- Chat Messages -->
      <div 
        ref="messagesContainer"
        class="flex-grow p-4 overflow-y-auto bg-gray-50"
      >
        <div v-if="chatState.messages.length === 0" class="flex flex-col items-center justify-center h-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#d1d5db" viewBox="0 0 256 256" class="mb-2">
            <path d="M168,112a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,112Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm72-8A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
          </svg>
          <p class="text-gray-500">Start a conversation with us!</p>
          <p class="text-sm text-gray-400 mt-1">Type a message below to begin</p>
        </div>
        
        <TransitionGroup 
          name="message" 
          tag="div" 
          class="space-y-4"
        >
          <div 
            v-for="message in chatState.messages" 
            :key="message._id || message.timestamp.getTime()"
            class="flex"
            :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div 
              class="max-w-[80%] rounded-lg p-3"
              :class="{
                'bg-black text-white rounded-tr-none': message.sender === 'user',
                'bg-white text-gray-800 rounded-tl-none shadow-sm': message.sender === 'admin',
                'bg-blue-100 text-blue-800 rounded-md text-center': message.sender === 'system'
              }"
            >
              <p class="text-sm">{{ message.message }}</p>
              <p class="text-xs mt-1 opacity-70 text-right">
                {{ formatTime(message.timestamp) }}
              </p>
            </div>
          </div>
        </TransitionGroup>
        
        <div v-if="chatState.isTyping" class="flex mt-4">
          <div class="bg-white rounded-lg p-3 shadow-sm">
            <div class="flex gap-1">
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Chat Input -->
      <div class="p-3 border-t border-gray-200 bg-white">
        <form @submit.prevent="handleSendMessage" class="flex gap-2">
          <input 
            v-model="newMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-1 px-4 py-3 border border-gray-300 outline-none rounded-full focus:ring-2 focus:ring-black focus:border-black transition-colors duration-300"
            :disabled="!chatState.isConnected || chatState.isTyping"
            @input="handleTyping"
            @blur="stopTyping"
          />
          <button 
            type="submit"
            class="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50"
            :disabled="!newMessage.trim() || !chatState.isConnected || chatState.isTyping"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#ffffff" viewBox="0 0 256 256">
              <path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, nextTick } from 'vue'
  import { useUserChat, type UserInfo } from '@/composables/core/useUserChat'
  
  const emit = defineEmits<{
    close: []
  }>()
  
  const { state: chatState, initializeChat, sendMessage, sendTypingIndicator } = useUserChat()
  
  const messagesContainer = ref<HTMLElement | null>(null)
  const newMessage = ref('')
  const typingTimeout = ref<NodeJS.Timeout | null>(null)
  
  // Scroll to bottom when messages change
  watch(() => chatState.messages, () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }, { deep: true })
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  // Show user info form when first message is attempted
  const showUserInfoFormOnFirstMessage = () => {
    if (!chatState.value.userInfo && !chatState.value.showUserInfoForm) {
      chatState.value.showUserInfoForm = true
    }
  }
  
  // Handle user info form submission
  const handleUserInfoSubmit = async (userInfo: UserInfo, message: string) => {
    try {
      await initializeChat(userInfo, message)
    } catch (error) {
      console.error('Failed to initialize chat:', error)
      // Handle error (show toast, etc.)
    }
  }
  
  // Handle sending messages
  const handleSendMessage = async () => {
    if (!newMessage.value.trim()) return
    
    // If user info not provided, show form
    if (!chatState.value.userInfo) {
      showUserInfoFormOnFirstMessage()
      return
    }
    
    const message = newMessage.value.trim()
    newMessage.value = ''
    
    try {
      await sendMessage(message)
    } catch (error) {
      console.error('Failed to send message:', error)
      // Handle error (show toast, etc.)
    }
  }
  
  // Handle typing indicators
  const handleTyping = () => {
    if (!chatState.value.chatId) return
    
    sendTypingIndicator(true)
    
    if (typingTimeout.value) {
      clearTimeout(typingTimeout.value)
    }
    
    typingTimeout.value = setTimeout(() => {
      sendTypingIndicator(false)
    }, 1000)
  }
  
  const stopTyping = () => {
    if (typingTimeout.value) {
      clearTimeout(typingTimeout.value)
      typingTimeout.value = null
    }
    sendTypingIndicator(false)
  }
  </script>
  
  <style scoped>
  .message-enter-active,
  .message-leave-active {
    transition: all 0.3s ease;
  }
  
  .message-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .message-leave-to {
    opacity: 0;
  }
  </style>
  