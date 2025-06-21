import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { School } from '@models/school.model';
import { ApiService } from '@services/api/api.service';
import { getYear } from 'date-fns';
import { NameDirective } from '../../directives/name/name.directive';
import { UtilitiesService } from '@services/utilities/utilities.service';
import { FormsModule } from '@angular/forms';
import { SchoolService } from '@services/school/school.service';

@Component({
  selector: 'app-layout-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, NameDirective, FormsModule],
  templateUrl: './layout-footer.component.html',
  styleUrl: './layout-footer.component.scss'
})
export class LayoutFooterComponent implements OnInit {
  @Input() school!: School;

  public env = environment;
  public year: number = 2025;
  public email = '';
  public subscribing = false;

  constructor(
    private api: ApiService,
    private utilities: UtilitiesService,
    private schoolService: SchoolService,
  ) { }

  ngOnInit(): void {
    this.year = getYear(this.api.serverTime);
  }

  public subscribe(): void {
    if (this.utilities.isValidEmail(this.email)) {
      this.subscribing = true;
      this.schoolService.subscribeNewsletter(this.email).then(res => {
        this.subscribing = false;

        if (res.success) {
          this.email = '';
          alert('You have been subscribe successfully');
        } else {
          alert(res.message || 'Something went wrong');
        }
      })
    }
  }
}
