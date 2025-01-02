<template>
  <main>
    <div class="bg-white">
      <div class="relative isolate z-50 shadow">
        <div class="bg-white py-5">
          <div class="mx-auto flex max-w-7xl px-6 lg:px-8">
            <div class="flex lg:flex-1">
              <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img
                  class="h-8 w-auto"
                  src="@/assets/img/logo_main.png"
                  alt=""
                />
              </a>
            </div>
            <div class="flex w-full justify-end items-end lg:hidden">
              <button
                type="button"
                class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
              <a
                @click="showSolutions = !showSolutions"
                href.prevent="#"
                class="text-sm/6 cursor-pointer font-semibold text-gray-900"
                >Solutions</a
              >
              <!-- <a href="#" class="text-sm/6 font-semibold text-gray-900">Products</a> -->
              <a href="#" class="text-sm/6 font-semibold text-gray-900"
                >Opportunity</a
              >
              <a href="#" class="text-sm/6 font-semibold text-gray-900"
                >Resources</a
              >
            </div>
            <div
              class="hidden lg:flex lg:flex-1 items-center gap-x-4 lg:justify-end"
            >
              <a href="#" class="text-sm/6 font-semibold text-gray-900"
                >Log in</a
              >
              <button
                class="bg-[#1d4449] text-[#c2f725] px-4 text-sm py-2.5 rounded-lg"
              >
                Create account
              </button>
            </div>
          </div>
        </div>

        <div
          ref="target"
          v-if="showSolutions"
          class="absolute inset-x-0 top-0 -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5"
        >
          <div
            class="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-6 py-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0 sm:py-10 lg:grid-cols-4 lg:gap-4 lg:px-8 xl:gap-8"
          >
            <div
              @click="showSolutions = !showSolutions"
              class="group relative -mx-3 flex gap-6 rounded-lg p-3 text-sm/6 hover:bg-gray-50 sm:flex-col sm:p-6"
            >
              <div
                class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
              >
    
                <img src="@/assets/icons/private-rides.svg" class="h-8 w-8" />
              </div>
              <div>
                <a href="#" class="font-semibold text-gray-900">
                  Private Rides
                  <span class="absolute inset-0"></span>
                </a>
                <p class="mt-1 text-gray-600">
                  Ready for an on-the-go service, book us to experience maximum
                  comfort
                </p>
              </div>
            </div>
            <div
              @click="showSolutions = !showSolutions"
              class="group relative -mx-3 flex gap-6 rounded-lg p-3 text-sm/6 hover:bg-gray-50 sm:flex-col sm:p-6"
            >
              <div
                class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
              >
                <!-- <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
          </svg> -->
                <img src="@/assets/icons/route-share.svg" class="h-8 w-8" />
              </div>
              <div>
                <a href="#" class="font-semibold text-gray-900">
                  Route share
                  <span class="absolute inset-0"></span>
                </a>
                <p class="mt-1 text-gray-600">
                  Get the opportunity to share your rides with co-commuters
                  going your way; As a driver or passenger, save up while you
                  enjoy the same comforts and benefits (Coming soon)
                </p>
              </div>
            </div>
            <div
              @click="showSolutions = !showSolutions"
              class="group relative -mx-3 flex gap-6 rounded-lg p-3 text-sm/6 hover:bg-gray-50 sm:flex-col sm:p-6"
            >
              <div
                class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
              >
                <!-- <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
          </svg> -->
                <img src="@/assets/icons/delivery.svg" class="h-8 w-8" />
              </div>
              <div>
                <a href="#" class="font-semibold text-gray-900">
                  Delivery
                  <span class="absolute inset-0"></span>
                </a>
                <p class="mt-1 text-gray-600">
                  You have a package to send out, no worries we are available
                  for you!
                </p>
              </div>
            </div>
            <div
              @click="showSolutions = !showSolutions"
              class="group relative -mx-3 flex gap-6 rounded-lg p-3 text-sm/6 hover:bg-gray-50 sm:flex-col sm:p-6"
            >
              <div
                class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
              >
                <!-- <svg class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg> -->
                <img src="@/assets/icons/schedule.svg" class="h-8 w-8" />
              </div>
              <div>
                <a href="#" class="font-semibold text-gray-900">
                  Schedule
                  <span class="absolute inset-0"></span>
                </a>
                <p class="mt-1 text-gray-600">
                  f you need a ride but are not ready to move now, book us now
                  and we will remind you when it is time
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="showMobile" class="lg:hidden" role="dialog" aria-modal="true">
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <div class="fixed inset-0 z-50"></div>
        <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="">
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span class="sr-only">Close menu</span>
              <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Product</a>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</a>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</a>
              </div>
              <div class="py-6">
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <main>
        <div class="relative isolate">
          <svg
            class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                stroke-width="0"
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              stroke-width="0"
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            />
          </svg>
          <div
            class="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            aria-hidden="true"
          >
            <div
              class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style="
                clip-path: polygon(
                  63.1% 29.5%,
                  100% 17.1%,
                  76.6% 3%,
                  48.4% 0%,
                  44.6% 4.7%,
                  54.5% 25.3%,
                  59.8% 49%,
                  55.2% 57.8%,
                  44.4% 57.2%,
                  27.8% 47.9%,
                  35.1% 81.5%,
                  0% 97.7%,
                  39.2% 100%,
                  35.2% 81.4%,
                  97.2% 52.8%,
                  63.1% 29.5%
                );
              "
            ></div>
          </div>
          <div class="overflow-hidden">
            <div
              class="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32"
            >
              <div
                class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center"
              >
                <div
                  class="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl -mt-20 lg:mt-0"
                >
                  <CoreLanding />
                </div>
                <div
                  class="lg:mt-14 -mt-60 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
                >
                  <div
                    class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80"
                  >
                    <div class="relative">
                      <img
                        src="@/assets/img/services9.jpg"
                        alt=""
                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div
                        class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                      ></div>
                    </div>
                  </div>
                  <div
                    class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36"
                  >
                    <div class="relative">
                      <img
                        src="@/assets/img/services6.jpg"
                        alt=""
                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div
                        class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                      ></div>
                    </div>
                    <div class="relative">
                      <img
                        src="@/assets/img/services7.jpg"
                        alt=""
                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div
                        class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                      ></div>
                    </div>
                  </div>
                  <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div class="relative">
                      <img
                        src="@/assets/img/school.png"
                        alt=""
                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div
                        class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                      ></div>
                    </div>
                    <div class="relative">
                      <img
                        src="@/assets/img/employee-transport.jpg"
                        alt=""
                        class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div
                        class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <BookingFlow class="hidden lg:block" />
    <ServiceCard />
    <ViewRoutes />
    <TestimonialsScroll />
    <LogoClouds />
    <SocialConnect />
    <Waitlist />
  </main>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
definePageMeta({
  title: "CoMiles",
  description: "Experience a simpler, better way to commute.",
});

const target = ref(null);

const showSolutions = ref(false);
const showMobile = ref(false)

onClickOutside(target, (event) => (showSolutions.value = false));
</script>
