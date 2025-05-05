<!-- components/GoogleMap.vue -->
<template>
    <div class="map-container">
      <div v-if="mapLoaded" ref="mapContainer" class="google-map-embed"></div>
      <div v-else class="loading-state">Loading map...</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // Props with default values
  const props = defineProps({
    mapUrl: {
      type: String,
      default: 'https://maps.google.com/maps?width=520&height=400&hl=en&q=lagos%20university%20teaching%20hospital&t=&z=12&ie=UTF8&iwloc=B&output=embed'
    },
    width: {
      type: String,
      default: '520px'
    },
    height: {
      type: String,
      default: '400px'
    }
  })
  
  const mapContainer = ref(null)
  const mapLoaded = ref(false)
  
  onMounted(() => {
    if (process.client) {
      const iframe = document.createElement('iframe')
      iframe.setAttribute('width', '100%')
      iframe.setAttribute('height', '100%')
      iframe.setAttribute('frameborder', '0')
      iframe.setAttribute('scrolling', 'no')
      iframe.setAttribute('marginheight', '0')
      iframe.setAttribute('marginwidth', '0')
      iframe.setAttribute('src', props.mapUrl)
      iframe.style.border = 'none'
      
      // Add event listener to detect when iframe is loaded
      iframe.onload = () => {
        mapLoaded.value = true
      }
      
      if (mapContainer.value) {
        mapContainer.value.appendChild(iframe)
      }
    }
  })
  </script>
  
  <style scoped>
  .map-container {
    position: relative;
    width: v-bind('width');
    height: v-bind('height');
    background-color: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .google-map-embed {
    width: 100%;
    height: 100%;
  }
  
  .loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #666;
    font-size: 14px;
  }
  </style>