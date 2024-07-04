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
import { Link } from 'components/models';

const linksTypeAgenda = ref<Link[]>([
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
</script>
