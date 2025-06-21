import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";
import { School } from '@models/school.model';
import { SeoService } from '@services/seo/seo.service';
import { CommonModule } from '@angular/common';
import { FAQ, Map, PaginatedQueryOptions } from '@models/commons.model';
import { SchoolService } from '@services/school/school.service';
import { NgSub } from 'ng-sub';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { EmptyComponent } from "../empty/empty.component";
import { fadeInAnimation } from '../../animations/fadein.animation';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [LayoutComponent, CommonModule, FormsModule, EmptyComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  animations: [fadeInAnimation],
})
export class FaqComponent implements OnInit, OnDestroy {
  public school!: School;
  public faqs: FAQ[] = [];
  public loading = true;
  public expanded: Map<boolean> = {};
  public searchText = '';
  public search$ = new Subject<string>();

  private sub = new NgSub();

  constructor(
    private seo: SeoService,
    private schoolService: SchoolService,
  ) { }

  ngOnInit(): void {
    this.fetchFAQs();

    this.search$.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      takeUntil(this.sub),
    ).subscribe(_ => {
      this.faqs = [];
      this.expanded = {};

      this.fetchFAQs();
    });
  }

  public onSchool(s: School): void {
    this.school = s;

    this.seo.updateTags(this.school, {
      title: `FAQ | ${s.name}`,
      description: `Find answers to our most commonly asked questions that we have organized in our knowledgebase`,
    });
  }

  public fetchFAQs(): void {
    const opts: PaginatedQueryOptions = {
      itemsPerPage: 50,
      page: 1,
      search: this.searchText,
    }

    this.schoolService.getFAQs(opts).pipe(takeUntil(this.sub)).subscribe(res => {
      this.faqs = res.data?.result || [];
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}