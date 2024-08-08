<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

const calendarOptions = reactive({
  plugins: [resourceTimelinePlugin],
  initialView: 'resourceTimelineDay', // Vue quotidienne
  locale: 'fr',
  datesSet: handleDatesSet,
  events: [],
  resourceGroupField: 'building',
  resources: [],
});

async function fetchResources() {
  try {
    const response = await api.get('/ressources');
    calendarOptions.resources = response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
  }
}

async function fetchEventsWeek(startDate: string) {
  try {
    const response = await api.get('/eventsWeek', {
      params: { startDate },
    });
    calendarOptions.events = response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

function handleDatesSet(info: { startStr: string; endStr: string }) {
  fetchEventsWeek(info.startStr);
}

onMounted(() => {
  fetchResources();
});
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
