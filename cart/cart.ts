import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {LoginPage} from '../login/login'
import {OrderConfirmPage} from '../order-confirm/order-confirm'

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartList:Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private myService:MyHttpService) {
  }

  ionViewWillEnter(){
    console.log('页面进来了'); 
       //检查用户是否登录
    this.myService.sendRequest('http://localhost/ajia_code/data/user/session_data.php').subscribe((result)=>{
      console.log(result);
      if(result.uid){//已登录
        //请求cart/list.php 将数据保存 将数据显示在视图中
        this.loadCartList();
      }
      else{//未登录
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
 
  }

  //加载购物车列表
  loadCartList(){
    this.myService
    .sendRequest('http://localhost/ajia_code/data/cart/list.php')
    .subscribe((result)=>{
      console.log(result);
      this.cartList = result.data;
    })
  }

  //跳转到订单确认页面
  jumpToOrderConfirm(){
    this.navCtrl.push(OrderConfirmPage,{list:this.cartList});
  }

}
