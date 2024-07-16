<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
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
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { Link } from 'components/models';
import { api } from 'boot/axios';
import { useSallePieceStore } from 'stores/sallePiece-store';
import { Salles, Pieces } from 'src/components/models';

const sallePieceStore = useSallePieceStore();

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
      };
    });
    sallePieceStore.setResources(salles, pieces);
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

onMounted(async () => {
  await getRessource();
});
</script>
