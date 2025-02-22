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
    return this.http.get<ICategoria[]>(`${this.urlAPI}categorias`, { headers: this.getHeaders() });
  }

  addCategoria(categoria: ICategoria): Observable<ICategoria> {
    return this.http.post<ICategoria>(`${this.urlAPI}categorias`, categoria, { headers: this.getHeaders() });
  }

  updateCategoria(categoria: ICategoria): Observable<ICategoria> {
    return this.http.put<ICategoria>(`${this.urlAPI}categorias/${categoria.idCategoria}`, categoria, { headers: this.getHeaders() });
  }

  deleteCategoria(id: number): Observable<ICategoria> {
    return this.http.delete<ICategoria>(`${this.urlAPI}categorias/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = this.authGuard.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getProductos(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(`${this.urlAPI}productos`, { headers: this.getHeaders() });
  }

  addProducto(producto: IProducto): Observable<IProducto> {
    const formData = new FormData();
    formData.append('nombreProducto', producto.nombreProducto);
    formData.append('precio', producto.precio.toString());
    formData.append('categoriaId', producto.categoriaId?.toString() || '');
    formData.append('descatalogado', producto.descatalogado ? 'true' : 'false');
    if (producto.foto) {
      formData.append('foto', producto.foto);
    }

    return this.http.post<IProducto>(`${this.urlAPI}productos`, formData, { headers: this.getHeaders() });
  }

  updateProducto(producto: IProducto): Observable<IProducto> {
    const formData = new FormData();
    formData.append('idProducto', producto.idProducto.toString());
    formData.append('nombreProducto', producto.nombreProducto);
    formData.append('precio', producto.precio.toString());
    formData.append('categoriaId', producto.categoriaId?.toString() || '');
    formData.append('descatalogado', producto.descatalogado ? 'true' : 'false');
    if (producto.foto) {
      formData.append('foto', producto.foto);
    }

    return this.http.put<IProducto>(`${this.urlAPI}productos/${producto.idProducto}`, formData, { headers: this.getHeaders() });
  }

  deleteProducto(id: number): Observable<IProducto> {
    return this.http.delete<IProducto>(`${this.urlAPI}productos/${id}`, { headers: this.getHeaders() });
  }
}
