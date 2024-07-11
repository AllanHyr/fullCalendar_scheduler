<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import formEvent from 'src/components/formEvent.vue';
import { useSallePieceStore } from 'stores/sallePiece-store';

const sallePieceStore = useSallePieceStore();

const currentIndex = ref(0);
const resourcesPerPage = 5;
const openForm = ref(false);

const startDate = ref('');
const endDate = ref('');

const resourceId = ref<number | null>(null);

const allResources = sallePieceStore.pieces;

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
    openForm.value = true;
    resourceId.value = info.resource.id;
    startDate.value = info.startStr;
    endDate.value = info.endStr;
  },
  select: function (info) {
    openForm.value = true;
    resourceId.value = info.resource.id;
    startDate.value = info.startStr;
    endDate.value = info.endStr;
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
    <q-dialog v-model="openForm">
      <q-card class="bg-white q-pa-md">
        <form-event
          :startDate="startDate"
          :endDate="endDate"
          :resourceId="resourceId"
        ></form-event>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: end;
  margin-top: 10px;
}
</style>
