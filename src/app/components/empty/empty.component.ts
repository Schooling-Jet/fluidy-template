import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class EmptyComponent implements OnInit {
  @Input() message!: string;
  @Input() actionBtn!: string;
  @Input() icon: string = 'cup-outline';
  @Input() classlist?: string;

  @Output() onAction = new EventEmitter<void>();

  constructor() { }

  public ngOnInit(): void { }
}
