import { defineStore } from 'pinia';
import { Ressources } from 'src/components/models';

export const useRessourceStore = defineStore('ressource', {
  state: () => ({
    ressources: [],
  }),
  getters: {},
  actions: {
    setRessources(items: Ressources[]) {
      this.ressources = items;
    },
  },
});
