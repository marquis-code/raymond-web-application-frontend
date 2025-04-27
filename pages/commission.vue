<template>
    <div>
      <!-- Hero Section -->
      <section class="relative bg-gray-900 text-white py-20">
        <div class="absolute inset-0 overflow-hidden opacity-30">
          <img 
            src="@/assets/img/event-go.webp" 
            alt="Commission background" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-3xl mx-auto text-center">
            <h1 
              class="text-4xl md:text-5xl font-bold mb-6"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
            >
              Commission Your Custom Artwork
            </h1>
            <p 
              class="text-lg md:text-xl text-gray-300 mb-8"
              v-motion
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1, transition: { delay: 200 } }"
            >
              Get a unique, personalized artwork created specifically for you by Raymond Aworo
            </p>
            <a 
              href="#commission-form" 
              class="px-8 py-3 bg-black text-white rounded-full hover:bg-black-dark transition-all duration-300 inline-block"
              v-motion
              :initial="{ opacity: 0, y: 10 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
            >
              Start Your Commission
            </a>
          </div>
        </div>
      </section>
      
      <!-- Process Steps -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              v-for="(step, index) in commissionSteps" 
              :key="step.title"
              class="bg-white p-6 rounded-lg shadow-md relative"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
            >
              <div class="absolute -top-5 -left-5 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                {{ index + 1 }}
              </div>
              <h3 class="text-xl font-semibold mb-3 pt-4">{{ step.title }}</h3>
              <p class="text-gray-600">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Sizes and Pricing -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-4">Sizes and Pricing</h2>
          <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Depending on your wall space, budget and photographs, I offer the following sizes.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Size Information -->
            <div 
              class="space-y-4"
              v-motion
              :initial="{ opacity: 0, x: -50 }"
              :enter="{ opacity: 1, x: 0 }"
            >
              <div v-for="size in sizes" :key="size.name" class="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-300">
                <h3 class="font-semibold">{{ size.name }}</h3>
                <p class="text-gray-600">{{ size.dimensions }}</p>
              </div>
              
              <div class="p-4 bg-gray-50 rounded-lg mt-6">
                <p class="text-gray-700 italic">
                  <strong>Note:</strong> For portraits of more than one person, prices will be based on the number of faces - $200-$300 per face/person.
                </p>
              </div>
            </div>
            
            <!-- Size Visualization -->
            <div 
              class="grid grid-cols-2 gap-4"
              v-motion
              :initial="{ opacity: 0, x: 50 }"
              :enter="{ opacity: 1, x: 0 }"
            >
              <img 
                src="@/assets/img/event-go.webp" 
                alt="Size guide example 1" 
                class="rounded-lg shadow-md w-full h-auto"
              />
              <img 
                src="@/assets/img/event-go.webp" 
                alt="Size guide example 2" 
                class="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <!-- Commission Form -->
      <section id="commission-form" class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-4">Request Your Commission</h2>
          <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Please fill out the form below with your commission details. I'll get back to you within 48 hours to discuss your project.
          </p>
          
          <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-6 md:p-8">
              <form @submit.prevent="submitCommissionForm" class="space-y-6">
                <!-- Personal Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input 
                      id="firstName"
                      v-model="form.firstName"
                      type="text"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input 
                      id="lastName"
                      v-model="form.lastName"
                      type="text"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input 
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                    />
                  </div>
                </div>
                
                <!-- Commission Details -->
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <input 
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                    Message - (Describe your idea/story for this artwork, if it is a gift, for a special occasion etc. Mention any important details) *
                  </label>
                  <textarea 
                    id="message"
                    v-model="form.message"
                    rows="5"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                  ></textarea>
                </div>
                
                <div>
                  <label for="deadline" class="block text-sm font-medium text-gray-700 mb-1">
                    I would love my artwork to be ready on or before... (Include any deadline dates if necessary, e.g. Birthday) *
                  </label>
                  <input 
                    id="deadline"
                    v-model="form.deadline"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <label for="drawingType" class="block text-sm font-medium text-gray-700 mb-1">
                    What kind of drawing would you like? *
                  </label>
                  <select 
                    id="drawingType"
                    v-model="form.drawingType"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                  >
                    <option value="">Select an option</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                    <option value="pet">Pet Portrait</option>
                    <option value="family">Family Portrait</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <!-- File Upload -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Upload the reference photo you want to use for the artwork
                  </label>
                  <div 
                    class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-primary transition-colors duration-300"
                    :class="{ 'border-primary bg-black/5': isDragging }"
                    @dragenter.prevent="isDragging = true"
                    @dragleave.prevent="isDragging = false"
                    @dragover.prevent="isDragging = true"
                    @drop.prevent="onFileDrop"
                    @click="$refs.fileInput.click()"
                  >
                    <input 
                      ref="fileInput"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="onFileChange"
                    />
                    
                    <div v-if="!form.referencePhoto">
                      <!-- <Icon name="lucide:upload" size="36" class="mx-auto text-gray-400 mb-2" /> -->
                      <p class="text-gray-600">Drag and drop your image here, or click to browse</p>
                      <p class="text-sm text-gray-500 mt-1">Kindly upload clear photos (Max 15MB)</p>
                    </div>
                    
                    <div v-else class="flex items-center justify-center">
                      <img 
                        :src="previewUrl" 
                        alt="Reference photo preview" 
                        class="h-32 object-contain mr-4"
                      />
                      <div class="text-left">
                        <p class="text-gray-900 font-medium">{{ form.referencePhoto.name }}</p>
                        <p class="text-gray-500 text-sm">{{ formatFileSize(form.referencePhoto.size) }}</p>
                        <button 
                          @click.stop="removeFile"
                          class="text-rose-600 text-sm hover:text-rose-800 mt-2"
                        >
                          Remove file
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Additional File Uploads -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Optional - For more than one reference photo
                    </label>
                    <div 
                      class="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-primary transition-colors duration-300"
                      @click="$refs.additionalFileInput1.click()"
                    >
                      <input 
                        ref="additionalFileInput1"
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="onAdditionalFileChange(1, $event)"
                      />
                      
                      <div v-if="!form.additionalPhotos[0]">
                        <!-- <Icon name="lucide:upload" size="24" class="mx-auto text-gray-400 mb-1" /> -->
                        <p class="text-sm text-gray-600">Upload File</p>
                      </div>
                      
                      <div v-else class="flex items-center justify-center">
                        <p class="text-sm text-gray-900 truncate">{{ form.additionalPhotos[0].name }}</p>
                        <button 
                          @click.stop="removeAdditionalFile(0)"
                          class="ml-2 text-rose-600 text-sm hover:text-rose-800"
                        >
                          <!-- <Icon name="lucide:x" size="16" /> -->
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Optional - For more than one reference photo
                    </label>
                    <div 
                      class="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-primary transition-colors duration-300"
                      @click="$refs.additionalFileInput2.click()"
                    >
                      <input 
                        ref="additionalFileInput2"
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="onAdditionalFileChange(2, $event)"
                      />
                      
                      <div v-if="!form.additionalPhotos[1]">
                        <!-- <Icon name="lucide:upload" size="24" class="mx-auto text-gray-400 mb-1" /> -->
                        <p class="text-sm text-gray-600">Upload File</p>
                      </div>
                      
                      <div v-else class="flex items-center justify-center">
                        <p class="text-sm text-gray-900 truncate">{{ form.additionalPhotos[1].name }}</p>
                        <button 
                          @click.stop="removeAdditionalFile(1)"
                          class="ml-2 text-rose-600 text-sm hover:text-rose-800"
                        >
                          <!-- <Icon name="lucide:x" size="16" /> -->
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Submit Button -->
                <div class="pt-4">
                  <button 
                    type="submit"
                    class="w-full py-3 bg-black text-white rounded-md hover:bg-black-dark transition-colors duration-300 flex items-center justify-center gap-2"
                    :disabled="isSubmitting"
                  >
                    <!-- <Icon v-if="isSubmitting" name="lucide:loader" size="18" class="animate-spin" /> -->
                    <!-- <Icon v-else name="lucide:send" size="18" /> -->
                    {{ isSubmitting ? 'Submitting...' : 'Submit Commission Request' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <!-- FAQ Section -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div class="max-w-3xl mx-auto">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="mb-4"
              v-motion
              :initial="{ opacity: 0, y: 10 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
            >
              <button 
                @click="toggleFaq(index)"
                class="flex justify-between items-center w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                :class="{ 'bg-black/5': activeFaq === index }"
              >
                <span class="font-medium text-left">{{ faq.question }}</span>
                <!-- <Icon 
                  :name="activeFaq === index ? 'lucide:minus' : 'lucide:plus'" 
                  size="18"
                  class="transition-transform duration-300"
                  :class="{ 'text-primary': activeFaq === index }"
                /> -->
              </button>
              
              <div 
                v-show="activeFaq === index"
                class="p-4 bg-white border-t border-gray-100 rounded-b-lg"
              >
                <p class="text-gray-700">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Success Modal -->
      <Teleport to="body">
        <div 
          v-if="showSuccessModal"
          class="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          <div 
            class="absolute inset-0 bg-black/70 backdrop-blur-sm"
            @click="showSuccessModal = false"
          ></div>
          
          <div 
            class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative z-10"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{ opacity: 1, scale: 1 }"
          >
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <!-- <Icon name="lucide:check" size="32" class="text-green-600" /> -->
              </div>
              
              <h3 class="text-xl font-bold mb-2">Commission Request Submitted!</h3>
              <p class="text-gray-600 mb-6">
                Thank you for your commission request. I'll review your details and get back to you within 48 hours to discuss your project further.
              </p>
              
              <button 
                @click="showSuccessModal = false"
                class="px-6 py-2 bg-black text-white rounded-full hover:bg-black-dark transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  
  // Commission steps
  const commissionSteps = [
    {
      title: 'Submit Your Request',
      description: 'Fill out the commission form with your ideas, reference photos, and preferences.'
    },
    {
      title: 'Discuss & Approve',
      description: 'We\'ll discuss your project details, agree on pricing, and sign a contract with an initial deposit.'
    },
    {
      title: 'Creation Process',
      description: 'I\'ll create your custom artwork, providing updates throughout the process for your feedback.'
    }
  ]
  
  // Sizes
  const sizes = [
    { name: 'Small Size', dimensions: '16 x 20 Inches' },
    { name: 'Basic Size', dimensions: '20 x 24 Inches' },
    { name: 'Medium Size', dimensions: '24 x 30 Inch / 24 x 36 Inches' },
    { name: 'Large Size', dimensions: '36 x 42 Inches' },
    { name: 'Extra Large Size', dimensions: '40 x 46 Inches' }
  ]
  
  // FAQs
  const faqs = [
    {
      question: 'How long does a commission take to complete?',
      answer: 'After your deposit has been successfully received, I will start working on your drawing. It typically takes 2-4 weeks depending on your choice of size and photo complexity. I will keep you updated throughout the process.'
    },
    {
      question: 'What reference photos work best?',
      answer: 'Clear, high-resolution photos work best. The clearer the photo, the better the final result. I can work with multiple reference photos to create a single composition.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes! I ship worldwide with DHL Express, FedEx, and USPS. All artworks are shipped rolled in a protective tube, well protected and insured for safe arrival.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'Payment can be made securely through Card, bank transfer, Western Union, Ria, or Money Gram. For commissions, an initial deposit is required before work begins.'
    },
    {
      question: 'Can I request changes during the creation process?',
      answer: 'Yes, I provide updates during the creation process and welcome your feedback. Minor adjustments can be made before the artwork is finalized.'
    }
  ]
  
  // Form state
  const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    deadline: '',
    drawingType: '',
    referencePhoto: null as File | null,
    additionalPhotos: [null, null] as (File | null)[]
  })
  
  // UI state
  const isDragging = ref(false)
  const isSubmitting = ref(false)
  const showSuccessModal = ref(false)
  const activeFaq = ref(-1)
  const previewUrl = ref('')
  
  // File handling
  const fileInput = ref<HTMLInputElement | null>(null)
  const additionalFileInput1 = ref<HTMLInputElement | null>(null)
  const additionalFileInput2 = ref<HTMLInputElement | null>(null)
  
  const onFileDrop = (e: DragEvent) => {
    isDragging.value = false
    if (e.dataTransfer?.files.length) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        form.referencePhoto = file
        createPreviewUrl(file)
      }
    }
  }
  
  const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files?.length) {
      form.referencePhoto = target.files[0]
      createPreviewUrl(form.referencePhoto)
    }
  }
  
  const onAdditionalFileChange = (index: number, e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files?.length) {
      form.additionalPhotos[index - 1] = target.files[0]
    }
  }
  
  const createPreviewUrl = (file: File) => {
    previewUrl.value = URL.createObjectURL(file)
  }
  
  const removeFile = (e: Event) => {
    e.stopPropagation()
    form.referencePhoto = null
    previewUrl.value = ''
  }
  
  const removeAdditionalFile = (index: number) => {
    form.additionalPhotos[index] = null
  }
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    else return (bytes / 1048576).toFixed(1) + ' MB'
  }
  
  // Form submission
  const submitCommissionForm = async () => {
    isSubmitting.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Show success message
      showSuccessModal.value = true
      
      // Reset form
      Object.keys(form).forEach(key => {
        if (key === 'additionalPhotos') {
          form.additionalPhotos = [null, null]
        } else {
          // @ts-ignore
          form[key] = ''
        }
      })
      
      previewUrl.value = ''
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle error
    } finally {
      isSubmitting.value = false
    }
  }
  
  // FAQ toggle
  const toggleFaq = (index: number) => {
    activeFaq.value = activeFaq.value === index ? -1 : index
  }
  </script>
  
  <style scoped>
  /* Add any additional component-specific styles here */
  </style>