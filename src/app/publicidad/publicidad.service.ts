import { Injectable } from "@angular/core";
import { Publicidad } from "./publicidad";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import {PublicidadDetail} from "./publicidad-detail";

const API_URL = 'http://localhost:8080/s1_mascotas-api/api/';
const editorials = 'publicidades';

//const API_URL = "../../assets/";
//const editorials = "publicidades.json";

//German Rozo
@Injectable()
export class PublicidadService {
  
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) {}

  getPublicidades(): Observable<Publicidad[]>
  {
    return this.http.get<Publicidad[]>(API_URL + editorials+"/all");
  }

  getPublicidadDetail(id: number): Observable<PublicidadDetail>
  {
    return this.http.get<PublicidadDetail>(API_URL + editorials +"/"+ id);
  }

  getPublicidad(): Observable<PublicidadDetail>
  {
    return this.http.get<PublicidadDetail>(API_URL + editorials);
  }

  createPublicidad(publicidad: PublicidadDetail): Observable<PublicidadDetail> {
    return this.http
      .post<PublicidadDetail>(API_URL + editorials, publicidad, this.httpOptions);
  }
}
