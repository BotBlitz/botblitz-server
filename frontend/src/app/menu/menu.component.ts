import { Component, OnInit, } from '@angular/core';
import { AuthService } from '@service/authService';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { Router, RouterModule } from '@angular/router';
import { AuthResponse } from '@commons/dto/authResponse';
import { environment } from '@environment';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatExpansionModule,MatMenuModule, MatButtonModule, MatIconModule, MatToolbarModule, CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  isAuthenticated?: boolean = false
  menuList: any[] = [];
  menuSubitem: any[] = [];
  name: string;

  constructor(private authService: AuthService, private router: Router) {
    this.name = ""
    this.isAuthenticated = false
  }

  ngOnInit(): void {
    this.subscribeAuthUser()
  }

  subscribeAuthUser() {
    this.authService.currentUser.subscribe(auth => {
      this.menuList = []
      let authUser = auth as AuthResponse
      this.isAuthenticated = this.authService.isAuthenticated()
      if (this.isAuthenticated) {
        if (this.authService.currentUserValue.name) {
          this.name = this.authService.currentUserValue.name
        }
        this.buildMenuOptions(authUser)
      }
    })
  }

  buildMenuOptions(auth: AuthResponse): void {
    for (let routeItem of environment.routeList) {
      if (routeItem.security) {
        if (auth.roles) {
          let filteredItem = auth.roles.filter(role => role.code == routeItem.code)
          if (filteredItem) {
            this.menuList.push(routeItem)
          }
        }
      }
      else {
        this.menuList.push(routeItem)
      }
    }
  }

  signout() {
    this.authService.logout()
      this.router.navigate(['login'])
  }
}
