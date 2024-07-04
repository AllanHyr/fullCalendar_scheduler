<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import multiMonthPlugin from '@fullcalendar/multimonth';

const calendarOptions = reactive({
  plugins: [multiMonthPlugin],
  initialView: 'multiMonthYear',
  locale: 'fr',
  events: [],
});

async function fetchEvents() {
  try {
    const response = await api.get('/events');
    calendarOptions.events = response.data;
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
