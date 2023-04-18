import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  contactID: any;
  archivDialog: boolean = false;

  constructor() {
  }
}
