import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'hb-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input()
  categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const capacity = form.value.capacity < 0 ? form.value.capacity * -1 : form.value.capacity;
    const category = new Category(name, capacity, +this.currentCategoryId);
    this.categoriesService.updateCategory(category).subscribe((cat: Category) => {
      this.onCategoryEdit.emit(category);
      this.message.text = 'Category was successfully changed';
      window.setTimeout(() => {
        this.message.text = '';
      }, 5000);
    });
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);
  }

}
