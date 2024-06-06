import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { AutomationResponse } from '@commons/dto/automationsResponse';
import { CommonResponse } from '@commons/dto/commonResponse';
import { LicenseResponse } from '@commons/dto/licenseResponse';
import { LicenseService } from '@service/licenseService';

@Component({
  selector: 'app-license',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './license.component.html',
  styleUrl: './license.component.css'
})
export class LicensesComponent implements OnInit {
  displayedColumns: string[] = ['company', 'status', 'expirationDate', 'actions'];
  dataSource: MatTableDataSource<any>;
  licenses: LicenseResponse[] = [];

  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(
    private licenseService: LicenseService,
    private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadLicenses()
  }

  loadLicenses() {
    this.licenses = [];
    this.licenseService.findAll().subscribe({
      next:result => {
        let response = result as CommonResponse;
        let { code, data } = response;
        if (code == 200){
            if (data){
              for (let item of data){
                this.licenses.push(item);
              }

              this.dataSource = new MatTableDataSource(this.licenses);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
        }
      }
    })
  }

  addLicense() {
    this.router.navigate(['license/edit'])
  }
  editLicense(license:LicenseResponse){
    const licenseDeserializado = JSON.stringify(license);
    this.router.navigate(['license/edit'],{ queryParams: {license: licenseDeserializado}})
  }
}
