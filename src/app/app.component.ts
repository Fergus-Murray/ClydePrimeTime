import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

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

  ngOnInit() {}


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

  // rowData = [
  //   { therapist_name: 'A', time_in: 1, time_out: true, app_time_start: 'X', app_time_end: new Date(),client_name:'abc' }
  //   // Add more data as needed
  // ];

  // rowData: any[] = [
  // ];

  public rowData$!: Observable<any[]>;

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
    .get<any[]>('http://localhost:3000/appointmentdata');
  }


  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }
}
