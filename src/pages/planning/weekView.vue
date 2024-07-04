<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';

const calendarOptions = reactive({
  plugins: [timeGridPlugin],
  initialView: 'timeGridWeek',
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
