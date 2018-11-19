import { Component, OnInit } from '@angular/core';

import { XmaslistService } from '../services/xmaslist.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Child}  from '../models/child';

declare var ol: any;

@Component({
  selector: 'app-xmas-listing',
  templateUrl: './xmas-listing.component.html',
  styleUrls: ['./xmas-listing.component.css']
})
export class XmasListingComponent implements OnInit {
  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: any;  

  private jwtHelper = new JwtHelperService();
  
  public roleType: string;

  public xmasListingArray:Child[] = [];
  public selectedChild : Child;

  
  constructor(private _xmasListService: XmaslistService) { }

  ngOnInit() {
    this.getXmasListing();

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),        
        zoom: 8
      })
    });    

  }


  showMap(child: Child): void {    
    var longitudeLoc = child.longitude;
    var latitudeLoc = child.latitude;

    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([longitudeLoc, latitudeLoc]));
    view.setZoom(8);
  }

  onSelect(child: Child): void {
    this.selectedChild= child;    
  }


  getXmasListing(): void {
    var token = localStorage.getItem("jwt");
    var aTokenObj = this.jwtHelper.decodeToken(token);
    this.roleType = aTokenObj.typ;
    
    this._xmasListService.getXmasListing()
    .subscribe(
      aListing => {
        this.xmasListingArray = aListing;
      }
    );
  }


  delete(child: Child): void {
    this.xmasListingArray  = this.xmasListingArray.filter(s =>  s !== child);
    this._xmasListService.deleteChild(child).subscribe();
  }


  add(firstName: string, lastName: string, birthDay: Date, street: string, city: string,
      province: string, postalCode: string, country: string, latitude: number, longitude: number,
      isNaughty: boolean): void {
    if (!firstName && !lastName && !birthDay && !street && !city && !province && !postalCode && !country) 
    { return; }    

    var s = new Child();
    s.firstName = firstName;
    s.lastName = lastName;
    s.birthDate = birthDay;
    s.street = street;
    s.city = city;
    s.province = province;
    s.postalCode = postalCode;
    s.country = country;
    s.latitude = latitude;
    s.longitude = longitude;
    s.isNaughty = isNaughty;
    
    this._xmasListService.addChild(s)
        .subscribe(child => {
          this.xmasListingArray.push(child);
        });
  }  

  save(): void {
    this._xmasListService.updateChild(this.selectedChild)
      .subscribe(()=>window.location.reload());
  }  

  cancel(): void {
    window.location.reload();
  }


  quickTest(param)
  {
    alert(param);
  }

}
