import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Offer } from 'src/app/models/offer.model';
import { DataService } from 'src/app/services/data.service';
import { Data } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  dataSource = new MatTableDataSource();

  offersData !: Offer;

  displayedColumns : string[]= ['id', 'title', 'description', 'points', 'businessId'];
  constructor(private DataService: DataService){
    this.offersData = {} as Offer;
  }

  ngOnInit(): void {
    this.getAllOffers();
  }
  
  getAllOffers(){
    this.DataService.getList().subscribe((response:any)=>{
      this.dataSource.data = response;
    });
  }
}
