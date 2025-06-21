import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Map } from '@models/commons.model';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class ProgressComponent implements OnInit {
  @Input() size = '60px';
  @Input() color!: string;
  @Input() message?: string;

  constructor() { }

  public ngOnInit(): void { }

  public getStyle(): Map<any> {
    const isDark = false;
    const color = this.color || (isDark ? '#ffffff' : '#29abe0');

    return {
      width: this.size,
      height: this.size,
      fill: color,
    };
  }
}
