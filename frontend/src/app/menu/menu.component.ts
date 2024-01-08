import { Component, OnInit, } from '@angular/core';
import { AuthService } from '@service/authService';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthResponse } from '@commons/dto/authResponse';
import { environment } from '@environment';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  isAuthenticated?: boolean = false
  menuList: any[] = [];

  constructor(private authService: AuthService, private router: Router) {
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
        this.buildMenuOptions(authUser)
      }
    })

  }

  buildMenuOptions(auth: AuthResponse): void {
    for (let routeItem of environment.routeList){
      if (routeItem.security){
        if (auth.role){
          let filteredItem = auth.role.filter(role => role.code == routeItem.code)
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
