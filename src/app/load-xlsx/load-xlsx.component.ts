import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'load-xlsx',
  templateUrl: './load-xlsx.component.html',
  styleUrls: ['./load-xlsx.component.css']
})
export class LoadXLSXComponent implements OnInit {
  bstr: string;
  wb: XLSX.WorkBook;
  @Output() redirect: EventEmitter<XLSX.WorkBook> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			this.bstr = e.target.result;
			this.wb = XLSX.read(this.bstr, {type: 'binary'});
      this.redirect.emit(this.wb);
    }
    reader.readAsBinaryString(target.files[0]);
  }


}
