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
import { ref } from 'vue';

const linksTypeAgenda = ref([
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
    link: '/mouth',
  },
  {
    title: 'fullcalendar Année',
    caption: 'fullcalendaryear',
    icon: 'calendar_view_month',
    link: '/fullcalendaryear',
  },
  {
    title: 'fullcalendar 7+ Timeline',
    caption: 'fullcalendarresource',
    icon: 'calendar_view_day',
    link: '/fullcalendarresource',
  },
  {
    title: 'Planning 7+ synthétique',
    caption: 'resource Tranche Horaire',
    icon: 'date_range',
    link: '/resourceTrancheHoraire',
  },
  {
    title: 'Planning 31+',
    caption: 'Planning mois ligne',
    icon: 'date_range',
    link: '/planningMoisLine',
  },
]);
</script>
