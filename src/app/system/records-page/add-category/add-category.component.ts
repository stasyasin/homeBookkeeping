import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'hb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  @Output() onCategoryAdd = new EventEmitter<Category>();
  constructor(private categoriesService: CategoriesService) {}

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const capacity = form.value.capacity < 0 ? form.value.capacity * -1 : form.value.capacity;
    const category = new Category(name, capacity);
    this.categoriesService.addCategory(category).subscribe((cat: Category) => {
      form.reset();
      form.form.patchValue({ capacity: 1 });
      this.onCategoryAdd.emit(category);
    });
  }
}
