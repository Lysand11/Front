import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';

@Injectable({
   providedIn: 'root'
})
export class EmpleadoService {

   selectedEmpleado: Empleado;
   empleados: Empleado[];
   readonly URL_API = 'https://vercel.app';


   constructor(private http: HttpClient) {
     this.selectedEmpleado = new Empleado();
     this.empleados = [];
   }

   getEmpleados() {
     return this.http.get<Empleado[]>(this.URL_API);
   }

   postEmpleado(empleado: Empleado) {
     return this.http.post<{ status: string }>(this.URL_API, empleado);
   }

   putEmpleado(empleado: Empleado) {
     return this.http.put<{ status: string }>(this.URL_API + `/${empleado._id}`, empleado);
   }

   deleteEmpleado(_id: string) {
     // Solo se necesita el id, no todo lo del empleado
     return this.http.delete<{ status: string }>(this.URL_API + `/${_id}`); // utilizamos el método delete
   }

}