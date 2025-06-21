import { Component } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";
import { School } from '@models/school.model';
import { SeoService } from '@services/seo/seo.service';
import { CommonModule } from '@angular/common';
import { environment } from '@env/environment';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LayoutComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  public school!: School;
  public aboutImg = environment.defaultImage;

  constructor(
    private seo: SeoService,
  ) { }

  public onSchool(s: School): void {
    this.school = s;
    this.aboutImg = s.images[2]?.uri || this.aboutImg;

    this.seo.updateTags(this.school, {
      title: `About us | ${s.name}`,
      description: s.about,
    });
  }
}