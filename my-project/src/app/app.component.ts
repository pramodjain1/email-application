import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpBackend } from '@angular/common/http/src/backend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message :Object = {message:"",msgType:""};
  showForm : boolean = true;
  showAjaxLoader: boolean = false;
  mailData = {
    to:"",
    cc:"",
    bcc:"",
    subject:"",
    bodyText:""
  };

  constructor(private http : HttpClient){

  }
  btnClick(){
    this.showForm = false;
    this.showAjaxLoader=true;
    this.http.post('./welcome/send',this.mailData,{'responseType':'json'}).subscribe(response=>{
      this.message=response;
      this.showAjaxLoader=false;
      
    });
  }
}
