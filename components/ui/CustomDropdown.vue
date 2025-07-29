<template>
    <div class="relative" ref="dropdownRef">
      <button
        @click="toggleDropdown"
        :class="[
          'w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-left flex items-center justify-between',
          { 'border-red-300 ring-2 ring-red-200': hasError }
        ]"
        :disabled="disabled"
      >
        <span :class="{ 'text-slate-400': !selectedOption, 'text-slate-800': selectedOption }">
          {{ selectedOption ? selectedOption.label : placeholder }}
        </span>
        <ChevronDown 
          :class="['w-5 h-5 text-slate-400 transition-transform duration-200', { 'rotate-180': isOpen }]" 
        />
      </button>
      
      <Transition name="dropdown">
        <div
          v-if="isOpen"
          class="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
        >
          <div
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors duration-150 flex items-center justify-between"
            :class="{ 'bg-blue-50 text-blue-700': selectedOption?.value === option.value }"
          >
            <span>{{ option.label }}</span>
            <Check v-if="selectedOption?.value === option.value" class="w-4 h-4 text-blue-600" />
          </div>
        </div>
      </Transition>
      
      <div v-if="hasError && errorMessage" class="mt-1 text-sm text-red-600 animate-pulse">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { ChevronDown, Check } from 'lucide-vue-next'
  
  interface Option {
    value: string | number
    label: string
  }
  
  interface Props {
    options: Option[]
    modelValue: string | number | null
    placeholder?: string
    disabled?: boolean
    hasError?: boolean
    errorMessage?: string
  }
  
  interface Emits {
    (e: 'update:modelValue', value: string | number | null): void
    (e: 'change', value: string | number | null): void
  }
  
  const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Select an option',
    disabled: false,
    hasError: false,
    errorMessage: ''
  })
  
  const emit = defineEmits<Emits>()
  
  const isOpen = ref(false)
  const dropdownRef = ref<HTMLElement>()
  
  const selectedOption = computed(() => {
    return props.options.find(option => option.value === props.modelValue) || null
  })
  
  const toggleDropdown = () => {
    if (!props.disabled) {
      isOpen.value = !isOpen.value
    }
  }
  
  const selectOption = (option: Option) => {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    isOpen.value = false
  }
  
  const handleClickOutside = (event: Event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isOpen.value = false
    }
  }
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  </script>
  
  <style scoped>
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.2s ease;
  }
  
  .dropdown-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }
  
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>
  