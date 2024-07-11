import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  employeeId: number;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.getEmployee(this.employeeId);
      }
    });
  }

  getEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe((data: any) => {
      this.employeeForm.patchValue({
        name: data.data.employee_name,
        salary: data.data.employee_salary,
        age: data.data.employee_age
      });
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.isEditMode) {
        this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      } else {
        this.employeeService.createEmployee(this.employeeForm.value).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      }
    }
  }
}
