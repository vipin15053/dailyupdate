/**
 * Created By : Vipin Yadav 
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { setTokenInHeader } from '../config/config.service';

@Injectable()
export class MaterialService {
  httpoptions: any;
  
  constructor(private _http:HttpClient) { 
  }

  // Get material details.........
  getMaterialDetailsById(ID:string){
    return this._http.get(`${environment.apiUrl}/materialDetails/${ID}`,{headers:setTokenInHeader()});
  }
  // Get all Material list via API ...........
  getAllMaterials() {
    return this._http.get(`${environment.apiUrl}/materialList`,{headers:setTokenInHeader()});
  }
  // add meterial .........
  addMaterial(data){
    return this._http.post(`${environment.apiUrl}/materials/add`,data,{headers:setTokenInHeader()});
  }
  // update materials by id........
  updateMaterial(data,mtID:string){
    return this._http.post(`${environment.apiUrl}/updateMaterial/${mtID}`,data,{headers:setTokenInHeader()});
  }
  //  delete material ............
  deletematerial(index){
    return this._http.delete(`${environment.apiUrl}/deleteMaterial/${index}`,{headers:setTokenInHeader()});
  }
}
/**
 * Created By : Vipin Yadav 
 */
