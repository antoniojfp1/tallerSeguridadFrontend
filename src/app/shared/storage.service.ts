import { Injectable } from '@angular/core';
import { UserStorage } from './userStorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public static STORAGE_USER: string = 'user';

  constructor() { }

  create(storageName: string, data: UserStorage | string): void {
    if(localStorage.getItem(storageName)) {
      localStorage.removeItem(storageName);
    }
    localStorage.setItem(storageName, JSON.stringify(data));
  }

  get userinfo(): UserStorage {
    if (localStorage.getItem(StorageService.STORAGE_USER) != null) {
      return JSON.parse(localStorage.getItem(StorageService.STORAGE_USER));
    } else {
      console.log('Error en local storage');
    }
  }

  clear(): void {
    localStorage.removeItem(StorageService.STORAGE_USER);
  }

}
