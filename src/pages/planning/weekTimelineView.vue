<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

const calendarOptions = ref({
  plugins: [resourceTimelinePlugin],
  initialView: 'resourceTimeline',
  locale: 'fr',
  events: function (fetchInfo) {
    loadEventsForWeek(fetchInfo.start);
  },
  resourceGroupField: 'building',
  resources: [],
});

async function fetchResources() {
  try {
    const response = await api.get('/ressources');
    calendarOptions.value.resources = response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

async function loadEventsForWeek(startDate) {
  var start = new Date(startDate);
  var end = new Date(start);
  end.setDate(end.getDate() + 7);

  var startStr = start.toISOString();
  var endStr = end.toISOString();

  try {
    const response = await api.get(
      `/eventsWeek?start=${startStr}&end=${endStr}`
    );
    calendarOptions.value.events = response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

onMounted(() => {
  fetchResources();
});
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
