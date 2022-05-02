import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styles: [
    `
      .wrapper h1,
      h4 {
        margin: 5px 0;
      }
      .wrapper {
        margin: 1rem 0;
        user-select: none;
      }
      h1 {
        font-size: 1.5rem;
      }
    `,
  ],
})
export class PageHeaderComponent {
  @Input() title: string | null = null;
  @Input() subTitle: string | null = null;
}
