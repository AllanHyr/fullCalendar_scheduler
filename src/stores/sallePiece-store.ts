import { defineStore } from 'pinia';
import { Salles, Pieces } from 'src/components/models';

interface SallePieceState {
  salles: Salles[];
  pieces: Pieces[];
}

export const useSallePieceStore = defineStore<'sallePiece', SallePieceState>({
  id: 'sallePiece',
  state: (): SallePieceState => ({
    salles: [],
    pieces: [],
  }),
  getters: {},
  actions: {
    setResources(salles: Salles[], pieces: Pieces[]) {
      this.salles = salles;
      this.pieces = pieces;
    },
  },
});
