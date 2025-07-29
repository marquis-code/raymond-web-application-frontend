<template>
    <div class="relative" ref="datePickerRef">
      <button
        @click="toggleDatePicker"
        :class="[
          'w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-left flex items-center justify-between',
          { 'border-red-300 ring-2 ring-red-200': hasError }
        ]"
        :disabled="disabled"
        type="button"
      >
        <span :class="{ 'text-slate-400': !selectedDate, 'text-slate-800': selectedDate }">
          {{ selectedDate ? formatDisplayDate(selectedDate) : placeholder }}
        </span>
        <Calendar 
          :class="['w-5 h-5 text-slate-400 transition-transform duration-200', { 'rotate-180': isOpen }]" 
        />
      </button>
      
      <Transition name="datepicker">
        <div
          v-if="isOpen"
          class="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg p-4"
        >
          <!-- Month/Year Header -->
          <div class="flex items-center justify-between mb-4">
            <button
              @click="previousMonth"
              type="button"
              class="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>
            
            <div class="flex items-center gap-2">
              <select
                v-model="currentMonth"
                @change="updateCalendar"
                class="text-sm font-medium bg-transparent border-none focus:outline-none"
              >
                <option v-for="(month, index) in monthNames" :key="index" :value="index">
                  {{ month }}
                </option>
              </select>
              
              <select
                v-model="currentYear"
                @change="updateCalendar"
                class="text-sm font-medium bg-transparent border-none focus:outline-none"
              >
                <option v-for="year in availableYears" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
            
            <button
              @click="nextMonth"
              type="button"
              class="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
          
          <!-- Days of Week Header -->
          <div class="grid grid-cols-7 gap-1 mb-2">
            <div
              v-for="day in dayNames"
              :key="day"
              class="text-xs font-medium text-slate-500 text-center py-2"
            >
              {{ day }}
            </div>
          </div>
          
          <!-- Calendar Days -->
          <div class="grid grid-cols-7 gap-1">
            <button
              v-for="date in calendarDays"
              :key="`${date.year}-${date.month}-${date.day}`"
              @click="selectDate(date)"
              type="button"
              :disabled="isDateDisabled(date)"
              :class="[
                'w-8 h-8 text-sm rounded-lg transition-all duration-150 flex items-center justify-center',
                {
                  'text-slate-400': !date.isCurrentMonth,
                  'text-slate-800': date.isCurrentMonth && !isDateSelected(date),
                  'bg-blue-600 text-white font-medium': isDateSelected(date),
                  'hover:bg-slate-100': date.isCurrentMonth && !isDateSelected(date) && !isDateDisabled(date),
                  'bg-blue-100 text-blue-700': isToday(date) && !isDateSelected(date),
                  'opacity-50 cursor-not-allowed': isDateDisabled(date),
                  'cursor-pointer': !isDateDisabled(date)
                }
              ]"
            >
              {{ date.day }}
            </button>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex justify-between mt-4 pt-3 border-t border-slate-200">
            <button
              @click="clearDate"
              type="button"
              class="text-sm text-slate-600 hover:text-slate-800 transition-colors"
            >
              Clear
            </button>
            
            <button
              @click="selectToday"
              type="button"
              class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      </Transition>
      
      <div v-if="hasError && errorMessage" class="mt-1 text-sm text-red-600 animate-pulse">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
  import { Calendar, ChevronLeft, ChevronRight } from 'lucide-vue-next'
  
  interface CalendarDate {
    day: number
    month: number
    year: number
    isCurrentMonth: boolean
    date: Date
  }
  
  interface Props {
    modelValue: string
    placeholder?: string
    disabled?: boolean
    hasError?: boolean
    errorMessage?: string
    minDate?: string
    maxDate?: string
  }
  
  interface Emits {
    (e: 'update:modelValue', value: string): void
    (e: 'change', value: string): void
  }
  
  const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Select a date',
    disabled: false,
    hasError: false,
    errorMessage: '',
    minDate: '',
    maxDate: ''
  })
  
  const emit = defineEmits<Emits>()
  
  const isOpen = ref(false)
  const datePickerRef = ref<HTMLElement>()
  const currentMonth = ref(new Date().getMonth())
  const currentYear = ref(new Date().getFullYear())
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const selectedDate = computed(() => {
    return props.modelValue ? new Date(props.modelValue) : null
  })
  
  const availableYears = computed(() => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = currentYear - 5; year <= currentYear + 10; year++) {
      years.push(year)
    }
    return years
  })
  
  const calendarDays = computed(() => {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1)
    const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days: CalendarDate[] = []
    const currentDate = new Date(startDate)
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      days.push({
        day: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        isCurrentMonth: currentDate.getMonth() === currentMonth.value,
        date: new Date(currentDate)
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return days
  })
  
  const toggleDatePicker = () => {
    if (!props.disabled) {
      isOpen.value = !isOpen.value
    }
  }
  
  const selectDate = (date: CalendarDate) => {
    if (isDateDisabled(date)) return
    
    const dateString = formatDateString(date.date)
    emit('update:modelValue', dateString)
    emit('change', dateString)
    isOpen.value = false
  }
  
  const isDateSelected = (date: CalendarDate) => {
    if (!selectedDate.value) return false
    return (
      date.day === selectedDate.value.getDate() &&
      date.month === selectedDate.value.getMonth() &&
      date.year === selectedDate.value.getFullYear()
    )
  }
  
  const isToday = (date: CalendarDate) => {
    const today = new Date()
    return (
      date.day === today.getDate() &&
      date.month === today.getMonth() &&
      date.year === today.getFullYear()
    )
  }
  
  const isDateDisabled = (date: CalendarDate) => {
    const dateObj = date.date
    
    if (props.minDate) {
      const minDate = new Date(props.minDate)
      if (dateObj < minDate) return true
    }
    
    if (props.maxDate) {
      const maxDate = new Date(props.maxDate)
      if (dateObj > maxDate) return true
    }
    
    return false
  }
  
  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0]
  }
  
  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const previousMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11
      currentYear.value--
    } else {
      currentMonth.value--
    }
  }
  
  const nextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0
      currentYear.value++
    } else {
      currentMonth.value++
    }
  }
  
  const updateCalendar = () => {
    // Calendar will automatically update due to computed properties
  }
  
  const clearDate = () => {
    emit('update:modelValue', '')
    emit('change', '')
    isOpen.value = false
  }
  
  const selectToday = () => {
    const today = new Date()
    const todayString = formatDateString(today)
    emit('update:modelValue', todayString)
    emit('change', todayString)
    isOpen.value = false
  }
  
  const handleClickOutside = (event: Event) => {
    if (datePickerRef.value && !datePickerRef.value.contains(event.target as Node)) {
      isOpen.value = false
    }
  }
  
  // Initialize current month/year based on selected date
  watch(() => props.modelValue, (newValue) => {
    if (newValue) {
      const date = new Date(newValue)
      currentMonth.value = date.getMonth()
      currentYear.value = date.getFullYear()
    }
  }, { immediate: true })
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  </script>
  
  <style scoped>
  .datepicker-enter-active,
  .datepicker-leave-active {
    transition: all 0.2s ease;
  }
  
  .datepicker-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }
  
  .datepicker-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>
  