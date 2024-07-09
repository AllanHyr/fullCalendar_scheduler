import { defineStore } from 'pinia';
import { Salles, Pieces } from 'src/components/models';

interface SallePieceState {
  salles: Salles[];
  pieces: Pieces[];
  fksalle: number;
  fkpiece: number;
}

interface SallePieceActions {
  setResources(salles: Salles[], pieces: Pieces[]): void;
  setSalle(fksalle: number): void;
  setPiece(fkpiece: number): void;
}

export type SallePieceStore = SallePieceState & SallePieceActions;

export const useSallePieceStore = defineStore<
  'sallePiece',
  SallePieceState,
  Record<string, never>, // This explicitly types the getters as an empty object
  SallePieceActions
>({
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
