<script setup>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';

const calendarOptions = ref({
  plugins: [multiMonthPlugin, interactionPlugin],
  initialView: 'multiMonthYear',
  dateClick: handleDateClick,
  events: [],
});

function handleDateClick(arg) {
  alert('date click! ' + arg.dateStr);
}

async function fetchEvents() {
  try {
    const response = await api.get('/events');
    calendarOptions.value.events = response.data; // assume response.data is the events array
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
