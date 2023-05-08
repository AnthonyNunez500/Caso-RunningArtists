import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Data, RouterLink } from '@angular/router';
import * as _ from 'lodash';
import { Offer } from 'src/app/models/offer.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  titleFormControl = new FormControl('', [Validators.required]);
  pointsFormControl = new FormControl('', [Validators.required, Validators.max(100), Validators.min(1)]);
  
  offersForm !: NgForm;
  offersData !: Offer;
  @ViewChild('offersForm', {static: false})
  dataSource = new MatTableDataSource();
  constructor(private DataService: DataService){
    this.offersData = {} as Offer;
  }
  displayedColumns : string[]= ['id', 'title', 'description', 'points', 'businessId'];

  ngOnInit(): void {
    this.getAllOffers();
  }
  
  OnSumit(){
    /*if(this.offersForm.form.valid){
        console.log('Create');
        this.addOffer();
    }
    else{
      console.log('Invalid data')
    }*/
    this.addOffer();
    this.getAllOffers();
    this.offersForm.resetForm();
  }
  getAllOffers(){
    this.DataService.getList().subscribe((response:any)=>{
      this.dataSource.data = response;
    });
  }
  addOffer(){
    this.DataService.createItem(this.offersData).subscribe((response:any)=>{
      this.dataSource.data.push({...response});
      this.dataSource.data=this.dataSource.data.map((o:any)=>{
        return 0;
      });
    });
  }
}
