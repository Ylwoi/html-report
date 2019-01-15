import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import * as JsonToTable from 'json-to-table';
//import Chart from 'chart.js';


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
  table1: AOA;
  table2: AOA;
	wopts: XLSX.WritingOptions;
	public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType:string = 'line';
  public barChartLegend:boolean = true;
	public barChartData: any[] = [
		{data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Sold units'}
	];

  constructor() {
    //this.data = [ [1, 2], [3, 4] ];
    this.wopts = { bookType: 'xlsx', type: 'array' };
  }

  ngOnInit() {}

  ngOnChanges() {
    this.showTable();
  }

  predicateBy(prop: string){
   return (a,b) =>{
      if( a[prop] > b[prop]){
          return -1;
      }else if( a[prop] < b[prop] ){
          return 1;
      }
      return 0;
   }
	}

	excelDateToJSDate(date) {
  	return new Date(Math.round((date - 25569)*86400*1000));
	}

  showTable() {
    if (this.workbook) {
      const ws_salesperson: XLSX.WorkSheet = this.workbook.Sheets["Salesperson"];
      const ws_orders: XLSX.WorkSheet = this.workbook.Sheets["Orders"];
			const ws_products: XLSX.WorkSheet = this.workbook.Sheets["Products"];

      const json_salesperson = XLSX.utils.sheet_to_json(ws_salesperson);
      const json_orders = XLSX.utils.sheet_to_json(ws_orders);
			const json_products = XLSX.utils.sheet_to_json(ws_products);

      var salesPerson: SalespersonsAllType;
    	var allSalesperson = new Array();

      json_orders.forEach((order)=> {
  			if (order['Order status'] == 'Saved_vod' || order['Order status'] == 'Submitted_vod') {
					salesPerson = {
						id: order['Salesperson ID'],
						name: '',
						total_pieces: order['Number of product sold'],
						total_revenue: 0
					}
					for (let person of json_salesperson) {
						if (person['Id'] == salesPerson.id) {
							salesPerson.name = person['Name'];
						}
					}
					if ( allSalesperson.length == 0 ) {
						for (let product of json_products) {
							if (product['Product Id'] == order['Product Id']) {
								salesPerson.total_revenue = product['Unit price'] * salesPerson.total_pieces;
								break;
							}
						}
						allSalesperson.push(salesPerson);
					} else {
						for (let i: number = 0; i < allSalesperson.length; i++) {
							if (allSalesperson[i].id == order['Salesperson ID']) {
								allSalesperson[i].total_pieces += order['Number of product sold'];
								for (let product of json_products) {
									if (product['Product Id'] == order['Product Id']) {
										allSalesperson[i].total_revenue += product['Unit price'] * order['Number of product sold'];
										break;
									}
								}
								break;
							} else {
								if (i == allSalesperson.length - 1) {
									allSalesperson.push(salesPerson);
								}
							}
						}
					}

					// for (let salesP of allSalesperson) {
					// 	if (salesP.id == order['Salesperson ID']) {
					// 		salesP.total_pieces += order['Number of product sold'];
					// 	}
					// }

  				//allSalesperson.push({id: order['Salesperson ID'],name: order['Account'], total_pieces: order['Number of product sold'], total_revenue: 0});
  			}
				let order_month = this.excelDateToJSDate(order['Order date']).getMonth();
				this.barChartData[0].data[order_month] += order['Number of product sold'];
				console.log(order_month);
  		})
      allSalesperson.sort(this.predicateBy('total_pieces'));
      this.table1 = <AOA>(JsonToTable(allSalesperson.slice(0,3)));

      allSalesperson.sort(this.predicateBy('total_revenue'));
      this.table2 = <AOA>(JsonToTable(allSalesperson.slice(0,3)));

    }
  }

}
