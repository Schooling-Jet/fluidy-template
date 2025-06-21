import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";
import { SeoService } from '@services/seo/seo.service';
import { School } from '@models/school.model';
import { CommonModule } from '@angular/common';
import { BgImgDirective } from '../../directives/bg-img/bg-img.directive';
import { UtilitiesService } from '@services/utilities/utilities.service';
import { RouterModule } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutComponent, CommonModule, BgImgDirective, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public school!: School;
  public animatedBorderRadius = '';
  public env = environment;
  public bgImg = environment.defaultImage;
  public bannerImg = environment.defaultImage;

  constructor(
    private seo: SeoService,
    private utilities: UtilitiesService,
  ) { }

  ngOnInit(): void {
    this.setAnimatedImgClass();
  }

  public onSchool(s: School): void {
    this.school = s;

    this.seo.updateTags(this.school);
    this.bgImg = s.images[0]?.uri || this.bgImg;
    this.bannerImg = s.images[1]?.uri || this.bannerImg;
  }

  public setAnimatedImgClass(): void {
    const [min, max] = [50, 1000];
    let cls = '';

    for (let a = 0; a < 4; a++) {
      const rnd = Math.floor(Math.random() * max) + min;
      cls += ` ${rnd}px`;
    }

    this.animatedBorderRadius = cls.substring(1);

    this.utilities.delay(3000).then(() => {
      this.setAnimatedImgClass();
    });
  }
}
