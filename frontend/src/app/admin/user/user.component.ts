import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '@service/userService';
import { CommonResponse } from '@commons/dto/commonResponse';
import { UserResponse } from '@commons/dto/userResponse';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'table-overview-example',
  styleUrls: ['./user.component.css'],
  templateUrl: './user.component.html',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterModule],
})
export class UserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'isAdmin', 'createdAt', 'updatedAt'];
  dataSource: MatTableDataSource<UserResponse>;
  users: UserResponse[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private userService: UserService, private router: Router) {
    this.users = []
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users = [];
    this.userService.findAllUsers().subscribe(result => {
      let response = result as CommonResponse
      if (response.code == 200) {
        let data = response.data
        if (data)
          for (let item of data) {
            this.users.push(item)
          }

        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;    
      }
    })
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createUser(){
    this.router.navigate(['admin/user/edit'])
  }
}
