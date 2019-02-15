import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgModule} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input()
  tasks = [];
  @Output()
  emitEdit = new EventEmitter<number>();
  @Output()
  emitDelete = new EventEmitter<number>();
  @Output()
  emitSave = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  edit(index: number) {
    this.emitEdit.emit(index);
  }

  delete(index: number) {
    this.emitDelete.emit(index);
  }

  save(index: number) {
    this.emitSave.emit(index);
  }

  isDisabled(index: number) {
    return this.tasks[index].onoff;
  }

}
