import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {DetailPage} from '../detail/detail'
/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  carouselItems:Array<any> = [];
  newArrivalItems:Array<any>=[];
  recommendedItems:Array<any> = [];
  detail:any=null;

  constructor(public navCtrl: NavController, public navParams: NavParams,private myService:MyHttpService) {
    this.detail = DetailPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    //发请求
    this.myService.sendRequest('http://localhost/ajia_code/data/product/index.php').subscribe((result)=>{
      console.log(result);
      this.carouselItems = result.carouselItems;

      this.newArrivalItems = result.newArrivalItems;

      this.recommendedItems = result.recommendedItems;
    })
  }

}
