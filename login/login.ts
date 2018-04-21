import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  uname:string="";
  upwd:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,private myServce:MyHttpService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  doLogin(){
    //获取用户名和密码 发给服务器校验
    this.myServce
    .sendRequest('http://localhost/ajia_code/data/user/login.php?uname='+this.uname+"&upwd="+this.upwd)
    .subscribe((result)=>{
      console.log(result);
      if(result.code == 200){
        //返回上一页
        this.navCtrl.pop();
      }
      else{
        //通知用户登录失败
        this.myServce.showToast('登录失败！');
      }
    });
  }

}
