import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { MenuItemInterface, MenuComponent } from '../menu/menu.component';
import { DataTableComponent } from '../data-table/data-table.component';


interface MetadataColumnInterface {
  name: string,
  label?: string,
  hidded?: boolean,
  type?: string
}
export interface MetaDataInterface {
  primaryColumnName?: string,
  columns: MetadataColumnInterface[],
}


@Component({
  selector: 'app-hybrid-view',
  templateUrl: './hybrid-view.component.html',
  styleUrls: ['./hybrid-view.component.scss']
})
export class HybridViewComponent implements OnInit {

  menuItems: MenuItemInterface[]
  @Output() menuItemClickEvent = new EventEmitter<string>();

  @Input() metadata: MetaDataInterface
  @Input() data: any[]
  @Input() formTemplate: TemplateRef<any>;

  @ViewChild(MenuComponent) private menuComponent: MenuComponent
  @ViewChild(DataTableComponent) private dataTable: DataTableComponent

  public currentRecord = null

  get selectedRecords() {
    return this.dataTable.selectedRecords
  }

  mode: "VIEW" | "FORM"

  constructor() {
    this.mode = "VIEW"

    this.menuItems = [
      {
        name: 'new'
      },
      {
        name: 'create',
        hidden: true
      },
      {
        name: 'edit',
        disabled: true
      },
      {
        name: 'update',
        hidden: true
      },
      {
        name: 'delete',
        hidden: true
      },
      {
        name: 'clear',
        disabled: true
      },
      {
        name: 'close',
        hidden: true
      }
    ]
  }

  ngOnInit(): void {
    this.mode = "VIEW"
  }

  /* 
  * Menu Item click event
  * @param name UniqueName of Menu Item
  */
  menuItemClicked(name) {
    // alert(name)
    if (name == 'new') {
      this.mode = "FORM"
      this.currentRecord = null
      this.menuComponent.hideMenuItem('new');

      this.menuComponent.disableMenuItem('update');

      this.menuComponent.showMenuItem('create', 'close');
    }
    else
      this.menuComponent.showMenuItem('new');

    if (name == 'create') {
      this.menuComponent.hideMenuItem('create');

    }

    if (name == 'edit') {
      this.currentRecord = this.selectedRecords[0]
      this.mode = "FORM"
    }
    if (name == 'clear') {
      if (this.dataTable && this.mode == 'VIEW')
        this.dataTable.selectedRecords = []
      if (this.mode == 'FORM') {

      }
    }
    if (name == 'close') {
      this.mode = 'VIEW'
      this.menuComponent.hideMenuItem('close');
    }

    if (this.mode == 'FORM') {
      this.menuComponent.showMenuItem('clear', 'update', 'close');
      this.menuComponent.enableMenuItem('clear', 'close');
      if (this.currentRecord)
        this.menuComponent.enableMenuItem('update');
      else
        this.menuComponent.disableMenuItem('update');
      this.menuComponent.hideMenuItem('edit');
    }
    else if (this.mode == 'VIEW') {
      this.menuComponent.hideMenuItem('update', 'create');
      this.menuComponent.enableMenuItem('clear');
      this.menuComponent.showMenuItem('edit', 'new');
    }


    this.menuItemClickEvent.emit(name);
  }

  dataSelected(id) {
    this.dataTable.selectedRecords = [id]
    this.menuComponent.enableMenuItem('clear');
    this.menuComponent.enableMenuItem('edit');
  }

}
