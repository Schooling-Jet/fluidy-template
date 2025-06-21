import { Routes } from '@angular/router';
import { GalleryComponent } from '@components/gallery/gallery.component';
import { HomeComponent } from '@components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component').then(c => c.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact.component').then(c => c.ContactComponent),
  },
  {
    path: 'faq',
    loadComponent: () => import('./components/faq/faq.component').then(c => c.FaqComponent),
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
];
