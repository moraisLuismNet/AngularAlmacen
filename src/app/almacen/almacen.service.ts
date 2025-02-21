import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuard } from '../guards/auth-guard.service';
import { environment } from 'src/environments/environment';
import { ICategoria, IProducto } from './almacen.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  urlAPI = environment.urlAPI;
  constructor(private http: HttpClient, private authGuard: AuthGuard) {}

  getCategorias(): Observable<ICategoria[]> {
    const headers = this.getHeaders();
    return this.http.get<ICategoria[]>(`${this.urlAPI}categorias`, { headers });
  }

  addCategoria(categoria: ICategoria): Observable<ICategoria> {
    const headers = this.getHeaders();
    return this.http.post<ICategoria>(`${this.urlAPI}categorias`, categoria, { headers });
  }

  updateCategoria(categoria: ICategoria): Observable<ICategoria> {
    const headers = this.getHeaders();
    return this.http.put<ICategoria>(`${this.urlAPI}categorias/${categoria.idCategoria}`, categoria, {
      headers
    });
  }

  deleteCategoria(id: number): Observable<ICategoria> {
    const headers = this.getHeaders();
    return this.http.delete<ICategoria>(`${this.urlAPI}categorias/${id}`, {
      headers
    });
  }

  getHeaders(): HttpHeaders {
    const token = this.authGuard.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return headers;
  }

  getProductos(): Observable<IProducto[]> {
    const headers = this.getHeaders();
    return this.http.get<IProducto[]>(`${this.urlAPI}Productos`, { headers });
  }

  addProducto(producto: IProducto): Observable<IProducto> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('nombre', producto.nombreProducto);
    formData.append('precio', producto.precio.toString());
    formData.append('categoria', producto.categoriaId?.toString()!);
    formData.append('descatalogado', producto.descatalogado ? 'true' : 'false');
    formData.append('foto', producto.foto!);

    return this.http.post<IProducto>(`${this.urlAPI}Productos`, formData, { headers });
  }

  deleteProducto(id: number): Observable<IProducto> {
    const headers = this.getHeaders();
    return this.http.delete<IProducto>(`${this.urlAPI}Productos/${id}`, {
      headers
    });
  }
}
