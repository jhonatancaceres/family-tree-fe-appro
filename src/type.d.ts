export interface Contact {
  id: number;
  name: string;
}

export interface Node {
  id: number;
  contact: Contact;
  attributes?: any;
  level?: number;
  rendered?: boolean;
}

export interface Edge {
  id: number;
  source: Contact;
  target: Contact;
  attributes: any;
  rendered?: boolean;
}

export interface FamilyTree {
  owner: Contact;
  nodes: Node[];
  edges: Edge[];
}
