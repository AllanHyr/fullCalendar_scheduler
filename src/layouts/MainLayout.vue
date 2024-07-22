<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { Link } from 'components/models';
import { api } from 'boot/axios';
import { useSallePieceStore } from 'stores/sallePiece-store';
import { Salles, Pieces, Batiments } from 'src/components/models';

const sallePieceStore = useSallePieceStore();

const ressource = ref(null);

async function getRessource() {
  await api.get('/pieceSalle').then((response) => {
    let data = response.data;
    let pieces = data.pieces.map(function (e: Pieces) {
      return {
        id: e.id,
        title: e.title,
        groupId: e.groupId,
      };
    });
    let salles = data.salles.map(function (e: Salles) {
      return {
        id: e.id,
        title: e.title,
        groupId: e.groupId,
      };
    });
    let batiments = data.batiments.map(function (e: Batiments) {
      return {
        id: e.id,
        title: e.title,
      };
    });
    sallePieceStore.setResources(salles, pieces, batiments);
  });
}

const linksTypeAgenda = reactive<Link[]>([
  {
    title: 'fullcalendar Journalier',
    caption: 'fullcalendar',
    icon: 'date_range',
    link: '/',
  },
  {
    title: 'fullcalendar Semaine',
    caption: 'fullcalendarweek',
    icon: 'calendar_view_week',
    link: '/week',
  },
  {
    title: 'fullcalendar Mois',
    caption: 'fullcalendarmonth',
    icon: 'calendar_month',
    link: '/month',
  },
  {
    title: 'fullcalendar Année',
    caption: 'fullcalendaryear',
    icon: 'calendar_view_month',
    link: '/year',
  },
  {
    title: 'fullcalendar 7+ Timeline',
    caption: 'fullcalendarresource',
    icon: 'calendar_view_day',
    link: '/weekTimeline',
  },
]);

function optionsRessources() {
  let options = [];
  {
    options.push({
      label: 'Toutes les infrastructures',
      id: null,
    });
    sallePieceStore.salles.forEach((salle) => {
      options.push({
        label: salle.title,
        id: salle.id,
      });
    });
  }
  return options;
}

function changeValue() {
  sallePieceStore.setSalle(ressource.value.id);
}

onMounted(async () => {
  await getRessource();
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="row no-wrap shadow-1">
        <q-toolbar class="col-3 bg-primary text-white">
          <q-btn
            v-for="link in linksTypeAgenda"
            :key="link.title"
            v-bind="link"
            @click="$router.push(link.link)"
            class="q-pa-sm"
          >
            <q-tooltip>
              {{ link.title }}
            </q-tooltip>
          </q-btn>
        </q-toolbar>
        <q-toolbar class="col-3 bg-primary text-white">
          <q-select
            style="width: 100%; margin-right: auto; margin-left: auto"
            class="print-hide bg-white rounded-borders q-px-sm"
            v-model="ressource"
            @update:model-value="changeValue()"
            :options="optionsRessources()"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Pas de résultats
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
