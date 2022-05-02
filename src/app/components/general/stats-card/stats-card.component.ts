import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
})
export class StatsCardComponent implements OnInit {
  @Input() isRevenu: boolean = false;
  @Input() isCost: boolean = false;

  @Input() title: string = 'N/A';
  constructor() {}

  ngOnInit(): void {
    if (this.isRevenu) {
      // get revenu code
    } else {
      // get cost code
    }
  }
}
