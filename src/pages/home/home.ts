import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ContentstackService} from '../../app/contentstack';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages:any;
  constructor(public zone: NgZone,public navCtrl: NavController,private ContentstackService:ContentstackService) {
  	var Query = ContentstackService.Stack.ContentType("news").Query();
                Query
               .toJSON()
               .find()
               .spread((entries, schema, count) => {
               		this.zone.run(() =>{
               			this.pages = entries;
	                 });
               },(err) => {
               		console.log("err",err);
               });
               
  }

}
