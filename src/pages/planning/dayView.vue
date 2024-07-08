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
  datesSet: handleDatesSet,
  resources: [
    { id: '1', building: '460 Bryant', title: 'Auditorium A' },
    { id: '2', building: '460 Bryant', title: 'Auditorium B' },
    { id: '3', building: '460 Bryant', title: 'Auditorium C' },
    { id: '4', building: '460 Bryant', title: 'Auditorium D' },
    { id: '5', building: '460 Bryant', title: 'Auditorium E' },
  ],
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
