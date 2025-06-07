export const ShippingTimeline = defineComponent({
    setup() {
      return () => h('div', { class: 'relative py-10' }, [
        // Timeline line
        h('div', { class: 'absolute h-1 w-full bg-gray-200 top-1/2 transform -translate-y-1/2' }),
        
        // Timeline items
        h('div', { class: 'relative flex justify-between' }, [
          // Order Placed
          h('div', { class: 'flex flex-col items-center' }, [
            h('div', { class: 'rounded-full h-12 w-12 flex items-center justify-center bg-indigo-600 text-white z-10' }, [
              h('svg', { class: 'w-6 h-6', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 13l4 4L19 7' })
              ])
            ]),
            h('div', { class: 'text-center mt-2' }, [
              h('div', { class: 'font-semibold text-indigo-700' }, 'Order Placed'),
              h('div', { class: 'text-sm text-gray-500' }, 'Day 0')
            ])
          ]),
          
          // Processing
          h('div', { class: 'flex flex-col items-center' }, [
            h('div', { class: 'rounded-full h-12 w-12 flex items-center justify-center bg-indigo-500 text-white z-10 animate-pulse' }, [
              h('svg', { class: 'w-6 h-6', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6v6m0 0v6m0-6h6m-6 0H6' })
              ])
            ]),
            h('div', { class: 'text-center mt-2' }, [
              h('div', { class: 'font-semibold text-indigo-700' }, 'Processing'),
              h('div', { class: 'text-sm text-gray-500' }, 'Within 72 hours')
            ])
          ]),
          
          // Shipped
          h('div', { class: 'flex flex-col items-center' }, [
            h('div', { class: 'rounded-full h-12 w-12 flex items-center justify-center bg-indigo-300 text-white z-10' }, [
              h('svg', { class: 'w-6 h-6', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
                h('path', { d: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z' }),
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' })
              ])
            ]),
            h('div', { class: 'text-center mt-2' }, [
              h('div', { class: 'font-semibold text-indigo-700' }, 'Shipped'),
              h('div', { class: 'text-sm text-gray-500' }, 'Day 3')
            ])
          ]),
          
          // Delivered
          h('div', { class: 'flex flex-col items-center' }, [
            h('div', { class: 'rounded-full h-12 w-12 flex items-center justify-center bg-gray-300 text-white z-10' }, [
              h('svg', { class: 'w-6 h-6', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
              ])
            ]),
            h('div', { class: 'text-center mt-2' }, [
              h('div', { class: 'font-semibold text-indigo-700' }, 'Delivered'),
              h('div', { class: 'text-sm text-gray-500' }, '5-10 working days')
            ])
          ])
        ])
      ]);
    }
  });