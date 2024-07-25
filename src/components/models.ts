export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Link {
  title: string;
  caption: string;
  icon: string;
  link: string;
}

export interface Batiments {
  id: number;
  title: string;
}

export interface Salles {
  id: number;
  title: string;
  groupId: number;
}

export interface Pieces {
  id: number;
  title: string;
  groupId: number;
}

export interface Option {
  label: string;
  id?: number;
  disable?: boolean;
  value?: number;
  fksalle?: number;
}

export interface Ressources {
  id: number;
  title: string;
  key: string | number;
}
