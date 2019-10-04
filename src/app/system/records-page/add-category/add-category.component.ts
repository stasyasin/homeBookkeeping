import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  @Output() onCategoryAdd = new EventEmitter<Category>();
  sub1: Subscription;
  constructor(private categoriesService: CategoriesService) {}

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const capacity = form.value.capacity < 0 ? form.value.capacity * -1 : form.value.capacity;
    const category = new Category(name, capacity);
    this.sub1 = this.categoriesService.addCategory(category).subscribe((cat: Category) => {
      form.reset();
      form.form.patchValue({ capacity: 1 });
      this.onCategoryAdd.emit(category);
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
