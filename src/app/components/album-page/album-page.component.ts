import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgSub } from 'ng-sub';
import { takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from '@components/progress/progress.component';
import { SchoolService } from '@services/school/school.service';
import { expandAnimation } from '../../animations/expand.animation';
import { Album } from '@models/commons.model';

@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [ProgressComponent, CommonModule],
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.scss',
  animations: [expandAnimation],
})
export class AlbumPageComponent implements OnInit, OnDestroy {
  @Input() album!: Album;

  @Output() onDone = new EventEmitter<void>();

  public currentIndex = 0;

  private sub = new NgSub();

  constructor() { }

  ngOnInit(): void { }

  public swipeImg(incr?: 1 | -1, index?: number): void {
    if (incr) {
      this.currentIndex += incr;
    } else if (index! >= 0) {
      this.currentIndex = index!;
    }

    if (this.currentIndex >= this.album!.Photos!.length) {
      this.currentIndex = 0;
    } else if (this.currentIndex < 0) {
      this.currentIndex = this.album!.Photos!.length - 1;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
