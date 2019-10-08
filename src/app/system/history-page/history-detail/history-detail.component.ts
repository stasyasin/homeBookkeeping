import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {Subscription} from 'rxjs';
import {HBEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'hb-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  id: string;
  isLoaded: false;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  event: HBEvent;
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    // todo replace with .pipe() later
    this.sub1 = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.sub2 = this.eventsService.getEventById(this.id).subscribe((event: HBEvent) => {
        this.event = event;
      });
      this.sub3 = this.categoriesService.getCategoryById(this.id).subscribe((category: Category) => {
        this.category = category;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }
}
