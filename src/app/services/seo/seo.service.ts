import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaTags } from '@models/commons.model';
import { School } from '@models/school.model';
import get from 'lodash-es/get';
import keys from 'lodash-es/keys';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private metaService: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) { }

  private setFavicon(iconPath: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="icon"]');

    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon'; // Or 'image/png' if using .png
      this.document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = iconPath;
  }

  public updateTags(school: School, tags?: MetaTags): void {
    this.titleService.setTitle(tags?.title || school.name);
    this.setFavicon(tags?.image || school.squareLogo);

    // meta tags
    this.metaService.updateTag({ name: 'description', content: tags?.description || school.vision });
    this.metaService.updateTag({ name: 'image', content: tags?.image || school.squareLogo });
    this.metaService.updateTag({ name: 'keywords', content: tags?.image || school.squareLogo });

    // twitter meta tags
    this.metaService.updateTag({ name: 'twitter:site', content: school.name });
    this.metaService.updateTag({ name: 'twitter:title', content: tags?.title || school.name });
    this.metaService.updateTag({ name: 'twitter:image', content: tags?.image || school.squareLogo });
    this.metaService.updateTag({ name: 'twitter:description', content: tags?.description || school.vision });

    // Open Graph tags (Facebook, Pinterest & Google+)
    this.metaService.updateTag({ name: 'og:site_name', content: school.name });
    this.metaService.updateTag({ name: 'og:title', content: tags?.title || school.name });
    this.metaService.updateTag({ name: 'og:image', content: tags?.image || school.squareLogo });
    this.metaService.updateTag({ name: 'og:description', content: tags?.description || school.vision });
    this.metaService.updateTag({ name: 'og:url', content: window.location.href });
  }
}
