import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fadeInAnimation } from '../../animations/fadein.animation';
import { NgSub } from 'ng-sub';
import { takeUntil } from 'rxjs';
import { SchoolService } from '@services/school/school.service';
import { LayoutService } from '@services/layout/layout.service';
import { ProgressComponent } from "../progress/progress.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { School } from '@models/school.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProgressComponent, NotFoundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeInAnimation],
})
export class AppComponent implements OnInit, OnDestroy {
  public pageStatus?: string;
  public school?: School;

  private sub = new NgSub();

  constructor(
    private router: Router,
    private schoolService: SchoolService,
    private layout: LayoutService,
  ) { }

  public ngOnInit(): void {
    this.layout.init();

    this.schoolService.getCurrentSchool().pipe(takeUntil(this.sub)).subscribe((res) => {
      // handle initialization logic here
      if (res.success && res.data) {
        this.pageStatus = 'ready';

        // update theme colors for school
        const school = res.data;
        this.school = school;
        const obj = {
          primary: school.primaryColor,
          secondary: school.secondaryColor,
        }
        this.layout.changeThemeColors(obj);
      } else {
        this.pageStatus = '404';
      }

      this.handleSplashScreen(true);
    });

    this.router.events.pipe(takeUntil(this.sub)).subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        document.body.scrollTo(0, 0);
        window.scrollTo(0, 0);
      }
    });
  }

  private handleSplashScreen(ready: boolean): void {
    const app = document.getElementById('appScreen');
    const splash = document.getElementById('splashScreen');
    const classname = 'hidden-screen';

    if (ready) {
      app?.classList.remove(classname);
      splash?.classList.add(classname);
    } else {
      app?.classList.add(classname);
      splash?.classList.remove(classname);
    }
  }

  public ngOnDestroy(): void {
    this.sub.next();
    this.sub.unsubscribe();
  }
}

