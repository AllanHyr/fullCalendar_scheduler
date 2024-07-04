<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';

const calendarOptions = reactive({
  plugins: [resourceTimeGridPlugin, resourceDayGridPlugin],
  initialView: 'resourceTimeGridDay',
  locale: 'fr',
  events: [],
  resources: [
    { id: '1', building: '460 Bryant', title: 'Auditorium A' },
    { id: '2', building: '460 Bryant', title: 'Auditorium B' },
    { id: '3', building: '460 Bryant', title: 'Auditorium C' },
    { id: '4', building: '460 Bryant', title: 'Auditorium D' },
    { id: '5', building: '460 Bryant', title: 'Auditorium E' },
  ],
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
