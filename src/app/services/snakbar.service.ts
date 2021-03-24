import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnakbarService {
  constructor(
    private _snackBar: MatSnackBar) {
  }

  error(message: string, action:string) {
    return this._snackBar.open(message,null, {
      duration: 3000,
    });
  }

  success(message: string, action:string) {
    return this._snackBar.open(message, null, {
      duration: 3000,
    });
  }

  info(message: string, action:string) {
    return this._snackBar.open(message,null, {
      duration: 3000,
    });
  }
}
