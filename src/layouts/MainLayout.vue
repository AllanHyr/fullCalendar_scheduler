<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { Link, Ressources } from 'components/models';
import { api } from 'boot/axios';
import { useRessourceStore } from 'stores/ressource-store';

const ressourceStore = useRessourceStore();

const ressource = ref();

async function getRessource() {
  await api.get('/pieceSalle').then((response) => {
    let data = response.data;
    let nbRessource = data.nbRessource;
    let niveau: string | number = '0';
    let array: Ressources[] = [];

    hydrate(data.batiments);

    function hydrate(level: Ressources[]) {
      for (let i = 0; i < level.length; i++) {
        let niveauArray = niveau.split('-');
        niveauArray[niveauArray.length - 1] = i;
        niveau = niveauArray.join('-');

        let key = niveau;
        array.push({
          id: level[i].id,
          title: level[i].title,
          key: key,
        });
        if (!!level[i].children) {
          niveau = niveau + '-' + i;
          hydrate(level[i].children);
        }
        if (level.length === i + 1) {
          niveauArray.pop();
        }
        niveau = niveauArray.join('-');
      }
    }
    ressourceStore.setRessources(array, nbRessource);
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
  {
    title: 'Planning 31+',
    caption: 'Planning mois ligne',
    icon: 'date_range',
    link: '/moreMonth',
  },
]);

function optionsRessources() {
  let options = [];
  {
    options.push({
      label: 'Toutes les infrastructures',
      id: null,
    });
    ressourceStore.ressources.forEach((ressource) => {
      options.push({
        label: ressource.title,
        id: ressource.key,
      });
    });
  }
  return options;
}

function changeValue() {
  ressourceStore.setSelectedRessource(ressource.value.id);
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
            label="Séléctionner une ressource"
            option-label="label"
            option-value="id"
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
