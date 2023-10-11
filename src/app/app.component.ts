import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appointment-tracking-app';
  items: MenuItem[] | undefined;

  ngOnInit() {
          this.items = [
              {
                  label: 'User',
                  icon: 'pi pi-fw pi-file',
              },
          ];
      }


  columnDefs: ColDef[] = [
    { headerName: 'Column 1', field: 'col1' },
    { headerName: 'Column 2', field: 'col2' },
    { headerName: 'Column 3', field: 'col3' },
    { headerName: 'Column 4', field: 'col4' },
    { headerName: 'Column 5', field: 'col5' }
  ];

  rowData = [
    { col1: 'A', col2: 1, col3: true, col4: 'X', col5: new Date() },
    { col1: 'B', col2: 2, col3: false, col4: 'Y', col5: new Date() },
    { col1: 'C', col2: 3, col3: true, col4: 'Z', col5: new Date() },
    // Add more data as needed
  ];
}
