export const PackagingIllustration = defineComponent({
    setup() {
      return () => h('svg', { 
        xmlns: 'http://www.w3.org/2000/svg', 
        viewBox: '0 0 100 100',
        class: 'animate-float-slow'
      }, [
        // Box
        h('rect', { x: '20', y: '20', width: '60', height: '60', fill: '#e0e7ff', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('path', { d: 'M20 20 L50 10 L80 20', fill: 'none', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('path', { d: 'M80 20 L80 80', fill: 'none', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('path', { d: 'M50 10 L50 20', fill: 'none', stroke: '#4f46e5', 'stroke-width': '2' }),
        
        // Eco symbols
        h('circle', { cx: '50', cy: '50', r: '15', fill: '#bbf7d0', stroke: '#15803d', 'stroke-width': '1' }),
        h('path', { d: 'M50 40 C55 45, 60 50, 50 60 C40 50, 45 45, 50 40', fill: '#15803d', stroke: '#15803d', 'stroke-width': '1' }),
        h('path', { d: 'M45 50 L55 50', stroke: '#15803d', 'stroke-width': '1' }),
        h('path', { d: 'M50 45 L50 55', stroke: '#15803d', 'stroke-width': '1' }),
      ]);
    }
  });