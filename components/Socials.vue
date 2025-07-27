<template>
                <div class="flex justify-center gap-4">
        <a v-for="(social, index) in content?.metadata?.contactInfo?.socialMedia"
                :href="social.url" 
                class="bg-white hover:bg-zinc-100 rounded-full p-3 transition-all duration-300 hover:scale-110 animate-bounce-in"
                target="_blank"
                 :style="{ animationDelay: `${0.6 + index * 0.1}s` }"
                rel="noopener noreferrer"
              >
              <img v-if="social?.platform === 'Facebook'" :src="instagram" class="h-5 w-5 text-zinc-800" />
                <img v-if="social?.platform === 'Instagram'" :src="facebook" class="h-5 w-5 text-zinc-800" />
                <img v-if="social?.platform === 'Twitter'" :src="twitter" class="h-5 w-5 text-zinc-800" />
                <img v-if="social?.platform === 'TikTok'" :src="tiktok" class="h-5 w-5 text-zinc-800" />
                <img v-if="social?.platform === 'YouTube'" :src="youtube" class="h-5 w-5 text-zinc-800" />
                <!-- <span class="text-xs font-medium text-gray-700 group-hover:text-blue-700">{{ social?.platform }}</span> -->
              </a>
            </div>
</template>


<script setup lang="ts">
import { useFetchContentByType } from "@/composables/modules/content/useFetchContentByType"
const { fetchContentByType, loading: fetchingContent, content } = useFetchContentByType()
import instagram from "@/assets/icons/instagram.svg"
import facebook from "@/assets/icons/facebook.svg"
import twitter from "@/assets/icons/logo-black.png"
import tiktok from "@/assets/icons/tiktok.svg"
import youtube from "@/assets/icons/youtube.svg"
onMounted(() => {
  fetchContentByType('contact_info')
})
</script>
