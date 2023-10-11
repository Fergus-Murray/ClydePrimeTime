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

  private gridApi: any;
  today: number = Date.now();

  constructor(private http: HttpClient) {
  }

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  title = 'appointment-tracking-app';
  items: MenuItem[] | undefined;
  public rowData: any | null = getData();

  public rowClassRules: RowClassRules = {
    'completed': 'data.time_in != null && data.time_out!=null',
    'warning': 'data.client_flag == "Warn" || data.status=="Warning"',
    'breach': 'data.client_flag == "Breach"',
  };


  ngOnInit() {

    this.setSortedRowData();

    setInterval(() => {
      this.today = Date.now();
    }, 1000);
  }


  columnDefs: ColDef[] = [
    { headerName: 'Therapist name', field: 'therapist_name' },
    { headerName: 'Check-in time', field: 'time_in', editable: true },
    { headerName: 'Check-out time', field: 'time_out', editable: true },
    { headerName: 'Appt time start', field: 'app_time_start', editable: true },
    { headerName: 'Appt time end', field: 'app_time_end', editable: true },
    { headerName: 'Client name', field: 'client_name' },
    { headerName: 'Check-in time', field: 'time_in' },
    { headerName: 'Check-out time', field: 'time_out' },
    { headerName: 'Client Flag', field: 'client_flag' },
    { headerName: 'Therapist phone', field: 'therapist_phone' },
    { headerName: 'Last status', field: 'status' },
    { headerName: 'Status time', field: 'status_time' },
    { headerName: 'Gps', field: 'gps' }
  ];


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }


  onCellClicked(e: CellClickedEvent): void {
    // console.log('cellClicked', e);
  }

  onCellValueChanged(event: any) {
    // console.log(event);
    // console.log(event.data);
    this.rowData[event?.rowIndex] = event.data;
    this.setSortedRowData();
  }

  setSortedRowData() {
    this.rowData?.forEach((x: any) => {
      if (x.time_in != null && x.time_out != null) {
        x.color = 'green';
      }
      else if (x.client_flag == "Warn" || x.status == "Warning") {
        x.color = 'yellow';
      }
      else if (x.client_flag == "Breach") {
        x.color = 'red';
      }
      else {
        x.color = 'grey'
      }
    });

    var sortOrder: any = { red: 0, yellow: 1, green: 2, grey: 3 };
    this.rowData?.sort(function (p1: any, p2: any) {
      return sortOrder[p1.color] - sortOrder[p2.color];
    });


    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
      this.gridApi.refreshCells();
    }
  }


}


