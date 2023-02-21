import { Component, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'


interface MarkerColor {
  color: string,
  marker?: mapboxgl.Marker,
  center?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .list-group {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 99;
    }
    .list-group li{
      cursor: pointer;
    }
  `]
})
export class MarcadoresComponent {
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 11;
  latLon: [number, number] = [-90.577745, 14.678279];

  //Arreglo de marcadores
  markers: MarkerColor[] = [];

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.latLon,
      zoom: this.zoomLevel,
    });

    this.readLocalStorage();
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';

    // new mapboxgl.Marker()
    //   .setLngLat(this.latLon)
    //   .addTo(this.map);
  }

  addMarker() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const newMarker = new mapboxgl.Marker(
      {
        draggable: true,
        color
      })
      .setLngLat(this.latLon)
      .addTo(this.map);

    this.markers.push({
      color,
      marker: newMarker
    });

    this.saveMarkersLocalStorage();

    newMarker.on('dragend', () => {
      this.saveMarkersLocalStorage();
    });
  }

  goMarker(marker: mapboxgl.Marker) {
    this.map.flyTo({
      center: marker.getLngLat(),
    });
  }

  saveMarkersLocalStorage() {

    const lngLatArr: MarkerColor[] = [];
    this.markers.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        center: [lng, lat],
      });

      localStorage.setItem('markers', JSON.stringify(lngLatArr));
    });
  }

  readLocalStorage() {
    if (!localStorage.getItem('markers')) {
      return;
    }

    const lngLatArr: MarkerColor[] = JSON.parse(localStorage.getItem('markers')!);

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      }).setLngLat(m.center!)
        .addTo(this.map);

      this.markers.push({
        marker: newMarker,
        color: m.color
      });


      newMarker.on('dragend', () => {
        this.saveMarkersLocalStorage();
      });

    });

  }

  deleteMarker(i: number){
    this.markers[i].marker?.remove();
    this.markers.splice(i,1);
    this.saveMarkersLocalStorage();
  }


}
