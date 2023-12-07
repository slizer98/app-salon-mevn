<script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{name: 'new-appointment'}"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="route.name === 'new-appointment' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'"
    >
      Servicios
    </RouterLink>

    <RouterLink
      :to="{name: 'appointment-details'}"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white "
      :class="route.name === 'appointment-details' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'"
    >
      Cita y Resumen
    </RouterLink>
  </nav>
  <div class="space-y-5">
    <RouterView />
  </div>
</template>

