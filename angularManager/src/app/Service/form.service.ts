import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      id: [0],
      name: [''],
      gender: [''],
      birthDate: [''],
      maritalStatus: [''],
      cep: [''],
      addresses: this.fb.array([])
    });
  }
  addAddress(form: FormGroup): void {
    const addressFormGroup = this.fb.group({
      id: [0],
      cep: [''],
      address: [''],
      number: [0],
      neighborhood: [''],
      state: [''],
      city: [''],
      complement: ['']
    });
    (form.get('addresses') as FormArray).push(addressFormGroup);
  }
  
}
