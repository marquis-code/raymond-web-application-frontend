<template>
  <footer class="bg-white">
  <div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-16 lg:px-8">
    <nav class="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6" aria-label="Footer">
      <NuxtLink to="/shipping-policy" class="text-gray-600 underline text- hover:text-gray-900">Shipping</NuxtLink>
      <NuxtLink to="/refund-policy" class="text-gray-600 underline textg hover:text-gray-900">Refunds and Returns</NuxtLink>
      <NuxtLink to="/terms" class="text-gray-600 underline text- hover:text-gray-900">Terms & Conditions</NuxtLink>
      <NuxtLink to="/privacy-policy" class="text-gray-600 underline text- hover:text-gray-900">Privacy Policy</NuxtLink>
      <NuxtLink to="/contact" class="text-gray-600 underline text-lg hover:text-gray-900">Contact</NuxtLink>
    </nav>
    <div class="mt-16 flex justify-center gap-x-10">
      <a href="https://web.facebook.com/people/raymondaworo/100067199633701/?mibextid=LQQJ4d" class="text-gray-600 hover:text-gray-800">
        <span class="sr-only">Facebook</span>
        <img class="h-8 w-8" src="@/assets/icons/facebook.svg" />

      </a>
      <a href="https://www.instagram.com/raymondaworo/?igshid=OGQ5ZDc2ODk2ZA%3D%3D" class="text-gray-600 hover:text-gray-800">
        <span class="sr-only">Instagram</span>
        <img class="h-8 w-8" src="@/assets/icons/instagram.svg" />
      </a>
      <a href="https://x.com/raymondaworo/status/1546911697776115714?s=46&t=wja9T8NIysGx2Vtni1WECQ" class="text-gray-600 hover:text-gray-800">
        <span class="sr-only">X</span>
        <img class="h-8 w-8" src="@/assets/icons/logo-black.png" />
      </a>
      <a href="https://www.tiktok.com/@raymondaworo?_t=8fvTbrYZSA1&_r=1" class="text-gray-600 hover:text-gray-800">
        <span class="sr-only">Tiktok</span>
        <img class="h-8 w-8" src="@/assets/icons/tiktok.svg" />
      </a>
      <a href="https://www.youtube.com/@raymondaworo" class="text-gray-600 hover:text-gray-800">
        <span class="sr-only">YouTube</span>
        <img class="h-8 w-8" src="@/assets/icons/youtube.svg" />
      </a>
    </div>
    <p class="mt-10 text-center text-sm/6 text-gray-600"> &copy; {{ new Date().getFullYear() }} Raymond Aworo Art. All rights reserved.</p>
  </div>
</footer>

</template>