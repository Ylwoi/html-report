import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import * as JsonToTable from 'json-to-table';


type AOA = any[][];
type SalespersonsAllType = {
	id: string;
	name: string;
	total_pieces: number;
	total_revenue?: number;
}

@Component({
  selector: 'top-sellers',
  templateUrl: './top-sellers.component.html',
  styleUrls: ['./top-sellers.component.css']
})
export class TopSellersComponent implements OnInit, OnChanges {
  @Input() workbook: XLSX.WorkBook;
  data: AOA;
	wopts: XLSX.WritingOptions;
	//fileName: string = 'SheetJS.xlsx';

  constructor() {
    //this.data = [ [1, 2], [3, 4] ];
    this.wopts = { bookType: 'xlsx', type: 'array' };
  }

  ngOnInit() {}

  ngOnChanges() {
    this.showTable();
  }

  showTable() {
    if (this.workbook) {
      const ws_salesperson: XLSX.WorkSheet = this.workbook.Sheets["Salesperson"];
      const ws_orders: XLSX.WorkSheet = this.workbook.Sheets["Orders"];

      const json_salesperson = XLSX.utils.sheet_to_json(ws_salesperson);
      const json_orders = XLSX.utils.sheet_to_json(ws_orders);

      var salesPerson: SalespersonsAllType;
    	var allSalesperson = new Array();

      json_orders.forEach((order)=> {
  			if (order['Order status'] == 'Saved_vod' && order['Account type'] == 'Doctor') {
  				// allSalesperson --- itt voltam
  				salesPerson = {
  					id: order['Salesperson ID'],
  					name: order['Account'],
  					total_pieces: order['Number of product sold'],
  					total_revenue: 0
  				}

  				//console.log(salesPerson);
  				allSalesperson.push(salesPerson);

  				//allSalesperson.push({id: order['Salesperson ID'],name: order['Account'], total_pieces: order['Number of product sold'], total_revenue: 0});
  			}
  		})
      this.data = <AOA>(JsonToTable(allSalesperson));
    }
  }

}
