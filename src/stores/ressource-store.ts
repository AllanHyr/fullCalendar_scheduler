import { defineStore } from 'pinia';
import { Ressources } from 'src/components/models';

export const useRessourceStore = defineStore('ressource', {
  state: () => ({
    ressources: [],
    nbRessources: 0,
    roomSelected: null,
  }),
  getters: {
    getRessources() {
      const arrayColspan = [];

      let array = this.ressources.filter((ressource) => {
        return ressource.key.split('-').length === this.nbRessources;
      });

      if (this.roomSelected !== null) {
        array = array.filter((ressource) =>
          ressource.key.startsWith(this.roomSelected)
        );
      }

      this.ressources.forEach((ressource) => {
        const keySplit = ressource.key.split('-');
        let colspan = 0;
        array.forEach((item) => {
          if (item.key.startsWith(ressource.key)) {
            colspan++;
          }
        });
        arrayColspan.push({
          id: ressource.id,
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
    setRessources(items: Ressources[], nbRessource: number) {
      this.ressources = items;
      this.nbRessources = nbRessource;
    },
    setSelectedRessource(roomSelected: string) {
      this.roomSelected = roomSelected;
    },
  },
});
