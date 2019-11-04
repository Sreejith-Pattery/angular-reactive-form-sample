import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { containerRefreshEnd } from '@angular/core/src/render3/instructions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupform:FormGroup;
  forbiddenUserNames = ['Chris','Anna'];

  constructor(private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.signupform = new FormGroup({
      userData:new FormGroup({
      'username':new FormControl(null, [Validators.required,this.forbiddenNames.bind(this)] ),
      'email':new FormControl(null, [Validators.required, Validators.email],this.forbiddenEmail)}),     
      'gender':new FormControl('male'),
      'hobbies':new FormArray([])
    });

    // this.signupform.valueChanges.subscribe((value:string)=>{
    //   console.log(value);
    // })
    this.signupform.statusChanges.subscribe((status)=>{
        console.log(status);
      })
  }

  AddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupform.get('hobbies')).push(control);
  }

  onSubmit(){
    console.log(this.signupform);
  }

  forbiddenNames(control: FormControl):{[s: string]:boolean}{
    if(this.forbiddenUserNames.indexOf(control.value)!=-1){
      return {'namesIsForbidden':true};
    } else {
      return null;
    }
  }

  forbiddenEmail(control:FormControl):Promise<any>|Observable<any>{
    const promise = new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value == 'test@test.com'){
          resolve({'emailforbidden':true});
        } else{
          resolve(null);
        }
      },1000);
    });
    return promise;
  }
}
