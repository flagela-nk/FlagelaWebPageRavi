import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


interface DataTableColumnInterface{
  name: string,
  label?: string,
  hidded?: boolean,
  type?: string
}
export interface DataTableInterface {
  primaryColumnName: string,
  columns: DataTableColumnInterface[],
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  public selectedRecords = []

  @Output() rowClickEvent = new EventEmitter()
  @Output() rowClickDblEvent = new EventEmitter()
  @Input() tableMetadata: DataTableInterface
  @Input() tableData: any[]

  get headers() {
    return this.tableMetadata.columns.map(x => x.name)
  }

  getType(columnName){
    var column = this.tableMetadata.columns.filter(x=> x.name == columnName)
    var type = column ? (column[0]['type'] || 'string') : 'string';
    console.log(column, columnName, type)
    return type
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.headers)
  }

  rowClicked(primaryColumnValue) {
    this.rowClickEvent.emit(primaryColumnValue);
  }

}

