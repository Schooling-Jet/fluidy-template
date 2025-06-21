import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { School } from '@models/school.model';
import { expandAnimation } from '../../animations/expand.animation';
import { DropdownDirective } from '../../directives/dropdown/dropdown.directive';
import { RouterModule } from '@angular/router';
import { localStorageProps, LocalstorageService } from '@services/storage/storage.service';
import { environment } from '@env/environment';
import { LayoutService } from '@services/layout/layout.service';
import { NgSub } from 'ng-sub';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [CommonModule, DropdownDirective, RouterModule],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
  animations: [expandAnimation],
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {
  @Input() school!: School;

  public mobileNav = false;
  public isDarkTheme = false;
  public env = environment;
  public fixHeader = false;

  private sub = new NgSub();

  constructor(
    private store: LocalstorageService,
    private layout: LayoutService,
  ) { }

  ngOnInit(): void {
    this.isDarkTheme = this.store.getItem(localStorageProps.COLOR_THEME) === 'dark';

    if (this.isDarkTheme) {
      this.isDarkTheme = false;
      this.switchColorTheme();
    }

    this.layout.window$.asObservable().pipe(takeUntil(this.sub)).subscribe(() => {
      const y = document.body.scrollTop;
      this.fixHeader = y > 65;
    });
  }

  public switchColorTheme(): void {
    const dark = !this.isDarkTheme;
    this.isDarkTheme = dark;

    this.store.setItem(localStorageProps.COLOR_THEME, dark ? 'dark' : 'light');
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
