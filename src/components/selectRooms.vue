<script setup lang="ts">
import { useSallePieceStore } from 'stores/sallePiece-store';
import { Option } from 'src/components/models';

const sallePieceStore = useSallePieceStore();

function optionsRessourcesOption() {
  let options: Option[];
  if (sallePieceStore.salles.length === 0) {
    return [];
  }
  sallePieceStore.salles.forEach((salle) => {
    options.push({
      label: salle.title,
      disable: true,
      id: salle.id,
    });
    sallePieceStore.pieces.forEach((resource) => {
      if (resource.groupId == salle.id)
        options.push({
          label: resource.title,
          value: resource.id,
          fksalle: resource.groupId,
        });
    });
  });
  return options;
}
</script>

<template>
  <q-select
    use-input
    input-debounce="500"
    v-model="resource"
    :options="optionsRessourcesOption"
    :label="'Choix de la ' + this.libelleRessource"
    style="width: 100%; margin-right: auto; margin-left: auto"
    class="print-hide bg-white rounded-borders q-px-sm"
    @filter="filterFnResource"
    @update:model-value="changeValue()"
    emit-value
    options-dense
    map-options
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> Pas de résultats </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
