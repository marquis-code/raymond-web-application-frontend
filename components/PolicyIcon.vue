<template>
    <!-- These components will be used for the policy cards -->
  </template>
  
  <script setup lang="ts">
  // Return Icon Component
  const ReturnIcon = defineComponent({
    name: 'ReturnIcon',
    render() {
      return h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-6 w-6',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3'
        })
      ]);
    }
  });
  
  // Ban Icon Component
  const BanIcon = defineComponent({
    name: 'BanIcon',
    render() {
      return h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-6 w-6',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
        })
      ]);
    }
  });
  
  // Damage Icon Component
  const DamageIcon = defineComponent({
    name: 'DamageIcon',
    render() {
      return h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-6 w-6',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        })
      ]);
    }
  });
  
  // Refund Icon Component
  const RefundIcon = defineComponent({
    name: 'RefundIcon',
    render() {
      return h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-6 w-6',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
        })
      ]);
    }
  });
  </script>