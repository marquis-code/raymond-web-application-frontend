<template>
    <div class="border-b border-gray-200 last:border-b-0">
      <div 
        class="flex justify-between items-center py-4 cursor-pointer"
        @click="toggle"
        :class="{'text-indigo-700': isOpen, 'text-gray-900': !isOpen}"
      >
        <h3 class="text-lg font-medium">{{ title }}</h3>
        <div class="transform transition-transform duration-300" :class="{'rotate-180': isOpen}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="isOpen" class="pb-4">
          <slot></slot>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  });
  
  const isOpen = ref(props.index === 0); // First item is open by default
  
  const toggle = () => {
    isOpen.value = !isOpen.value;
  };
  </script>