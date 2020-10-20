import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { environment } from '../../../../environments/environment'

export interface MenuItemInterface{
  name:string,
  label?:string,
  disabled?:boolean,
  hidden?:boolean,
  devOnly?:boolean
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() menuItemClickEvent = new EventEmitter<string>();
  @Input() menuItems: MenuItemInterface[]
  isProd = environment.production

  constructor() { }

  ngOnInit(): void {
  }

  menuItemClicked(name){
    this.menuItemClickEvent.emit(name);
  }

  updateMenuItemLabel(name, label){
    this.menuItems.filter(x => x.name == name).forEach(item => item.label = label)
  }

  enableMenuItem(...name:string[]){
    name.forEach(item => {      
      this.menuItems.filter(x => x.name == item).forEach(item => item.disabled = false)
    })
  }

  disableMenuItem(...name:string[]){
    name.forEach(item => {      
      this.menuItems.filter(x => x.name == item).forEach(item => item.disabled = true)
    })
  }

  showMenuItem(...name:string[]){
    name.forEach(item => {      
      this.menuItems.filter(x => x.name == item).forEach(item => item.hidden = false)
    })
  }

  hideMenuItem(...name:string[]){
    name.forEach(item => {      
      this.menuItems.filter(x => x.name == item).forEach(item => item.hidden = true)
    })
  }

  removeMenuItem(name){
    this.menuItems = this.menuItems.filter(x => x.name != name);
  }

  addMenuItem(menuItem: MenuItemInterface){
    this.menuItems.push(menuItem);
  }

}
