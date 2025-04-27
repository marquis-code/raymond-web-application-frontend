<template>
    <div 
      class="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 transition transform hover:shadow-md hover:-translate-y-1 duration-300"
      v-motion-slide-visible
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <ReturnIcon v-if="icon === 'return-icon'" />
            <BanIcon v-else-if="icon === 'ban-icon'" />
            <DamageIcon v-else-if="icon === 'damage-icon'" />
            <RefundIcon v-else-if="icon === 'refund-icon'" />
          </div>
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
          <p class="mt-2 text-sm text-gray-500">{{ description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  });
  </script>