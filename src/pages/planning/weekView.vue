<script setup lang="ts">
import { reactive, ref } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import formEvent from 'src/components/formEvent.vue';

const openForm = ref(false);
const startDate = ref('');
const endDate = ref('');
const resourceId = ref<number | null>(null);

const calendarOptions = reactive({
  plugins: [timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  locale: 'fr',
  selectable: true,
  datesSet: handleDatesSet,
  events: [],
  dateClick: function (info) {
    alert('Clicked on: ' + info.startStr);
    openForm.value = true;
    resourceId.value = info.resource.id;
    startDate.value = info.startStr;
    endDate.value = info.endStr;
  },
  select: function (info) {
    openForm.value = true;
    // TO DO : trouver un moyen de récupérer l'id de la ressource (store ?)
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
</script>

<template>
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
</template>
