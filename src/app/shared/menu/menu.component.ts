import { Component } from '@angular/core';

interface MenuItem{
  route: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
    li{
      cursor: pointer;
    }
  `]
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    {route: '/mapas/fullscreen', name: 'FullScreen'},
    {route: '/mapas/zoom-range', name: 'Zoom Range'},
    {route: '/mapas/marcadores', name: 'Marcadores'},
    {route: '/mapas/properties', name: 'Propiedades'},
  ];
}
