import { Component, OnInit, ViewChild } from '@angular/core';
import { AlmacenService } from '../almacen.service';
import { ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ICategoria, IProducto } from '../almacen.interfaces';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ConfirmationService]
})
export class ProductosComponent implements OnInit {
  constructor(private almacenService: AlmacenService, private confirmationService: ConfirmationService) {}
  @ViewChild('formulario') formulario!: NgForm;
  visibleError = false;
  mensajeError = '';
  productos: IProducto[] = [];
  categorias: ICategoria[] = [];
  visibleConfirm = false;
  urlImagen = '';
  visibleFoto = false;
  foto = '';

  producto: IProducto = {
    idProducto: 0,
    nombreProducto: '',
    precio: 0,
    foto: null,
    descatalogado: false,
    categoriaId: null,
    nombreCategoria: '',
  };

  ngOnInit(): void {
    this.getCategorias();
    this.getProductos();
  }

  getCategorias() {
    this.almacenService.getCategorias().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.categorias = data;
      },
      error: (err) => {
        this.controlarError(err);
      }
    });
  }

  getProductos() {
    this.almacenService.getProductos().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.productos = data;
        console.log(this.productos);
      },
      error: (err) => {
        this.controlarError(err);
      }
    });
  }

  onChange(event: any) {
    const file = event.target.files;

    if (file) {
      this.producto.foto = file[0];
    }
  }

  showImage(producto: IProducto) {
    this.foto = producto.fotoUrl!;
    this.visibleFoto = true;
  }

  guardar() {
    this.almacenService.addProducto(this.producto).subscribe({
      next: (data: any) => {
        this.visibleError = false;
        this.formulario.reset();
        this.getProductos();
      },
      error: (err: any) => {
        this.controlarError(err);
      }
    });
  }

  confirmDelete(producto: IProducto) {
    this.confirmationService.confirm({
      message: `Eliminar el producto ${producto.nombreProducto}?`,
      header: 'Estás seguro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí´',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteProducto(producto.idProducto)
    });
  }

  deleteProducto(id: number) {
    this.almacenService.deleteProducto(id).subscribe({
      next: (data: IProducto) => {
        this.visibleError = false;
        this.getProductos();
      },
      error: (err: any) => {
        this.controlarError(err);
      }
    });
  }

  controlarError(err: any){
    this.visibleError = true;
    if (err.error && typeof err.error === 'object' && err.error.message) {
      this.mensajeError = err.error.message;
    } else if (typeof err.error === 'string') {
      // Si `err.error` es un string, se asume que es el mensaje de error
      this.mensajeError = err.error;
    } else {
      // Maneja el caso en el que no se recibe un mensaje de error útil
      this.mensajeError = 'Se ha producido un error inesperado';
    }
  }
}
