import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";
import { School } from '@models/school.model';
import { SeoService } from '@services/seo/seo.service';
import { CommonModule } from '@angular/common';
import { Album, PaginatedQueryOptions } from '@models/commons.model';
import { SchoolService } from '@services/school/school.service';
import { takeUntil } from 'rxjs';
import { NgSub } from 'ng-sub';
import { EmptyComponent } from "../empty/empty.component";
import { ProgressComponent } from "../progress/progress.component";
import { AlbumPageComponent } from "../album-page/album-page.component";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [LayoutComponent, CommonModule, EmptyComponent, ProgressComponent, AlbumPageComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit, OnDestroy {
  public school!: School;
  public albums: Album[] = [];
  public loading = true;
  public selectedAlbum?: Album;

  private sub = new NgSub();

  constructor(
    private seo: SeoService,
    private schoolService: SchoolService,
  ) { }

  ngOnInit(): void { }

  public onSchool(s: School): void {
    this.school = s;

    this.seo.updateTags(this.school, {
      title: `Gallery | ${s.name}`,
      description: 'Browse through our list of albums, photo shoots, event activities etc',
    });

    // get albums
    const opts: PaginatedQueryOptions = {
      itemsPerPage: 50,
      page: 1,
    }

    this.schoolService.getPhotoAlbums(opts).pipe(takeUntil(this.sub)).subscribe(res => {
      this.albums = res.data?.result || [];
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}