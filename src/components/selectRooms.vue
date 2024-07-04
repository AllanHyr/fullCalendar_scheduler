<script setup lang="ts"></script>

<template>
  <q-select
    v-if="this.$props.selectResource"
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
    :dense="$props.dense"
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
