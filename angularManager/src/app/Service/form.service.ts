import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private fb: FormBuilder) { }

  createForm(): FormGroup {
    return this.fb.group({
      id: [0, Validators.required],
      name: ['',Validators.required],
      gender: ['',Validators.required],
      birthDate: ['',Validators.required],
      maritalStatus: ['',Validators.required],
      address: this.createAddressForm()
    });
  }

  private createAddressForm(): FormGroup {
    return this.fb.group({
      cep: ['',Validators.required],
      address: ['',Validators.required],
      number: [0,Validators.required],
      complement: ['',Validators.required],
      neighborhood: ['',Validators.required],
      state: ['',Validators.required],
      city: ['', Validators.required]
    });
  }
}
