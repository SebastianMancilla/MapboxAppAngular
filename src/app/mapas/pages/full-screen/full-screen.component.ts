import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: []
})
export class FullScreenComponent {
  ngOnInit(): void {
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-90.577745, 14.678279],
      zoom: 17
    });
  }


}
