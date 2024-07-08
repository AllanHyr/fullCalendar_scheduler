<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';

const calendarOptions = reactive({
  plugins: [timeGridPlugin],
  initialView: 'timeGridWeek',
  locale: 'fr',
  datesSet: handleDatesSet,
  events: [],
});

async function fetchEvents(start: string, end: string) {
  try {
    const response = await api.get('/events', {
      params: { start, end },
    });
    calendarOptions.events = response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

function handleDatesSet(info: { startStr: string; endStr: string }) {
  fetchEvents(info.startStr, info.endStr);
}
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
