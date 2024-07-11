<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useSallePieceStore } from 'stores/sallePiece-store';
import { api } from 'boot/axios';
import moment from 'moment';

const sallePieceStore = useSallePieceStore();

const selectedSalle = ref<number | null>(sallePieceStore.fksalle);
const selectedPiece = ref<number | null>(sallePieceStore.fkpiece);

const props = defineProps<{
  startDate: string;
  endDate: string;
  resourceId: number | null;
}>();

const eventText = ref('');
const dateStart = ref('');
const dateEnd = ref('');

watch(
  () => sallePieceStore.fksalle,
  (newValue) => {
    selectedSalle.value = newValue;
  }
);

watch(
  () => sallePieceStore.fkpiece,
  (newValue) => {
    selectedPiece.value = newValue;
  }
);

async function addEvent() {
  let eventData = {
    start_date: moment(dateStart.value).format('YYYY-DD-MM HH:mm'),
    end_date: moment(dateEnd.value).format('YYYY-DD-MM HH:mm'),
    text: eventText.value,
    section_id: props.resourceId,
  };
  try {
    const response = await api.post('/events', eventData);
    console.log('Event inserted:', response.data);
  } catch (error) {
    console.error('Error inserting event:', error);
  }
}

onMounted(() => {
  dateStart.value = moment(props.startDate).format('DD/MM/YYYY HH:mm');
  dateEnd.value = moment(props.endDate).format('DD/MM/YYYY HH:mm');
});

const onSubmit = () => {
  addEvent();
};
</script>

<template>
  <q-form @submit="onSubmit">
    <q-input v-model="eventText" label="Événement" class="q-mb-md" />
    <q-input label="date de fin" v-model="dateStart" class="q-mb-md">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="dateStart" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="dateStart" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input label="date de début" v-model="dateEnd" class="q-mb-md">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="dateEnd" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="dateEnd" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <div class="row justify-center">
      <q-btn label="Valider" type="submit" color="primary" />
    </div>
  </q-form>
</template>
