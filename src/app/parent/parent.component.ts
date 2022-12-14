import {
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  Component,
  ViewRef,
} from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  VCR: ViewContainerRef;

  Info: any = [];
  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<ChildComponent>>();

  constructor(private CFR: ComponentFactoryResolver) {}

  createComponent() {
    let componentFactory = this.CFR.resolveComponentFactory(ChildComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;

    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }

  allInfo() {
    if (this.VCR.length < 1) return;

    this.componentsReferences.forEach((o) => {
      this.Info.push(o.instance.passid);
    });
    console.log(this.Info);
  }

  remove(key: number) {
    if (this.VCR.length < 1) return;

    let componentRef = this.componentsReferences.filter(
      (x) => x.instance.unique_key == key
    )[0];

    let vcrIndex: number = this.VCR.indexOf(componentRef as any);

    // removing component from container
    this.VCR.remove(vcrIndex);

    // removing component from the list
    this.componentsReferences = this.componentsReferences.filter(
      (x) => x.instance.unique_key !== key
    );
  }
}
