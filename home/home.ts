import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IndexPage} from '../index/index'
import {CartPage} from '../cart/cart'
import {UserCenterPage} from '../user-center/user-center'

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  tabIndex:any=null;
  tabCart:any=null;
  tabPerson:any=null;
  tabSettings:any=null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabIndex = IndexPage;
    this.tabCart = CartPage;
    this.tabPerson = UserCenterPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
