import { defineStore } from 'pinia';
import { Salles, Pieces } from 'src/components/models';

interface SallePieceState {
  salles: Salles[];
  pieces: Pieces[];
  fksalle: number;
  fkpiece: number;
}

export const useSallePieceStore = defineStore<'sallePiece', SallePieceState>({
  id: 'sallePiece',
  state: (): SallePieceState => ({
    salles: [],
    pieces: [],
    fksalle: 0,
    fkpiece: 0,
  }),
  getters: {},
  actions: {
    setResources(salles: Salles[], pieces: Pieces[]) {
      this.salles = salles;
      this.pieces = pieces;
    },
    setSalle(fksalle: number) {
      this.fksalle = fksalle;
    },
    setPiece(fkpiece: number) {
      this.fkpiece = fkpiece;
    },
  },
});
