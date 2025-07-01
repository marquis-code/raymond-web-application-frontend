<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Props
const props = defineProps<{
  selector: string;
  intensity?: number;
}>();

const intensity = props.intensity || 0.05;
const elements = ref<HTMLElement[]>([]);

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  // Calculate mouse position as percentage of window
  const mouseXPercent = (clientX / windowWidth) - 0.5;
  const mouseYPercent = (clientY / windowHeight) - 0.5;
  
  elements.value.forEach((el, index) => {
    // Create different movement for each element
    const offsetX = mouseXPercent * intensity * (index + 1) * 20;
    const offsetY = mouseYPercent * intensity * (index + 1) * 20;
    
    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
};

onMounted(() => {
  // Get all elements matching the selector
  elements.value = Array.from(document.querySelectorAll(props.selector)) as HTMLElement[];
  
  // Add event listener
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <!-- This component doesn't render anything, it just adds the effect -->
</template>
