import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { AutomationService } from '@service/automationService';

@Component({
  selector: 'app-automation-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterModule],
  templateUrl: './automation-edit.component.html',
  styleUrl: './automation-edit.component.css'
})
export class AutomationEditComponent implements OnInit {


  zipFile: any;

  form: FormGroup;

  constructor(
    private automationService: AutomationService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl({ value: '', disabled: false }),
      description: new FormControl({ value: '', disabled: false }),
      file: new FormControl({ value: '', disabled: true })
    })
  }

  ngOnInit(): void {
  }

  onFileSelected = (event: Event & { target: HTMLInputElement }) => {
    this.form.get('file')?.setValue(event.target.files?.[0].name);
    alert(<File>event.target.files?.[0])
    this.zipFile = <File>event.target.files?.[0];
  };

  uploadFile() {
    let fd = new FormData();
    let name = this.form.get('name')?.value;
    let descrition = this.form.get('name')?.value;

    fd.append('name', name);
    fd.append('description', descrition);
    fd.append('robot', this.zipFile);

    this.automationService.upload(fd).subscribe({
      next:(response) => {
        alert(JSON.stringify(response))
      },
      error:(err)=>{
        alert(JSON.stringify(err))
      }
    })
  }

  back() {
    window.history.back()
  }
}
