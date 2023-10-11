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


  ngOnInit() {}


  columnDefs: ColDef[] = [
    { headerName: 'Therapist name', field: 'therapist_name' },
    { headerName: 'Check-in time', field: 'time_in' },
    { headerName: 'Check-out time', field: 'time_out' },
    { headerName: 'Appt time start', field: 'app_time_start' },
    { headerName: 'Appt time end', field: 'app_time_end' },
    { headerName: 'Client name', field: 'client_name' },
    { headerName: 'Check-in time', field: 'time_in' },
    { headerName: 'Check-out time', field: 'time_out' },
    { headerName: 'Client name', field: 'client_name' },
    { headerName: 'Therapist phone', field: 'therapist_phone' },
    { headerName: 'Last status', field: 'status' },
    { headerName: 'Status time', field: 'status_time' },
    { headerName: 'Gps', field: 'gps' }
  ];

  public rowData$!: Observable<any[]>;

  onGridReady(params: GridReadyEvent) {

  }


  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }
}
