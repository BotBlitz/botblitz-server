import { Component, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { APP_DATE_FORMATS, AppDateAdapter } from '@commons/appAdapterDate';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AutomationResponse } from '@commons/dto/automationsResponse';
import { AutomationService } from '@service/automationService';
import { AutomationDialog } from './automation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LicenseResponse } from '@commons/dto/licenseResponse';
import { LicenseRequest } from '@commons/dto/licenseRequest';
import { LicenseService } from '@service/licenseService';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';



@Component({
  selector: 'app-license-edit',
  standalone: true,

  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule],
  templateUrl: './license-edit.component.html',
  styleUrl: './license-edit.component.css',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class LicenseEditComponent implements OnInit {
  form: FormGroup;

  displayedColumns: string[] = ['code', 'name', 'latestVersion', 'actions'];
  dataSource: MatTableDataSource<AutomationResponse>;
  automationsSelected: AutomationResponse[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  license?: LicenseResponse;
  isUpdate: boolean = false;

  constructor(
    private automationService: AutomationService,
    private licenseService: LicenseService,
    public dialog: MatDialog,
    public activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      company: new FormControl({ value: '', disabled: false }),
      expirationDate: new FormControl({ value: '', disabled: false }),
      code: new FormControl({ value: '', disabled: true }),
      securityToken: new FormControl({ value: '', disabled: true }),
      status: new FormControl({ value: '', disabled: true }),
    });

    this.dataSource = new MatTableDataSource(this.automationsSelected);
  }

  ngOnInit(): void {
    this.loadLicense();
  }

  loadLicense() {
    let licenseParam = this.activeRoute.snapshot.queryParams['license'];
    if (licenseParam) {
      this.isUpdate = true;
      this.license = JSON.parse(licenseParam);
      this.form.setValue({
        'company': this.license?.company,
        'expirationDate': this.license?.expirationDate,
        'code': this.license?.code,
        'securityToken': this.license?.securityToken,
        'status': this.license?.status,
      })

      if (this.license && this.license.automations) {
        this.automationsSelected = this.license?.automations;
        this.dataSource = new MatTableDataSource(this.automationsSelected);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
  }

  save() {
    let license = new LicenseRequest();
    if (this.license){
      license = this.license;
    }

    license.company = this.form.get('company')?.value;
    license.expirationDate = this.form.get('expirationDate')?.value;
    license.automations = this.automationsSelected;
    
    if (this.isUpdate){
      this.licenseService.update(license).subscribe({
        next: result => {
          alert(JSON.stringify(result))
        }
      })  
    }
    else{
      this.licenseService.create(license).subscribe({
        next: result => {
          alert(JSON.stringify(result))
        }
      })  
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AutomationDialog, {
      data: this.automationsSelected,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.automationsSelected.push(result);
        this.dataSource = new MatTableDataSource(this.automationsSelected);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  removeAutomation(automation: AutomationResponse){
    let filteredList = this.automationsSelected.filter(automationFilter => 
      automationFilter.code != automation.code
    )
    this.automationsSelected = filteredList;
      this.dataSource = new MatTableDataSource(this.automationsSelected);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  back() {
    window.history.back();
  }
}
