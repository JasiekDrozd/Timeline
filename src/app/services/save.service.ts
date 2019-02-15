import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public storeData(someData): void {
    this.storage.set('localStorageData', someData);
    console.log(this.storage.get('localStorageData') || 'LocaL storage is empty');
  }

  public getData() {
    return this.storage.get('localStorageData');
  }

  public removeData(): void {
    this.storage.remove('localStorageData');
  }
}
