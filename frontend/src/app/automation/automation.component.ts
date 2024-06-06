import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AutomationService } from '@service/automationService';
import { CommonResponse } from '@commons/dto/commonResponse';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { AutomationResponse } from '@commons/dto/automationsResponse';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-automation',
  standalone: true,
  templateUrl: './automation.component.html',
  styleUrl: './automation.component.css',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterModule]
})
export class AutomationComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'latestVersion'];
  dataSource: MatTableDataSource<AutomationResponse>;
  automations: AutomationResponse[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  zipFile:File | null = null;

  constructor(private automationService: AutomationService, private router: Router) {
    this.automations = []
    this.dataSource = new MatTableDataSource(this.automations);
  }

  ngOnInit(): void {
    this.loadAutomations();
  }

  loadAutomations() {

    this.automations = [];
    this.automationService.findAll().subscribe(result => {
      let response = result as CommonResponse
      if (response.code == 200) {
        let data = response.data
        if (data)
          for (let item of data) {
            this.automations.push(item)
          }

        this.dataSource = new MatTableDataSource(this.automations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  uploadAutomation(){
    this.router.navigate(["automation/edit"]);
  }
}
