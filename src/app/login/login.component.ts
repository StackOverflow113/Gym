import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
formularioLogin: FormGroup  
datosCorrectos: boolean = true;
textoError: string ='';
  constructor(private creadorFormulario: FormBuilder,public auth: AngularFireAuth, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formularioLogin = this.creadorFormulario.group({
      email : ['', Validators.compose([
        Validators.required,Validators.email
      ])],
      password: ['', Validators.required ]
    });
  }

  ingresar(){
    if(this.formularioLogin.valid){
      this.datosCorrectos = true;
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password).then((usuario)=>{
        console.log(usuario) 
        this.spinner.hide();
     }).catch((Error)=>{
        this.datosCorrectos= false;
        this.textoError=Error.message;
        this.spinner.hide();
     })         
   }else{
      this.datosCorrectos=false;     
      this.textoError='Wrong Data' 
   }

    }
   

}
