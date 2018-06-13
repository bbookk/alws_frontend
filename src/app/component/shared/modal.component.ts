import { Component } from '@angular/core';


@Component({
  selector: 'alw-modal',
  template: `
    <div class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
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
      width : 40%;

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
    // @media (max-width: 767px){ 
    //   .modal-body{
    //     min-height: 80%;
    //     //max-height: 360px;
    //   }
    // }
    // @media (min-width: 767px){ 
    //   .modal-body{
    //     min-height: 90%;
    //     //max-height: 360px;
    //   }
    // }
  `]
})
export class ModalComponent {

  public visible = false;
  public visibleAnimate = false;

  constructor() { }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

}
