<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import moment from 'moment';
import { api } from 'boot/axios';
import { useRessourceStore } from 'stores/ressource-store';

const ressourcesStore = useRessourceStore();

const start = ref(moment().startOf('month'));
const end = ref(moment().endOf('month'));

const events = ref([]);

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

const tabLibelleJour = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

const eachDays = computed(() => {
  const days = [];
  let tmp = moment(start.value);
  while (tmp.isBefore(end.value)) {
    days.push({
      libelle: `<b>${tabLibelleJour[tmp.day()]}<br />${tmp.date()}</b>`,
      time: moment(tmp),
    });
    tmp.add(1, 'day');
  }
  return days;
});

const getEventPieceJour = (jour: number) => {
  const startDay = moment(start.value).date(jour).startOf('day');
  const endDay = moment(startDay).endOf('day');
  return events.value.filter(
    (e) => moment(e.start).isBefore(endDay) && moment(e.end).isAfter(startDay)
  );
};

const getEvent = () => {
  const params = {
    start: start.value.unix(),
    end: end.value.unix(),
  };
  events.value = [];
  api
    .get('/events', params)
    .then((response) => {
      events.value = response.data.map((event: any) => ({
        ...event,
        start: moment(event.start),
        end: moment(event.end),
      }));
    })
    .catch((e) => console.error(e));
};

onMounted(() => {
  getEvent();
});
</script>

<template>
  <q-page class="flex flex-column">
    <table
      v-if="allResources.length > 0"
      style="width: 100%"
      cellspacing="0"
      cellpadding="0"
    >
      <thead>
        <tr>
          <th :colspan="allResources.length" class="borderPlanningCustom"></th>
        </tr>
        <tr>
          <th
            v-for="ressource in allResources"
            :key="ressource.id"
            class="borderPlanningCustom"
          >
            {{ ressource.title }}
          </th>
        </tr>
        <tr v-for="day in eachDays" :key="day.time">
          <td
            v-for="ressource in allResources"
            :key="ressource.id"
            style="height: 37px"
            class="borderPlanningCustom"
          >
            <table style="width: 100%; height: 100%" cellspacing="0">
              <tr>
                <td style="width: 25px"><div v-html="day.libelle"></div></td>
                <td
                  v-for="event in getEventPieceJour(day.time.day())"
                  :key="event.id"
                >
                  <div>
                    {{
                      event.start.hours() +
                      ' : ' +
                      event.start.minutes() +
                      ' à ' +
                      event.end.hours() +
                      ' : ' +
                      event.end.minutes()
                    }}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </thead>
    </table>
  </q-page>
</template>
