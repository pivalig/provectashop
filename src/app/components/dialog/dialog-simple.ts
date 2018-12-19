import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


@Component({
  selector: 'dialog-simple',
  template: `<h1 mat-dialog-title>{{title}}</h1>
    <div mat-dialog-content>
      <p>{{message}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">{{'Cancel'|translate}}</button>
      <button mat-button color="accent" [mat-dialog-close]="true" cdkFocusInitial>{{'Ok'|translate}}</button>
    </div>
    `,
})
export class DialogSimple {


  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<DialogSimple>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

      if(data){
        this.title = data.title;
        this.message = data.message;
      }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}