import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AutomationResponse } from "@commons/dto/automationsResponse";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { AutomationService } from "@service/automationService";
import { CommonResponse } from "@commons/dto/commonResponse";



@Component({
    selector: 'automation-dialog',
    templateUrl: 'automation-dialog.component.html',
    standalone: true,
    imports: [
        FormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogActions,
        MatDialogTitle,
        MatDialogContent,
        MatIconModule
    ],
})
export class AutomationDialog implements OnInit {

    displayedColumns: string[] = ['name', 'actions'];
    dataSource: MatTableDataSource<AutomationResponse>;
    automations: AutomationResponse[] = [];
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;

    constructor(
        public dialogRef: MatDialogRef<AutomationDialog>,
        private automationService: AutomationService,
        @Inject(MAT_DIALOG_DATA)
        public automationsSelected: AutomationResponse[]) {
            this.dataSource = new MatTableDataSource();
        }

    ngOnInit(): void {
        this.loadAutomations()
    }

    loadAutomations(){
        this.automationService.findAll().subscribe({
            next:result=>{
                let response = result as CommonResponse
                if (response.code == 200){
                    let data = response.data
                    if (data)
                      for (let item of data) {
                        let automationFiltered = this.automationsSelected.filter(i => i.code == item.code)
                        if (automationFiltered.length == 0) {
                          this.automations.push(item)
                        }
                      }
                      this.dataSource = new MatTableDataSource(this.automations);
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.sort = this.sort;
                }      
            }
        })
    }

    selectedAutomation(automation: AutomationResponse){
        this.dialogRef.close(automation);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}