import { Component, OnInit } from '@angular/core';
import { Sale, DateSale } from '../../../core/models/sale';
import { User } from '../../../core/models/user';
import { formatoFecha } from '../../../shared/utils/generateDateSale';
import { UserService } from '../../users/services/user.service';
import { SalesService } from '../services/sales.service';
import { FilterField } from '../../../shared/components/filters/filters.component';
@Component({
    selector: 'app-sale-history',
    templateUrl: './sale-history.component.html',
    standalone: false
})
export class SaleHistoryComponent implements OnInit {
  sales: Sale[] = [];
  filterFields: FilterField[] = [];
  private _currentFilters: any = { usuario: '', fecha: '', searchTerm: '', estado: '' };
  get currentFilters(): any { return this._currentFilters; }
  set currentFilters(val: any) { this._currentFilters = val; this.filtrarSales(); }

  constructor(private saleService: SalesService, private userService: UserService) { }

  filteredSales: Sale[] = [];

  // handleFilterChange is now replaced by the setter


  filtrarSales() {
    this.filteredSales = this.sales.filter(sale => {
      const matchUsuario = !this.currentFilters.usuario || sale.DateSale.idUsuUsuario == this.currentFilters.usuario;
      const matchFecha = !this.currentFilters.fecha || formatoFecha(sale.DateSale.dtDate) === this.currentFilters.fecha;
      const matchEstado = !this.currentFilters.estado || sale.DateSale.idVenCatState.toString() == this.currentFilters.estado;
      const matchFolio = !this.currentFilters.searchTerm || sale.DateSale.strFolio.toLowerCase().includes(this.currentFilters.searchTerm.toLowerCase());
      
      return matchUsuario && matchFecha && matchEstado && matchFolio;
    });
  }
  
  estados: { id: string; strName: string; }[] = [];
  mappedUsuarios: { id: string; strName: string }[] = [];

  ngOnInit(): void {
    this.getSales();
    this.saleService.getSaleStates().subscribe({
      next: (data) => {
        this.estados = data;
        this.userService.obtenerDatosUsuario().subscribe({
          next: (users) => {
            this.mappedUsuarios = users.map(u => ({ id: u.email, strName: u.email }));
            this.setupFilterFields();
          }
        });
      }
    });
  }

  setupFilterFields() {
    this.filterFields = [
      {
        key: 'usuario',
        label: 'Cajero',
        type: 'select',
        options: this.mappedUsuarios,
        gridColSpan: 'lg:col-span-3'
      },
      {
        key: 'fecha',
        label: 'Fecha',
        type: 'date',
        gridColSpan: 'lg:col-span-3'
      },
      {
        key: 'estado',
        label: 'Estado de Venta',
        type: 'select',
        options: this.estados,
        gridColSpan: 'lg:col-span-3'
      },
      {
        key: 'searchTerm',
        label: 'Buscar por Folio',
        type: 'text',
        placeholder: 'Ej. VEN-001',
        icon: 'fa-solid fa-magnifying-glass',
        gridColSpan: 'lg:col-span-3'
      }
    ];
  }

  getSales() {
    this.sales = [];
    this.saleService.getSaleData().subscribe({
      next: (data: Sale[]) => {
        this.sales = data;
        this.filtrarSales();
      }
    });
  }
  

  obtenerEstado(estadoId: number | string): String {
    const estado = this.estados.find((estado) => estado.id == estadoId.toString());
    return estado ? estado.strName : '';
  }

}


