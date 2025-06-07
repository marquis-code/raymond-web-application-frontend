export const ShippingIllustration = defineComponent({
    setup() {
      return () => h('svg', { 
        xmlns: 'http://www.w3.org/2000/svg', 
        viewBox: '0 0 100 100',
        class: 'animate-float'
      }, [
        h('rect', { x: '10', y: '40', width: '80', height: '50', rx: '5', fill: '#f0f0ff', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('path', { d: 'M10 50h80', stroke: '#4f46e5', 'stroke-width': '1', 'stroke-dasharray': '2 2' }),
        h('rect', { x: '35', y: '25', width: '30', height: '15', rx: '2', fill: '#e0e7ff' }),
        h('path', { d: 'M35 40v-13 h30 v13', fill: 'none', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('circle', { cx: '30', cy: '90', r: '6', fill: '#c7d2fe', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('circle', { cx: '70', cy: '90', r: '6', fill: '#c7d2fe', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('path', { d: 'M20 60h60', stroke: '#818cf8', 'stroke-width': '2' }),
        h('path', { d: 'M20 70h40', stroke: '#818cf8', 'stroke-width': '2' }),
        h('path', { d: 'M10 30c0 0 20-25 40-15', stroke: '#4f46e5', 'stroke-width': '2', fill: 'none', 'stroke-dasharray': '3 3' }),
        h('path', { d: 'M90 30c0 0 -20-25 -40-15', stroke: '#4f46e5', 'stroke-width': '2', fill: 'none', 'stroke-dasharray': '3 3' }),
      ]);
    }
  });