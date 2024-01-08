import { Component, OnInit, ɵDeferBlockConfig } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/authService';
import { CommonResponse } from '@commons/dto/commonResponse';
import { AuthRequest } from '@commons/dto/authRequest';
import { MenuComponent } from '../menu/menu.component';
import { Utils } from '@commons/utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MenuComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  isLoading: boolean
  isSubmitted: boolean
  description?:string

  formSignin: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private authService: AuthService) {   

      this.isLoading = false
      this.isSubmitted = false
      this.formSignin = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }



  signin() {
    this.isSubmitted = true;

    if (this.formSignin.invalid){
      return
    }

    this.isLoading = true;
    let auth = new AuthRequest()
    let value = this.formSignin.value;
    auth.username = value.username
    auth.password = Utils.toBase64(value.password)
    
    this.authService.login(auth).subscribe({
      next: result => {
        let response = result as CommonResponse
        if (response.code == 200) {
          this.router.navigate(['home'])
        }
        this.isLoading = false;
      },
      error: err => {
        let response = err.error as CommonResponse
        this.description = response.description
        this.isLoading = false;
      }
    })
  }
}