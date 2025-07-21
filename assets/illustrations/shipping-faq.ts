export const ShippingFaq = defineComponent({
    setup() {
      const faqs = ref([
        {
          question: 'How long does shipping take?',
          answer: 'Orders usually ship within 72 hours and arrive within 5-10 working days.',
          isOpen: false
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we do.',
          isOpen: false
        },
        {
          question: 'Are there any additional fees?',
          answer: 'No, however, You may be required to pay local tax duties on some rare occasions',
          isOpen: false
        },
        {
          question: 'How do you track my order?',
          answer: 'Once your order ships, you will receive a tracking number via email to monitor your delivery.',
          isOpen: false
        }
      ]);
  
      const toggleFaq = (index: number) => {
        faqs.value = faqs.value.map((faq, i) => {
          if (i === index) {
            return { ...faq, isOpen: !faq.isOpen };
          }
          return { ...faq, isOpen: false };
        });
      };
  
      return () => h('div', { class: 'space-y-4' }, 
        faqs.value.map((faq, index) => 
          h('div', { 
            key: index,
            // class: 'border rounded-lg overflow-hidden transition-all duration-300',
            class: faq.isOpen ? 'border-indigo-300 bg-white' : 'border-gray-200' 
          }, [
            h('button', {
              class: 'w-full flex justify-between items-center p-4 text-left focus:outline-none',
              onClick: () => toggleFaq(index)
            }, [
              h('span', { class: 'font-medium text-indigo-800' }, faq.question),
              h('svg', {
                class: `w-5 h-5 text-indigo-600 transform transition-transform ${faq.isOpen ? 'rotate-180' : ''}`,
                xmlns: 'http://www.w3.org/2000/svg',
                fill: 'none',
                viewBox: '0 0 24 24',
                stroke: 'currentColor'
              }, [
                h('path', {
                  'stroke-linecap': 'round',
                  'stroke-linejoin': 'round',
                  'stroke-width': '2',
                  d: 'M19 9l-7 7-7-7'
                })
              ])
            ]),
            h('div', {
              class: `px-4 pb-4 transition-all duration-300 ${faq.isOpen ? 'block' : 'hidden'}`,
            }, [
              h('p', { class: 'text-gray-600' }, faq.answer)
            ])
          ])
        )
      );
    }
  });