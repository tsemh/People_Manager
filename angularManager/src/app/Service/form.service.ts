import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private fb: FormBuilder) { }

  createForm(): FormGroup {
    return this.fb.group({
      id: [0],
      name: [''],
      gender: [''],
      birthDate: [''],
      maritalStatus: [''],
      address: this.createAddressForm()
    });
  }

  private createAddressForm(): FormGroup {
    return this.fb.group({
      cep: [''],
      address: [''],
      number: [0],
      complement: [''],
      neighborhood: [''],
      state: [''],
      city: ['']
    });
  }
}
