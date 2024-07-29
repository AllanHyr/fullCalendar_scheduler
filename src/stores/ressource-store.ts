import { defineStore } from 'pinia';
import { Ressources } from 'src/components/models';

export const useRessourceStore = defineStore('ressource', {
  state: () => ({
    ressources: [],
    nbRessources: 3,
  }),
  getters: {
    getRessources() {
      const arrayColspan = [];

      const array = this.ressources.filter((ressource) => {
        return ressource.key.split('-').length === this.nbRessources;
      });

      this.ressources.forEach((ressource) => {
        const keySplit = ressource.key.split('-');
        let colspan = 0;
        array.forEach((item) => {
          if (item.key.startsWith(ressource.key)) {
            colspan++;
          }
        });
        arrayColspan.push({
          niveau: keySplit.length,
          title: ressource.title,
          key: ressource.key,
          colspan: colspan,
        });
      });
      return arrayColspan;
    },
  },
  actions: {
    setRessources(items: Ressources[]) {
      this.ressources = items;
    },
  },
});
