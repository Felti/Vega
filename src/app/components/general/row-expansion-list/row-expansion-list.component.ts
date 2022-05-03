import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Services
import { ResolutionService } from 'src/app/services/resolution.service';
// Models
import { SimpleListColumn } from 'src/app/models/simple-list-column';
import { SimpleListActionsConfig } from 'src/app/models/simple-list-actions-config';

@Component({
  selector: 'app-row-expansion-list',
  templateUrl: './row-expansion-list.component.html',
  styleUrls: ['../simple-list/simple-list.component.scss'],
})
export class RowExpansionListComponent implements OnInit {
  // Data
  localColumns: SimpleListColumn[] = [];

  // Responsiveness
  isMobile: boolean = false;

  // Inputs
  @Input() subListKey: string | null = null;
  @Input() list: any[] = [];
  @Input() columns: SimpleListColumn[] = [];
  @Input() expandedColumns: SimpleListColumn[] = [];
  @Input() globalFilterFields: string[] = [];
  @Input() config: SimpleListActionsConfig = new SimpleListActionsConfig();
  @Input() expandedConfig: SimpleListActionsConfig =
    new SimpleListActionsConfig();
  @Input() expandedGlobalFilterFields: string[] = [];

  // Outputs
  @Output() modify: EventEmitter<any> = new EventEmitter();
  @Output() softDelete: EventEmitter<any> = new EventEmitter();
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();

  // Specific to Keys/Tags feature
  @Output() hardDelete: EventEmitter<any> = new EventEmitter();
  @Output() undelete: EventEmitter<any> = new EventEmitter();

  //ExpandedActions
  @Output() expandedModify: EventEmitter<any> = new EventEmitter();
  @Output() expandedSoftDelete: EventEmitter<any> = new EventEmitter();
  @Output() expandedHardDelete: EventEmitter<any> = new EventEmitter();
  @Output() expandedUndelete: EventEmitter<any> = new EventEmitter();

  constructor(private resolutionService: ResolutionService) {}

  ngOnInit(): void {
    this.localColumns = [...this.columns];
    this.resolutionService.isMobileResolution.subscribe(
      (res) => (this.isMobile = res)
    );
  }

  handleFilter(event: any, dt: any) {
    if (
      event &&
      event.filteredValue &&
      (event.filteredValue as any[]).length > 0 &&
      event?.filters?.global?.value
    ) {
      for (const value of event.filteredValue) {
        dt.expandedRowKeys = {
          ...dt.expandedRowKeys,
          [value.id]: true,
        };
      }
    } else dt.expandedRowKeys = {};

    const userInput: string = event?.filters?.global?.value;

    setTimeout(() => {
      let values = document.querySelectorAll('.row-value');

      if (userInput) {
        values.forEach((value) => {
          (value as HTMLElement).style.backgroundColor = 'white';
          let innerHTML = value.innerHTML;

          let index = innerHTML.toLowerCase().indexOf(userInput.toLowerCase());
          if (index > -1) {
            (value as HTMLElement).style.color = '#000';
            (value as HTMLElement).style.backgroundColor = 'yellow';

            (value as HTMLElement).style.padding = '0px 5px';
            (value as HTMLElement).style.borderRadius = '3px';
          }
        });
      } else {
        values.forEach((value) => {
          (value as HTMLElement).style.color = '#323130';
          (value as HTMLElement).style.backgroundColor = 'unset';

          (value as HTMLElement).style.padding = '0';
          (value as HTMLElement).style.borderRadius = '0';
        });
      }
    }, 100);
  }
}
