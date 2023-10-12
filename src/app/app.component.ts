import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent, RowClassRules } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { getData } from '../common/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private gridApi: any;
  today: number = Date.now();

  constructor(private http: HttpClient,
    private messageService: MessageService) {
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
    'warning': 'data.client_flag || data.status=="Warning"',
    'breach': 'data.status == "Help"',
    'extended': 'data.status == "Extended"',
  };


  ngOnInit() {

    this.setSortedRowData();

    setInterval(() => {
      this.today = Date.now();
    }, 1000);
  }


  columnDefs: ColDef[] = [
    { headerName: 'Therapist name', field: 'therapist_name',editable:true, width: 160,  },
    { headerName: 'Check-in time', field: 'time_in', editable:true,  width: 150, },
    { headerName: 'Check-out time', field: 'time_out', editable:true, width: 160, },
    { headerName: 'Appt start', field: 'app_time_start',editable: true, width: 130, },
    { headerName: 'Appt end', field: 'app_time_end',editable: true, width: 130, },
    { headerName: 'Client name', field: 'client_name',editable:true, width: 140, },
    { headerName: 'Client marker', field: 'client_flag',editable:true, width: 140, },
    { headerName: 'Last status', field: 'status',editable:true, width: 130, },
    { headerName: 'Status time', field: 'status_time',editable:true, width: 150,
                     valueFormatter: function (params) {
                      return params.value;
                     },
                 }, //TODO format this
    { headerName: 'Actions', field: 'therapist_phone',
      cellRenderer: () => {
                          return '<button severity=\x22success\x22><i class=\x22pi pi-phone\x22></i></button><button class=\x22mapbutton\x22severity=\x22success\x22><i class=\x22pi pi-map\x22></i></button>';
                          // return '<i class="fa-solid fa-phone"></i>';
                      }},
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
      if (x.status == "Extended"){
        x.color = 'blue';
      }
      else if (x.time_in != null && x.time_out != null) {
        x.color = 'green';
      }
      else if (x.client_flag || x.status == "Warning") {
        x.color = 'yellow';
      }
      else if (x.status == "Help") {
        x.color = 'red';
      }
      else {
        x.color = 'grey'
      }
    });

    var sortOrder: any = { red: 0, yellow: 1, green: 2, blue: 3, grey: 4 };
    this.rowData?.sort(function (p1: any, p2: any) {
      return sortOrder[p1.color] - sortOrder[p2.color];
    });


    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
      this.gridApi.refreshCells();
    }
  }

  addNewRow() {
    const newRow = { app_id: this.rowData.length + 1, time_in:null, time_out:null };
    this.rowData = [...this.rowData, newRow];
    this.gridApi.setRowData(this.rowData);
  }

}


