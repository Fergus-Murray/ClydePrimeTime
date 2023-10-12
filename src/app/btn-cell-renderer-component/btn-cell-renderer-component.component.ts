import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-btn-cell-renderer-component',
  templateUrl: './btn-cell-renderer-component.component.html',
  styleUrls: ['./btn-cell-renderer-component.component.css']
})
export class BtnCellRendererComponentComponent implements ICellRendererAngularComp {

  params!: ICellRendererParams;

    agInit(params: ICellRendererParams) {
        this.params = params;
    }

    refresh(params: ICellRendererParams) {
        this.params = params;
        // As we have updated the params we return true to let AG Grid know we have handled the refresh.
        // So AG Grid will not recreate the cell renderer from scratch.
        return true;
    }

  redirectToGmaps(){

    let x: any=parseInt(String(Math.random()*10))%3;
    
    if(x==0)
    {
    window.open("http://maps.google.co.uk/maps?q=51.917168,-0.227051");
    }
    else if(x==1)
    {
      window.open("http://maps.google.com?q=55.8640818,-4.285094");
    
    }
    else
    {
      window.open("http://maps.google.com?q=51.4903946,-0.4744999");
    }
     
  }
}
