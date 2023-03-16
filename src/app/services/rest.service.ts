import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor( private _http: HttpClient, private _state: StateService) { }


public addDevices(data: any){
const url = environment.url + "/devices/add_tank_level"
return this._http.post(url,data)
}




}
