import { Component } from '@angular/core';

@Component({
  selector: 'eb-modal-template',
  template: `
  <div (click)="onContainerClicked($event)" class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
       [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
    <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <ng-content select=".app-modal-header"></ng-content>
         </div>
         <div class="modal-body" style="font-size: 22px;text-align: center;">
           <ng-content select=".app-modal-body"></ng-content>
         </div>
         <div class="modal-footer">
           <ng-content select=".app-modal-footer"></ng-content>
         </div>
       </div>
     </div>
  </div>
  `,
  styles: [`
   .modal-dialog {
      width : 75%;

    }
    .modal-body{
      max-height: calc(100vh - 212px);
      overflow-y: auto;
    }
    .modal {
      background: rgba(0,0,0,0.6);
    }

    .modal-header, .modal-footer {
      border: 0;
    }
    @media (max-width: 767px){
      .modal-dialog {
        width : unset;
      }   
    }
    @media (max-width: 992px){
      .modal-body{
        max-height: none;
        height:85vh;
      }
      .modal-content{
        height: -webkit-fill-available;
      }
    }
  `]
})
export class ModalTemplateComponent {

  public visible = false;
  public visibleAnimate = false;

  constructor() { }

  public msgContent = '';
  public msgBtn = '';


  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    this.msgContent = '';
    this.msgBtn = '';
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  }