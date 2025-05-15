import { Component } from '@angular/core';
import { Categoria, CategoriesService, Subcategoria } from '../../../../core/services/products/catalog/categories.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css'],
  standalone: false,
})
export class AddCategoriesComponent {

  newCategory: Categoria = {
    strName: '',
    strDescription: '',
  };

  newSubcategory: Subcategoria = {
    strName: '',
    strDescription: '',
    idCatCategoria: "",
  };

  constructor(private categoriesService: CategoriesService) {}

  onCategoriaSeleccionada(categoria: any) {
    const categoriaSeleccionadaId = categoria !== null ? categoria : 0;
    this.newSubcategory.idCatCategoria = categoriaSeleccionadaId.toString();
  }

  submitForm() {
    if (!this.newCategory.strName.trim()) {
      console.error('Nombre de categoría es requerido');
      return;
    }

    this.categoriesService.crearCategoria(this.newCategory).subscribe({
      next: (res) => {
        console.log('Categoría creada:', res);
        this.newCategory = { strName: '', strDescription: '' }; // reset form
      },
      error: (err) => console.error('Error al crear categoría:', err)
    });
  }

  submitSubForm() {
    console.log('Subcategoría:', this.newSubcategory);
    if (!this.newSubcategory.strName.trim() || !this.newSubcategory.idCatCategoria) {
      console.error('Subcategoría o categoría asociada inválida');
      return;
    }

    this.categoriesService.crearSubcategoria(this.newSubcategory).subscribe({
      next: (res) => {
        console.log('Subcategoría creada:', res);
        this.newSubcategory = { strName: '', strDescription: '', idCatCategoria: "" }; // reset form
        this.onCategoriaSeleccionada(0);
      },
      error: (err) => console.error('Error al crear subcategoría:', err)
    });
  }
}
