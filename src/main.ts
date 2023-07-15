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
import { Contact, FamilyTree } from './type';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="addNode()">Add</button>
    <div class="tree-container" #treeContainer>

    </div>
  `,
})
export class App implements OnInit {
  tree?: FamilyTree;

  @ViewChild('treeContainer', { static: true })
  treeContainer?: ElementRef;

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
    this.tree?.nodes.push({ id: 1040, contact: { id: 1050, name: 'Jisus' } });
    this.renderNodes();
  }
}

bootstrapApplication(App);
