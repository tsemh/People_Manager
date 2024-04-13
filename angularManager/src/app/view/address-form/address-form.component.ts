import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/Service/form.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit{
  @Input() addressForm!: FormGroup;
  constructor(
    private formService: FormService
  ){  }

  ngOnInit(): void {
    this.formService.applyCEPMask(this.addressForm, 'cep');
  }

  disablePressNumber(event: any, fieldName: string) {
    this.formService.disablePressNumber(event, fieldName)
  }

  disablePressText(event: any, fieldName: string) {
    this.formService.disablePressText(event, fieldName)
  }
}
