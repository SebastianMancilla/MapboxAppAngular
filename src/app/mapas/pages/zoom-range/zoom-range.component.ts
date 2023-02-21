import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 5rem;
      left: 5rem;
      padding: 1rem;
      position: fixed;
      z-index: 9999;
      width: 400px;
    }
  `]
})
export class ZoomRangeComponent{
  @ViewChild('map') divMap!: ElementRef;
  zoomLevel: number = 11;
  map!: mapboxgl.Map;
  latLon: [number, number] = [-90.577745, 14.678279];
  
  ngAfterViewInit(): void{
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.latLon,
      zoom: this.zoomLevel
    });

    this.map.on('zoom', () =>{
      this.zoomLevel = this.map.getZoom()
    });

    this.map.on('zoomend', () =>{
      if(this.map.getZoom() > 18){
        this.map.zoomTo(18);
      }
    });

    //Movimiento del mapa
    this.map.on('move', (event) => {
      const target = event.target;
      const {lng, lat} = target.getCenter();
      this.latLon = [lng, lat];
    });
  }


  zoomIn(){
    this.map.zoomIn();
  }

  zoomOut(){
    this.map.zoomOut();
  }

  zoomChange(value: string){
    this.map.zoomTo(Number(value));
  }

}
