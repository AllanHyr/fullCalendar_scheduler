<script setup>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const calendarOptions = ref({
  plugins: [timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  locale: 'fr',
  dateClick: handleDateClick,
  events: [],
});

function handleDateClick(arg) {
  alert('date click! ' + arg.dateStr);
}

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
