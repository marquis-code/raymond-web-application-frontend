export const CarbonNeutralIcon = defineComponent({
    setup() {
      return () => h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-8 w-8',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        })
      ]);
    }
  });