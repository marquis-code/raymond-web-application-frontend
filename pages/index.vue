<template>
  <main>
    <div class="bg-white">
      <header class="absolute inset-x-0 top-0 z-50">
        <nav
          class="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="@/assets/img/logo_main.png" alt="" />
            </a>
          </div>
          <div class="flex lg:hidden">
            <button
              @click="showMobile = true"
              type="button"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
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
              class="text-sm/6 font-semibold text-gray-900"
              >Product</a
            >
            <a href="#" class="text-sm/6 font-semibold text-gray-900"
              >Opportunity</a
            >
            <a href="#" class="text-sm/6 font-semibold text-gray-900"
              >Resources</a
            >
          </div>
          <!-- <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" class="text-sm/6 font-semibold text-gray-900"
              >Log in <span aria-hidden="true">&rarr;</span></a
            >
          </div> -->
        </nav>
        <!-- Mobile menu, show/hide based on menu open state. -->
        <div
          v-if="showMobile"
          class="lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <!-- Background backdrop, show/hide based on slide-over state. -->
          <div class="fixed inset-0 z-50"></div>
          <div
            class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div class="flex items-center justify-between">
              <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img
                  class="h-8 w-auto"
                  src="@/assets/img/logo_main.png"
                  alt=""
                />
              </a>
              <button
                @click="showMobile = false"
                type="button"
                class="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span class="sr-only">Close menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="relative isolate z-50 mt-6">
              <div class="bg-white py-5">
                <div class="mx-auto flex-col space-y-4 max-w-7xl px-2 lg:px-8">
                  <div>
                    <button
                      @click="openMobileSolutions = !openMobileSolutions"
                      type="button"
                      class="-mx-3 block rounded-lg w-full flex items-center gap-x-1 px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      aria-expanded="false"
                    >
                      Solutions
                      <svg
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                v-if="openMobileSolutions"
                class=""
              >
                <div
                  class="mx-auto grid max-w-7xl grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0 sm:py-10 lg:grid-cols-4 lg:gap-4 lg:px-8 xl:gap-8"
                >
                  <div @click="openMobileSolutions = !openMobileSolutions"
                    class="group cursor-pointer relative -mx-3 flex gap-6 rounded-lg p-3 text-sm/6 hover:bg-gray-50 sm:flex-col sm:p-6"
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
                      <p class="mt-1 text-xs text-gray-600">
                        Ready for an on-the-go service, book us to experience maximum
                        comfort
                      </p>
                    </div>
                  </div>
                  <div @click="openMobileSolutions = !openMobileSolutions"
                    class="group cursor-pointer relative -mx-3 flex gap-6 rounded-lg p-3 text-sm/6 hover:bg-gray-50 sm:flex-col sm:p-6"
                  >
                    <div
                      class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                    >
                    <img src="@/assets/icons/route-share.svg" class="h-8 w-8" />
                    </div>
                    <div>
                      <a href="#" class="font-semibold text-gray-900">
                        Route share
                        <span class="absolute inset-0"></span>
                      </a>
                      <p class="mt-1 text-xs text-gray-600">
                        Get the opportunity to share your rides with co-commuters
                  going your way; As a driver or passenger, save up while you
                  enjoy the same comforts and benefits (Coming soon)
                      </p>
                    </div>
                  </div>
                  <div @click="openMobileSolutions = !openMobileSolutions"
                    class="group cursor-pointer relative -mx-3 flex gap-6 rounded-lg p-3 text-sm/6 hover:bg-gray-50 sm:flex-col sm:p-6"
                  >
                    <div
                      class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                    >
                    <img src="@/assets/icons/delivery.svg" class="h-8 w-8" />
                    </div>
                    <div>
                      <a href="#" class="font-semibold text-gray-900">
                        Delivery
                        <span class="absolute inset-0"></span>
                      </a>
                      <p class="mt-1 text-xs text-gray-600">
                        You have a package to send out, no worries we are available
                  for you!
                      </p>
                    </div>
                  </div>
                  <div @click="openMobileSolutions = !openMobileSolutions"
                    class="group relative cursor-pointer -mx-3 flex gap-6 rounded-lg p-3 text-sm/6 hover:bg-gray-50 sm:flex-col sm:p-6"
                  >
                    <div
                      class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                    >
                    <img src="@/assets/icons/schedule.svg" class="h-8 w-8" />
                    </div>
                    <div>
                      <a href="#" class="font-semibold text-gray-900">
                        Schedule
                        <span class="absolute inset-0"></span>
                      </a>
                      <p class="mt-1 text-xs text-gray-600">
                        if you need a ride but are not ready to move now, book us now
                  and we will remind you when it is time
                      </p>
                    </div>
                  </div>
                </div>
                 </div>

                  <div>
                    <button
                      type="button"
                      class="-mx-3 block rounded-lg w-full flex items-center gap-x-1 px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      aria-expanded="false"
                    >
                      Opportunities
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      class="-mx-3 block rounded-lg w-full flex items-center gap-x-1 px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      aria-expanded="false"
                    >
                      Resources
                    </button>
                  </div>
                  <div>
          
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref="target"
          v-if="showSolutions"
          class="absolute inset-x-0 hidden lg:block top-0 -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5"
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
                <img src="@/assets/icons/schedule.svg" class="h-8 w-8" />
              </div>
              <div>
                <a href="#" class="font-semibold text-gray-900">
                  Schedule
                  <span class="absolute inset-0"></span>
                </a>
                <p class="mt-1 text-gray-600">
                  if you need a ride but are not ready to move now, book us now
                  and we will remind you when it is time
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
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
                  class="-mt-44 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
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
    <!-- <BookingFlow class="hidden lg:block" /> -->
    <ServiceCard />
    <!-- <ViewRoutes /> -->
    <!-- <TestimonialsScroll /> -->
    <!-- <LogoClouds /> -->
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
const showMobile = ref(false);
const openMobileSolutions = ref(false);

onClickOutside(target, (event) => (showSolutions.value = false));
</script>
