<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const currentIndex = ref(0);
const resourcesPerPage = 2;

const allResources = [
  { id: '1', building: '460 Bryant', title: 'Auditorium A' },
  { id: '2', building: '460 Bryant', title: 'Auditorium B' },
  { id: '3', building: '460 Bryant', title: 'Auditorium C' },
  { id: '4', building: '460 Bryant', title: 'Auditorium D' },
  { id: '5', building: '460 Bryant', title: 'Auditorium E' },
];

const paginatedResources = computed(() => {
  return allResources.slice(
    currentIndex.value,
    currentIndex.value + resourcesPerPage
  );
});

const calendarOptions = reactive({
  plugins: [resourceTimeGridPlugin, resourceDayGridPlugin, interactionPlugin],
  initialView: 'resourceTimeGridDay',
  locale: 'fr',
  selectable: true,
  events: [],
  datesSet: handleDatesSet,
  resources: paginatedResources,
  dateClick: function (info) {
    alert('clicked ' + info.dateStr + ' on resource ' + info.resource.id);
  },
  select: function (info) {
    alert(
      'selected ' +
        info.startStr +
        ' to ' +
        info.endStr +
        ' on resource ' +
        info.resource.id
    );
  },
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

function nextResources() {
  if (currentIndex.value + resourcesPerPage < allResources.length) {
    currentIndex.value += resourcesPerPage;
  }
}

function prevResources() {
  if (currentIndex.value - resourcesPerPage >= 0) {
    currentIndex.value -= resourcesPerPage;
  }
}
</script>

<template>
  <div>
    <div class="pagination-controls">
      <q-btn @click="prevResources" :disable="currentIndex === 0"
        >Previous</q-btn
      >
      <q-btn
        @click="nextResources"
        :disable="currentIndex + resourcesPerPage >= allResources.length"
        >Next</q-btn
      >
    </div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: end;
  margin-top: 10px;
}
</style>
