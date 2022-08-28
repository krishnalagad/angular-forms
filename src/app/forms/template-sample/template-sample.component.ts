import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-sample',
  templateUrl: './template-sample.component.html',
  styleUrls: ['./template-sample.component.css']
})
export class TemplateSampleComponent implements OnInit {

  states: Array<String> = ['Maharashtra', 'Gujrat', 'Madhya Pradesh', 'J&K'];
  user = {'fname': 'Krishna', 'lname': 'Lagad'};
  constructor() { }

  ngOnInit() {
  }

  submitHandler(myForm: any){
    console.log(myForm);
  }

}
