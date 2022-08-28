import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-nested-form",
  templateUrl: "./nested-form.component.html",
  styleUrls: ["./nested-form.component.css"],
})
export class NestedFormComponent implements OnInit {
  states: Array<String> = ["Maharastra", "Goa", "Gujrat", "Delhi"];
  fruits: Array<String> = ["Mango", "Grapes", "Strawberry", "Oranges", "Cherry", "Banana"];
  nestedForm: FormGroup;
  selectedFruitValues = [];
  favFruitsError: boolean = true;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.nestedForm = this._fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      favFruits: this.addFruitsControls(),
      address: this._fb.array([this.addAddressGroup()]),
    });
  }

  addFruitsControls(){
    const arr = this.fruits.map(element =>{
      return this._fb.control(false);
    });

    return this._fb.array(arr);
  }

  addAddressGroup() {
    return this._fb.group({
      primaryFlag: [],
      streetAddress: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zipcode: [null, [Validators.required, Validators.pattern("^[0-9]{6}$")],],
    });
  }

  addAddress() {
    this.addressArray.push(this.addAddressGroup());
  }

  removeAddress(index: any) {
    this.addressArray.removeAt(index);
  }

  checkFruitContrlTouched() {
    let flag = false;
    this.fruitsArray.controls.forEach(control => {
      if(control.touched){
        flag = true;
      }
    })
    return flag;
  }

  getSelectedFruitsValue(){
    this.selectedFruitValues = [];

    this.fruitsArray.controls.forEach((control, index) => {
      if(control.value){
        this.selectedFruitValues.push(this.fruits[index]);
      }
    });

    this.favFruitsError = this.selectedFruitValues.length > 0 ? false: true;
  }

  submitHandler() {
    let newItem = this.selectedFruitValues;
    if(this.nestedForm.valid && !this.favFruitsError) {
      console.log({...this.nestedForm.value, newItem});
    }
    else {
      console.log('Form is not valid');
      
    }
  }

  get firstName() {
    return <FormGroup> this.nestedForm.controls.firstName;
  }

  get lastName() {
    return <FormGroup> this.nestedForm.controls.lastName;
  }

  get addressArray() {
    return <FormArray>this.nestedForm.get("address");
  }

  get fruitsArray() {
    return <FormArray>this.nestedForm.get("favFruits");
  }
}
