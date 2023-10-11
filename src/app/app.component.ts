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

  today: number = Date.now();

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
  'completed': 'data.time_in != null && data.time_out!=null',
  'warning': 'data.client_flag == "Warn" || data.status=="Warning"',
  'breach': 'data.client_flag == "Breach"',
};


  ngOnInit() {

    setInterval(()=>{
      this.today =Date.now();
    },1000);
  }


  columnDefs: ColDef[] = [
    { headerName: 'Therapist name', field: 'therapist_name' },
    { headerName: 'Check-in time', field: 'time_in', editable:true },
    { headerName: 'Check-out time', field: 'time_out', editable:true },
    { headerName: 'Appt time start', field: 'app_time_start',editable: true },
    { headerName: 'Appt time end', field: 'app_time_end',editable: true },
    { headerName: 'Client name', field: 'client_name' },
    { headerName: 'Client marker', field: 'client_flag' },
    { headerName: 'Last status', field: 'status' },
    { headerName: 'Status time', field: 'status_time' },
    { headerName: 'Phone', field: 'therapist_phone' }, //TODO button that just says Phone
  ];

  public rowData$!: Observable<any[]>;

  onGridReady(params: GridReadyEvent) {
  }

  onCellClicked( e: CellClickedEvent): void {
    // console.log('cellClicked', e);
  }

  onCellValueChanged(event: any){
    console.log(event.data);
  }
}
