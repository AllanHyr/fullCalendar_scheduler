<script setup lang="ts">
import { reactive, ref } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import formEvent from 'src/components/formEvent.vue';

// Date de début/fin de l'appel ajax
const startDateDay = ref('');
const endDateDay = ref('');

// Informations pour la création d'un nouvel event
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
    openForm.value = true;
    // TO DO : trouver un moyen de récupérer l'id de la ressource (store ?)
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

const changeForm = async () => {
  openForm.value = !openForm.value;
  await fetchEvents(startDateDay.value, endDateDay.value);
};

function handleDatesSet(info: { startStr: string; endStr: string }) {
  startDateDay.value = info.startStr;
  endDateDay.value = info.endStr;
  fetchEvents(info.startStr, info.endStr);
}
</script>

<template>
  <FullCalendar :options="calendarOptions" />
  <q-dialog v-model="openForm">
    <q-card class="bg-white q-pa-md">
      <form-event
        @update-openForm="changeForm"
        :startDate="startDate"
        :endDate="endDate"
        :resourceId="resourceId"
      ></form-event>
    </q-card>
  </q-dialog>
</template>
