import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserResponse } from '@commons/dto/userResponse';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  user?: UserResponse;

  constructor(
    private activetedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    
  }

  back(){
    window.history.back();
  }
}
