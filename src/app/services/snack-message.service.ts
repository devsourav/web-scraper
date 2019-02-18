import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackMessageService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
