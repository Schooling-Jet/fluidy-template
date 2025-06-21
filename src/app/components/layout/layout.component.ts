import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { School } from '@models/school.model';
import { SchoolService } from '@services/school/school.service';
import { NgSub } from 'ng-sub';
import { takeUntil } from 'rxjs';
import { LayoutHeaderComponent } from "../layout-header/layout-header.component";
import { LayoutFooterComponent } from "../layout-footer/layout-footer.component";
import { fadeInAnimation } from '../../animations/fadein.animation';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, LayoutHeaderComponent, LayoutFooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [fadeInAnimation],
})
export class LayoutComponent implements OnInit, OnDestroy {
  @Output() onSchool = new EventEmitter<School>();

  public school!: School;

  private sub = new NgSub();

  constructor(
    private schoolService: SchoolService,
  ) { }

  ngOnInit(): void {
    this.schoolService.getCurrentSchool().pipe(takeUntil(this.sub)).subscribe(res => {
      this.school = res.data!;

      this.onSchool.emit(this.school);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
