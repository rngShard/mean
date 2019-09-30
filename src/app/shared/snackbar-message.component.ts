import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar-message',
  template: `
    <div>
      <p *ngIf="msg">{{ msg }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: ['div {display: none;}']
})
export class SnackbarMessageComponent {
  @Input() msg: string;

  constructor() {}

  /* Use this in multiple variants (the 2nd one being promoted):
  <snackbar-message message="There was a strange error" i18n-message="@@StrangeErrorAsAttribute"></snackbar-messsage>
  <snackbar-message i18n="@@StrangeErrorAsContent">
      There was a strange error
  </snackbar-messsage>
  <snackbar-message>
      <p i18n="@@StrangeErrorAsParagraph">There was a strange error</p>
  </snackbar-messsage>
  */
}
