// plugins/animations.ts
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  // Add some scroll reveal functionality
  if (process.client) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1
    })

    nuxtApp.hook('app:mounted', () => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el)
      })
    })

    nuxtApp.hook('page:finish', () => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        if (!el.classList.contains('revealed')) {
          observer.observe(el)
        }
      })
    })
  }

  return {
    provide: {
      animateElement: (element: HTMLElement, animation: string, duration: number = 1000) => {
        element.style.animation = `${animation} ${duration}ms ease forwards`
      }
    }
  }
})