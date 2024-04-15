import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public restrictedNumbers: string[] = ['name', 'gender', 'maritalStatus', 'address', 'neighborhood', 'state', 'city'];
  public restrictedText: string[] = ['birthDate', 'cep', 'number'];

  constructor(private fb: FormBuilder) { }

  createForm(): FormGroup {
    return this.fb.group({
      id: [0],
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      gender: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      birthDate: ['',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      maritalStatus: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      address: this.createAddressForm()
    });
  }

  private createAddressForm(): FormGroup {
    return this.fb.group({
      cep: ['',[Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      address: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      number: [0,[Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      complement: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      neighborhood: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      state: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
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

  validators(form: FormGroup) {
    const controls = ['name', 'gender', 'birthDate', 'maritalStatus', 'address'];
    controls.forEach(controlName => {
      const control = form.get(controlName);
      if (control) {
        const errors = control.errors;
        if (errors) {
        }
      }
    });
  }

  disablePressNumber(event: any, fieldName: string) {
    if (this.restrictedNumbers.includes(fieldName)) {
      const inputValue = event.key;
      if (!/^[a-zA-Z\s]*$/.test(inputValue)) {
        event.preventDefault();
      }
    }
  }

  disablePressText(event: any, fieldName: string) {
    if (this.restrictedText.includes(fieldName)) {
      const inputValue = event.key;
      if (!/^\d*$/.test(inputValue)) {
        event.preventDefault();
      }
    }
  }

   applyDateFormat(form: FormGroup, fieldName: string) {
    const control = form.get(fieldName);
  
    if (control) {
      control.valueChanges.subscribe((value: string) => {
        if (value) {
          const formattedDate = this.formatDate(value);
          control.patchValue(formattedDate, { emitEvent: false });
        }
      });
    }
  }
  
  private formatDate(date: string): string {
    const cleanedValue = date.replace(/\D/g, '');
      const formattedDate = cleanedValue
      .slice(0, 8)
      .replace(/^(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
  
    return formattedDate;
  }
  applyCEPMask(form: FormGroup, fieldName: string) {
    const control = form.get(fieldName);
  
    if (control) {
      control.valueChanges.subscribe((value: string) => {
        if (value) {
          const formattedCEP = this.formatCEP(value);
          control.patchValue(formattedCEP, { emitEvent: false });
        }
      });
    }
  }
  
  private formatCEP(cep: string): string {
    const cleanedCEP = cep.replace(/\D/g, '');
      const formattedCEP = cleanedCEP
      .slice(0, 8)
      .replace(/^(\d{5})(\d{3})/, '$1-$2');
  
    return formattedCEP;
  }
}
