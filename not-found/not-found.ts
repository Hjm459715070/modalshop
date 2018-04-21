import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotFoundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-not-found',
  templateUrl: 'not-found.html',
})
export class NotFoundPage {
  count=5;
  timer=null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotFoundPage');
    this.timer= setInterval(()=>{
      this.count--;
      if(this.count==1){
        //返回上一页
        this.navCtrl.pop();
      }
    },1000);
  }

  ionViewWillLeave(){
    console.log('页面准备离开');
    //关闭定时器
    clearInterval(this.timer);
  }

}
