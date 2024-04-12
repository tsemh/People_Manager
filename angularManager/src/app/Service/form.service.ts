import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private fb: FormBuilder) { }

  createForm(): FormGroup {
    return this.fb.group({
      id: [0],
      name: ['',[Validators.required, Validators.maxLength(30)]],
      gender: ['',[Validators.required, Validators.maxLength(15)]],
      birthDate: ['',[Validators.required, Validators.maxLength(8), this.onlyNumbersValidator]],
      maritalStatus: ['',[Validators.required, Validators.maxLength(15)]],
      address: this.createAddressForm()
    });
  }

  private createAddressForm(): FormGroup {
    return this.fb.group({
      cep: ['',[Validators.required, Validators.maxLength(8), this.onlyNumbersValidator]],
      address: ['',[Validators.required, Validators.maxLength(30)]],
      number: [0,[Validators.required, Validators.maxLength(5), this.onlyNumbersValidator]],
      complement: ['',[Validators.required, Validators.maxLength(50)]],
      neighborhood: ['',[Validators.required, Validators.maxLength(30)]],
      state: ['',[Validators.required, Validators.maxLength(30)]],
      city: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  grabInformationPeopleForm(peopleForm: FormGroup) {
    return {
      name: peopleForm.get('name')?.value,
      gender: peopleForm.get('gender')?.value,
      birthDate: peopleForm.get('birthDate')?.value,
      maritalStatus: peopleForm.get('maritalStatus')?.value
    };
  }

  grabInformationAddressForm(peopleForm: FormGroup) {
    const addressFormGroup = peopleForm.get('address') as FormGroup;
    return {
      cep: addressFormGroup.get('cep')?.value,
      address: addressFormGroup.get('address')?.value,
      number: addressFormGroup.get('number')?.value,
      complement: addressFormGroup.get('complement')?.value,
      neighborhood: addressFormGroup.get('neighborhood')?.value,
      state: addressFormGroup.get('state')?.value,
      city: addressFormGroup.get('city')?.value
    };
  }

  onlyNumbersValidator(control: FormControl) {
    const value = control.value;
    const isNumber = /^\d+$/.test(value);
    return isNumber ? null : { onlyNumbers: true };
  }
}
