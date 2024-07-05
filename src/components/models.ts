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

export interface Salles {
  id: number;
  title: string;
}

export interface Pieces {
  id: number;
  title: string;
  groupId: number;
}
