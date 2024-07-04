import { defineStore } from 'pinia';

export const useSallePieceStore = defineStore('sallePiece', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
