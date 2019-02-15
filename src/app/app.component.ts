import { LocalStorageService } from './services/save.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LocalStorageService]
})
export class AppComponent {
  apptitle = 'My timeline';
  tasksList = [];
  saveList = [];
  helpers = new Helpers();

  constructor(private saveService: LocalStorageService) {
    this.readList(true);
  }

  readList(close?: boolean) {
    if (this.saveService.getData().length > 0) {
      this.tasksList = JSON.parse(this.saveService.getData()).sort(this.helpers.dynamicSort('hour'));
    }

    if (close === true && this.tasksList.length > 0) {
      this.tasksList.forEach(task => {
        task.onoff = true;
      });
    }
  }

  addTask(): void {
    this.tasksList.push({ title: '', hour: '', text: '', onoff: false }); // onoff:false to open in edit mode
  }

  edit(index: number) {
    this.isDisabled(index, false);
  }

  save(index: number) {
    this.tasksList[index].onoff = true;
    this.storeData(this.tasksList);
    this.readList(); // refresh view
  }

  storeData(data) {
    this.saveService.storeData(JSON.stringify(data));
  }

  delete(index: number) {
    const removed = this.tasksList.splice(index, 1);
    this.storeData(this.tasksList);
    this.readList(); // refresh view
  }

  isDisabled(index: number, switcher?: boolean) {
    if (switcher !== undefined) { this.tasksList[index].onoff = switcher; }
    return this.tasksList[index].onoff;
  }
}

class Helpers {
  validateHhMm(stringTime: string) {
    const isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(stringTime);
    return isValid;
  }

  dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a, b) => {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
}
