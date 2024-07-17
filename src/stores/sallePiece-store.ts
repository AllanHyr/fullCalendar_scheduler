import { defineStore } from 'pinia';
import { Salles, Pieces, Batiments } from 'src/components/models';

interface SallePieceState {
  salles: Salles[];
  pieces: Pieces[];
  batiments: Batiments[];
  fksalle: number | null;
  fkpiece: number | null;
}

interface SallePieceActions {
  setResources(
    salles: Salles[],
    pieces: Pieces[],
    batiments: Batiments[]
  ): void;
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
    batiments: [],
    fksalle: null,
    fkpiece: null,
  }),
  getters: {},
  actions: {
    setResources(salles: Salles[], pieces: Pieces[], batiments: Batiments[]) {
      this.salles = salles;
      this.pieces = pieces;
      this.batiments = batiments;
    },
    setSalle(fksalle: number) {
      this.fksalle = fksalle;
    },
    setPiece(fkpiece: number) {
      this.fkpiece = fkpiece;
    },
  },
});
