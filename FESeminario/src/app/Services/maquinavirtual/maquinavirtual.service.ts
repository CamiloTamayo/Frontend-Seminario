import { Injectable } from '@angular/core';
import {AxiosService} from "../axios/axios.service";
import {Router} from "@angular/router";
import {JwtService} from "../jwt.service";

@Injectable({
  providedIn: 'root'
})
export class MaquinavirtualService {
  infoToken:any;
  nombre:any;
  constructor(private axiosService:AxiosService, private router:Router, private decoder:JwtService) {
  }

  getMaquinasVirtuales(): Promise<any>{
    let token:any = this.decoder.DecodeToken(this.axiosService.getAuthToken()!);
    return this.axiosService.request(
      "POST",
      "/api/getvms",
      token.id);
  }

  getVM():Promise<any>{
    return new Promise(function (resolve){
      var request="/getvms"

    });
  }
}