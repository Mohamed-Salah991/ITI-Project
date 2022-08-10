import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private http:HttpClient) {   }

  getDate():Observable<any>{
    return this.http.get('http://localhost:3500/getProducts');
    }
    geElectronics():Observable<any>{
    return this.http.get('http://localhost:3500/geElectronics');
    }
    gePhones():Observable<any>{
    return this.http.get('http://localhost:3500/gePhones');
    }
    geClothes():Observable<any>{
    return this.http.get('http://localhost:3500/geClothes');
    }

    geAllElectronics():Observable<any>{
    return this.http.get('http://localhost:3500/getAllElectronics');
    }
    geAllPhones():Observable<any>{
    return this.http.get('http://localhost:3500/getAllPhones');
    }
    geAllClothes():Observable<any>{
    return this.http.get('http://localhost:3500/getAllClothes');
    }

    geSingleElectronics(id:any):Observable<any>{
      console.log("Shop Service geSingleElectronics",id); 
    return this.http.get(`http://localhost:3500/getSingleElectronics/${id}`);
    }

}
