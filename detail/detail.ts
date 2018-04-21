import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {NotFoundPage} from '../not-found/not-found'
import {LoginPage} from '../login/login'
/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  //定义一个变量 用来保存该商品的详情信息
  details:any = null;
  notFound:any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,private myService:MyHttpService,private myToastCtr:ToastController) {
    this.notFound = NotFoundPage;
  }

  //跳转到404
  jump(){
    this.navCtrl.push(this.notFound);
  }

  //检查用户是否登录
  checkUserLogin(){
    //发请求
    this.myService.sendRequest('http://localhost/ajia_code/data/user/session_data.php')
    .subscribe((result)=>{
      console.log(result);
      //拿数据 
      //①未登录 toast提示未登录 跳转到login
      //②已登录 发请求将商品添加到购物车 toast提示添加成功
      if(result.uid){
        //已登录
        this.addToCart();
      }
      else{
        //显示toast
        this.myToastCtr.create({
          message:'您未登录，将跳转到登录页',
          position:'top',
          duration:1000
        }).present();
        //跳转
        this.navCtrl.push(LoginPage)
      }
    });
    
  }

  addToCart(){
    //发请求
    this.myService
    .sendRequest('http://localhost/ajia_code/data/cart/add.php?buyCount=1&lid='+this.navParams.get('pid'))
    .subscribe((result)=>{
      console.log(result);
      if(result.code == 200){
        this.myToastCtr.create({
          message:'添加成功',
          duration:1000
        }).present();
      }
      else{
        this.myToastCtr.create({
          message:'添加失败',
          duration:1000
        }).present();
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    console.log(this.navParams.get('pid'))
    //发起请求（根据产品id查询详情）
    this.myService
    .sendRequest('http://localhost/ajia_code/data/product/details.php?lid='+this.navParams.get('pid'))
    .subscribe((result)=>{
      console.log(result);
      //将详情数据保存在类中
      this.details = result.details;
    });
  }

}
