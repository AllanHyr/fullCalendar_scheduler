<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useSallePieceStore } from 'stores/sallePiece-store';

const sallePieceStore = useSallePieceStore();

const selectedSalle = ref(sallePieceStore.fksalle);
const selectedPiece = ref(sallePieceStore.fkpiece);

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
</script>

<template>
  <q-form>
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
  </q-form>
</template>
