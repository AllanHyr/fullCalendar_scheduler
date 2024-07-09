<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useSallePieceStore } from 'stores/sallePiece-store';

const sallePieceStore = useSallePieceStore();

const selectedSalle = ref(sallePieceStore.fksalle);
const selectedPiece = ref(sallePieceStore.fkpiece);

const eventText = ref('');
const date = ref('2019-02-01 12:44');

const sallesOptions = computed(() =>
  sallePieceStore.salles.map((salle) => ({
    label: salle.title,
    value: salle.id,
  }))
);

const piecesOptions = computed(() =>
  sallePieceStore.pieces
    .filter((piece) => piece.groupId === selectedSalle.value)
    .map((piece) => ({
      label: piece.title,
      value: piece.id,
    }))
);

const onSalleChange = (value: number) => {
  sallePieceStore.setSalle(value);
  selectedPiece.value = 0; // Reset piece selection when salle changes
};

const onPieceChange = (value: number) => {
  sallePieceStore.setPiece(value);
};

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

const onSubmit = () => {
  alert('test');
};
</script>

<template>
  <q-form @submit="onSubmit">
    <q-select
      v-model="selectedSalle"
      :options="sallesOptions"
      label="Ma salle"
      emit-value
      map-options
      @input="onSalleChange"
    />
    <q-select
      v-model="selectedPiece"
      :options="piecesOptions"
      label="Ma pièce"
      emit-value
      map-options
      @input="onPieceChange"
    />
    <q-input v-model="eventText" label="Événement" />
    <q-input label="date de fin" v-model="date">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
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
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input label="date de début" v-model="date">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
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
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-btn label="Valider" type="submit" color="primary" />
  </q-form>
</template>
