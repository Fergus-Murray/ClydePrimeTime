import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent, RowClassRules } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { getData } from '../common/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  title = 'appointment-tracking-app';
  items: MenuItem[] | undefined;
  public rowData: any[] | null = getData();

public rowClassRules: RowClassRules = {
  'completed': 'data.client_flag == "Completed"',
  'warning': 'data.client_flag == "Warn"',
  'breach': 'data.client_flag == "Breach"',
};


  ngOnInit() {
          this.items = [
              {
                  label: 'User',
                  icon: 'pi pi-fw pi-file',
              },
          ];
      }


  columnDefs: ColDef[] = [
    { headerName: 'TherapistName', field: 'therapist_name' },
    { headerName: 'Checkin Time', field: 'time_in' },
    { headerName: 'Checkout Time', field: 'time_out' },
    { headerName: 'Appointment Time Start', field: 'app_time_start' },
    { headerName: 'Appointment Time End', field: 'app_time_end' },
    { headerName: 'ClientName', field: 'client_name' },
    { headerName: 'Checkin Time', field: 'time_in' },
    { headerName: 'Checkout Time', field: 'time_out' },
    { headerName: 'Client Name', field: 'client_name' },
    { headerName: 'Therapist Phone', field: 'therapist_phone' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Status Time', field: 'status_time' },
    { headerName: 'Gps', field: 'gps' }
  ];

  public rowData$!: Observable<any[]>;

  onGridReady(params: GridReadyEvent) {
    
  }


  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }
}
