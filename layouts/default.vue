<template>
   <main>
   <TheNavbar v-if="!isAcademyCourseRoute" />
    <NuxtPage />
    <TheFooter />
   </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Check if current route matches the academy course pattern
const isAcademyCourseRoute = computed(() => {
  return route.path.startsWith('/academy/course/')
})
</script>