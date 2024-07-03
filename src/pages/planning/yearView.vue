<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import multiMonthPlugin from '@fullcalendar/multimonth';

const calendarOptions = ref({
  plugins: [multiMonthPlugin],
  initialView: 'multiMonthYear',
  locale: 'fr',
  events: [],
});

async function fetchEvents() {
  try {
    const response = await api.get('/events');
    calendarOptions.value.events = response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

onMounted(() => {
  fetchEvents();
});
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
