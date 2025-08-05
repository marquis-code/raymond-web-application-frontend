<template>
      <div
        class="relative  overflow-hidden section-transition cursor-pointer"
        @click="navigateTo('/commission')"
      >
        <img
          :src="content?.images[0]"
          alt="Portrait display"
          class="w-full h-full transition-transform duration-700 hover:scale-110"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-amber-800 text-white p-4 transition-all duration-300 hover:bg-amber-700"
        >
          <h3 class="text-2xl font-bold mb-1">{{ content?.title }}</h3>
          <p class="text-sm">
            {{ content?.description }}
          </p>
        </div>
      </div>
</template>

<script setup lang="ts">
import { useFetchContentByType } from "@/composables/modules/content/useFetchContentByType"
const { fetchContentByType, loading: fetchingContent, content } = useFetchContentByType()

onMounted(async () => {
  await fetchContentByType("portrait_hero")
})
</script>