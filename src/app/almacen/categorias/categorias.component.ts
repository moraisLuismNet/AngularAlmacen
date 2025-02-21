import { Component, OnInit, ViewChild } from '@angular/core';
import { AlmacenService } from '../almacen.service';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ICategoria } from '../almacen.interfaces';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [ConfirmationService]
})
export class CategoriasComponent implements OnInit {
  constructor(private almacenService: AlmacenService, private confirmationService: ConfirmationService) {}
  @ViewChild('formulario') formulario!: NgForm;
  visibleError = false;
  mensajeError = '';
  categorias: ICategoria[] = [];
  visibleConfirm = false;

  categoria: ICategoria = {
    idCategoria: 0,
    nombreCategoria: ''
  };

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.almacenService.getCategorias().subscribe({
      next: (data) => {
        console.log(data);
        this.visibleError = false;
        this.categorias = data;
      },
      error: (err) => {
        this.controlarError(err);
      }
    });
  }

  guardar() {
    if (this.categoria.idCategoria === 0) {
      this.almacenService.addCategoria(this.categoria).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.formulario.reset();
          this.getCategorias();
        },
        error: (err) => {
          console.log(err);
          this.visibleError = true;
          this.mensajeError = 'Se ha producido un error';
        }
      });
    } else {
      this.almacenService.updateCategoria(this.categoria).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.cancelarEdicion();
          this.formulario.reset();
          this.getCategorias();
        },
        error: (err) => {
          this.visibleError = true;
            this.mensajeError = 'Se ha producido un error';
        }
      });
    }
  }

  edit(categoria: ICategoria) {
    this.categoria = { ...categoria };
  }

  cancelarEdicion() {
    this.categoria = {
      idCategoria: 0,
      nombreCategoria: ''
    };
  }

  confirmDelete(categoria: ICategoria) {
    this.confirmationService.confirm({
      message: `Eliminar la categoría ${categoria.nombreCategoria}?`,
      header: 'Estás seguro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteCategoria(categoria.idCategoria!)
    });
  }

  deleteCategoria(id: number) {
    this.almacenService.deleteCategoria(id).subscribe({
      next: (data) => {
        this.visibleError = false;
        this.formulario.reset({
          nombreCategoria: ''
        });
        this.getCategorias();
      },
      error: (err) => {
        this.visibleError = true;
        this.mensajeError = 'Se ha producido un error';
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
