<template>
    <div class="flex flex-col h-full">
      <!-- Chat Header -->
      <div class="bg-black text-white p-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <!-- <Icon name="lucide:message-circle" size="18" class="text-primary" /> -->
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M168,112a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,112Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm72-8A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path></svg>
          </div>
          <div>
            <h3 class="font-medium">Art Support</h3>
            <p class="text-xs text-white/80">We typically reply in a few minutes</p>
          </div>
        </div>
        <button @click="$emit('close')" class="text-white/80 hover:text-white">
          <!-- <Icon name="lucide:x" size="20" /> -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
        </button>
      </div>
      
      <!-- Chat Messages -->
      <div 
        ref="messagesContainer"
        class="flex-grow p-4 overflow-y-auto bg-gray-50"
      >
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center">
          <!-- <Icon name="lucide:message-circle" size="48" class="text-gray-300 mb-2" /> -->
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#000000" viewBox="0 0 256 256"><path d="M168,112a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,112Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm72-8A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path></svg>
          <p class="text-gray-500">Start a conversation with us!</p>
        </div>
        
        <TransitionGroup 
          name="message" 
          tag="div" 
          class="space-y-4"
        >
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            class="flex"
            :class="message.isUser ? 'justify-end' : 'justify-start'"
          >
            <div 
              class="max-w-[80%] rounded-lg p-3"
              :class="message.isUser 
                ? 'bg-black text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none shadow-sm'"
            >
              <p>{{ message.text }}</p>
              <p class="text-xs mt-1 opacity-70 text-right">
                {{ formatTime(message.timestamp) }}
              </p>
            </div>
          </div>
        </TransitionGroup>
        
        <div v-if="isTyping" class="flex mt-4">
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
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input 
            v-model="newMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
            :disabled="isTyping"
          />
          <button 
            type="submit"
            class="p-2 bg-black text-white rounded-full hover:bg-black-dark transition-colors duration-300 disabled:opacity-50"
            :disabled="!newMessage.trim() || isTyping"
          >
            <!-- <Icon name="lucide:send" size="18" /> -->
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z"></path></svg>
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch, nextTick } from 'vue'
  
  interface ChatMessage {
    text: string
    isUser: boolean
    timestamp: Date
  }
  
  const messagesContainer = ref<HTMLElement | null>(null)
  const messages = ref<ChatMessage[]>([])
  const newMessage = ref('')
  const isTyping = ref(false)
  
  // Initial greeting
  onMounted(() => {
    setTimeout(() => {
      addBotMessage('Hello! Welcome to Raymond Aworo Art Gallery. How can I help you today?')
    }, 1000)
  })
  
  // Scroll to bottom when messages change
  watch(messages, () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  })
  
  const sendMessage = () => {
    if (!newMessage.value.trim() || isTyping.value) return
    
    // Add user message
    messages.value.push({
      text: newMessage.value,
      isUser: true,
      timestamp: new Date()
    })
    
    // Clear input
    const userMessage = newMessage.value
    newMessage.value = ''
    
    // Simulate bot typing
    isTyping.value = true
    setTimeout(() => {
      isTyping.value = false
      
      // Add bot response based on user message
      const response = getBotResponse(userMessage)
      addBotMessage(response)
    }, 1500)
  }
  
  const addBotMessage = (text: string) => {
    messages.value.push({
      text,
      isUser: false,
      timestamp: new Date()
    })
  }
  
  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('commission') || lowerMessage.includes('custom')) {
      return 'For commission requests, please fill out our commission form. You can find it on the Commission page. Would you like me to provide more details about the commission process?'
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return 'Our artwork prices vary based on size, medium, and complexity. Original artworks range from $500 to $3000, while prints start at $100. Is there a specific piece you\'re interested in?'
    } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return 'We offer worldwide shipping via DHL Express, FedEx, and USPS. Shipping times vary by location, but typically take 4-7 business days. All artworks are carefully packaged and insured for safe delivery.'
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return 'We accept various payment methods including credit/debit cards, bank transfers, and digital payment platforms. All transactions are secure and encrypted.'
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello there! How can I assist you with Raymond\'s artwork today?'
    } else if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?'
    } else {
      return 'Thank you for your message. If you have specific questions about artworks, commissions, or the ordering process, I\'m happy to help. You can also reach us directly at contact@raymondaworoart.com for personalized assistance.'
    }
  }
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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