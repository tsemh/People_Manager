import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/Service/form.service';
import { ViaCepService } from 'src/app/Service/via-cep.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit{
  @Input() addressForm!: FormGroup;
  constructor(
    private formService: FormService,
    private viaCepService: ViaCepService
  ){  }

  ngOnInit(): void {
    this.formService.applyCEPMask(this.addressForm, 'cep');
  }

  disablePressNumber(event: any, fieldName: string) {
    this.formService.disablePressNumber(event, fieldName)
  }

  disablePressText(event: any, fieldName: string) {
    this.formService.disablePressText(event, fieldName);
  }
  removeHyphen(cep: string): string {
    return cep.replace('-', '');
  }
  
  searchAddress() {
    let cep = this.addressForm.get('cep')?.value;
    if (cep) {
      cep = this.removeHyphen(cep); 
      if (cep.length === 8) { 
        this.callViaCepService(cep);
      }
    }
  }
  
  callViaCepService(cep: string) {
    this.viaCepService.getByCep(cep, this.addressForm);
  }
}
