import 'zone.js/dist/zone';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { Contact, FamilyTree, Node } from './type';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bar">
    Nodes: 
    <button (click)="addNode()">Add</button>
    &nbsp;<select ><option *ngFor="let node of tree?.nodes">{{node.contact.name}}</option></select><br/>
    Edges: 
    From: <select (change)="changeNode($event,'S')"><option *ngFor="let node of tree?.nodes" value="{{node.id}}">{{node.contact.name}}</option></select>
    To: <select #targetNode ><option *ngFor="let node of tree?.nodes" value="{{node.id}}">{{node.contact.name}}</option></select>
    &nbsp;<button (click)="addEdge()">Add</button>
    </div>
    <div class="tree-container" #treeContainer>

    </div>
  `,
})
export class App implements OnInit {
  tree?: FamilyTree;

  @ViewChild('treeContainer', { static: true })
  treeContainer?: ElementRef;

  @ViewChild('sourceNode', { static: true })
  sourceNode?: ElementRef;
  @ViewChild('targetNode', { static: true })
  targetNode?: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    //load tree
    const activeContat: Contact = { id: 1, name: 'Robert Jonson' };
    const response = null;
    this.loadTree(response, activeContat);
    console.log(this.treeContainer);
  }

  loadTree(response: any, activeContact: Contact) {
    if (response) {
      this.tree = { ...response };
    } else {
      this.tree = {
        owner: activeContact,
        nodes: [{ id: 1, contact: activeContact, level: 0 }],
        edges: [],
      };
    }
    this.renderTree();
  }

  renderTree() {
    this.renderNodes();
  }
  renderNodes() {
    this.tree?.nodes.forEach((node) => {
      if (!node.rendered) {
        const element: HTMLElement = document.createElement('div');
        element.className = 'item';
        this.renderer.appendChild(this.treeContainer?.nativeElement, element);
        node.rendered = true;
      }
    });
  }
  renderEdges() {}
  addNode() {
    this.tree?.nodes.push({
      id: this.tree?.nodes.length + 1,
      contact: {
        id: this.tree?.nodes.length + 1,
        name: 'Item #' + (this.tree?.nodes.length + 1),
      },
    });
    this.renderNodes();
  }

  addEdge() {
    console.log(this.sourceNode?.nativeElement);
  }
  changeNode(item: any, type: string) {
    console.log(item, type);
  }
}

bootstrapApplication(App);
