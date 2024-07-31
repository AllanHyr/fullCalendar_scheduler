<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { api } from 'boot/axios';
import FullCalendar from '@fullcalendar/vue3';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import formEvent from 'src/components/formEvent.vue';
import $ from 'jquery';
import { useRessourceStore } from 'stores/ressource-store';

// Store
const ressourcesStore = useRessourceStore();

// Pagination
const currentIndex = ref(0);
const resourcesPerPage = 25;

// Date de début/fin de l'appel ajax
const startDateDay = ref('');
const endDateDay = ref('');

// Informations pour la création d'un nouvel event
const startDate = ref('');
const endDate = ref('');
const resourceId = ref<number | null>(null);
const openForm = ref(false);

const allResources = computed(() => {
  let resources = ressourcesStore.getRessources.filter(
    (ressource) => ressource.niveau === ressourcesStore.nbRessources
  );

  if (ressourcesStore.roomSelected !== null) {
    resources = resources.filter((ressource) =>
      ressource.key.startsWith(ressourcesStore.roomSelected)
    );
  }

  return resources;
});

const paginatedResources = computed(() => {
  return allResources.value.slice(
    currentIndex.value,
    currentIndex.value + resourcesPerPage
  );
});

const calendarOptions = reactive({
  plugins: [resourceTimeGridPlugin, resourceDayGridPlugin, interactionPlugin],
  initialView: 'resourceTimeGridDay',
  locale: 'fr',
  resourceOrder: 'groupId',
  selectable: true,
  events: [],
  datesSet: handleDatesSet,
  resources: paginatedResources.value,
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

async function showHeader() {
  let maxRessource = 0;
  if (ressourcesStore.roomSelected !== null) {
    maxRessource = ressourcesStore.roomSelected.split('-').length - 1;
  }
  for (let i = ressourcesStore.nbRessources - 1; i > maxRessource; i--) {
    let header = $('.q-page-container .fc-col-header').find('thead');
    let trElem = document.createElement('tr');
    let oldTr = document.getElementsByClassName('liste_' + i + '_thead');
    if (oldTr.length > 0) {
      oldTr[0].remove();
    }
    trElem.className = 'liste_' + i + '_thead';
    let tdElem = document.createElement('td');
    tdElem.className = 'fc-timegrid-axis-top';
    trElem.append(tdElem);
    let color = true;
    let niveauRessource = ressourcesStore.getRessources.filter(
      (ressource) => ressource.niveau === i
    );
    await niveauRessource.forEach((ressource) => {
      let colspan = ressource.colspan;
      if (colspan > 0) {
        let tmpTd = document.createElement('td');
        tmpTd.setAttribute('colspan', colspan);
        tmpTd.className = 'color_salle_header' + (color ? '_odd' : '_even');
        tmpTd.append(ressource.title);
        trElem.append(tmpTd);
      }
      color = !color;
    });
    header.prepend(trElem);
  }
}

async function handleDatesSet(info: { startStr: string; endStr: string }) {
  startDateDay.value = info.startStr;
  endDateDay.value = info.endStr;
  await fetchEvents(info.startStr, info.endStr);
}

function nextResources() {
  if (currentIndex.value + resourcesPerPage < allResources.value.length) {
    currentIndex.value += resourcesPerPage;
  }
}

function prevResources() {
  if (currentIndex.value - resourcesPerPage >= 0) {
    currentIndex.value -= resourcesPerPage;
  }
}

const changeForm = async () => {
  openForm.value = !openForm.value;
  await fetchEvents(startDateDay.value, endDateDay.value);
};

watch(allResources, () => {
  calendarOptions.resources = paginatedResources.value;
  showHeader();
});
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
          @update-openForm="changeForm"
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
