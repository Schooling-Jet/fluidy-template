import { Component } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";
import { School } from '@models/school.model';
import { SeoService } from '@services/seo/seo.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SchoolService } from '@services/school/school.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LayoutComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  public school!: School;
  public form!: FormGroup;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private seo: SeoService,
    private schoolService: SchoolService,
  ) { }

  public onSchool(s: School): void {
    this.school = s;

    this.seo.updateTags(this.school, {
      title: `Contact us | ${s.name}`,
    });

    this.setupForm();
  }

  private setupForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      content: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      phone: [''],
    });
  }

  public submit(): void {
    const c = this.form.value;

    this.loading = true;
    this.schoolService.sendContactMessage(c).then(res => {
      this.loading = false;
      if (res.success) {
        this.setupForm();
        alert('Your message has been submitted successfully. We\'ll get back to you as soon as possible');
      } else {
        alert(res.message || 'Something went wrong');
      }
    })
  }
}