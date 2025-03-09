import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dailog',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-dailog.component.html',
  styleUrl: './confirmation-dailog.component.scss'
})
export class ConfirmationDailogComponent {


  constructor(
    public dialogRef: MatDialogRef<ConfirmationDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  
}
