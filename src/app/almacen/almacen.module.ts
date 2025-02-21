import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenComponent } from './almacen.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { AlmacenService } from './almacen.service';
import { AlmacenRoutingModule } from './almacen-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    AlmacenComponent,
    CategoriasComponent,
    ProductosComponent
  ],
  imports: [
    CommonModule, AlmacenRoutingModule, SharedModule, FormsModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule
  ],
  providers: [AlmacenService]
})
export class AlmacenModule { }
