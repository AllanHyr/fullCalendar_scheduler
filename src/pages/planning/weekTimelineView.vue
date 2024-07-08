<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

const calendarOptions = reactive({
  plugins: [resourceTimelinePlugin],
  initialView: 'resourceTimeline',
  datesSet: handleDatesSet,
  locale: 'fr',
  events: [],
  resourceGroupField: 'building',
  resources: [],
});

async function fetchResources() {
  try {
    const response = await api.get('/ressources');
    calendarOptions.resources = response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

async function fetchEventsWeek(startDate: string) {
  var start = new Date(startDate);
  var end = new Date(start);
  end.setDate(end.getDate() + 7);

  var startStr = start.toISOString();
  var endStr = end.toISOString();

  try {
    const response = await api.get('/eventsWeek', {
      params: { startStr, endStr },
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
