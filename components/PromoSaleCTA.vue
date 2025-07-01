<script setup lang="ts">
import { ref, onMounted } from "vue";

interface PromoSale {
  title: string;

  description: string;

  discountPercentage: number;

  priority: number;

  startDate: string;

  endDate: string;

  actionText: string;

  isLifetime: boolean;

  imageUrl: string;
}

const promosale = ref<PromoSale>({} as PromoSale);

const loading = ref(true);

// Simulate fetching promo data

const fetchPromoData = async () => {
  try {
    // Simulate API delay

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Sample promo data

    promosale.value = {
      title: "Premium Art Collection",

      description:
        "Discover our exclusive collection of limited edition prints. Each piece is carefully curated and professionally printed on premium materials.",

      discountPercentage: 35,

      priority: 1,

      startDate: new Date().toISOString(),

      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now

      actionText: "Shop Collection",

      isLifetime: false,

      imageUrl: "/placeholder.svg?height=400&width=400",
    };
  } catch (error) {
    console.error("Error fetching promo data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPromoData();
});
</script>

<template>
  <main>
    <PromoSection :promosale="promosale" :loading="loading" />
  </main>
</template>
