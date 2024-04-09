import { AddressService } from './../../Service/address.service';
import { PeopleModel } from './../../Model/people.model';
import { Component, Input, TemplateRef} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/Service/modal.service';
import { SubmitFormUtil } from 'src/app/Util/submit-form.util';
import { TitleAndId } from 'src/app/Interface/title-and-id.interface';
import { FormService } from 'src/app/Service/form.service';
import { catchError, of } from 'rxjs';
import { AddressModel } from 'src/app/Model/address.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  
  @Input() formEnabled: boolean = false;
  @Input() peopleForm!: FormGroup;
  public showAddressFields: boolean = false;
  public inputsHaveBorder: boolean = false;
  public people?: PeopleModel;
  public addressIdSelected!: number;


  constructor(private modalService: ModalService,
              public addressService: AddressService
  ) { }

  ngOnInit(): void {
  }

  enableForm() {
    this.enableInputBorder();
    this.enableInput();
  }

  disableForm() {
    this.closeModal();
    this.DisableInputBorder();
    this.disableInput();
  }

  newAddress(template: TemplateRef<any>) { 
    this.disableAddressFields();
    this.openModal(template);
  }
  selectAddressField(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    this.clearAddressFields();
    if (selectedIndex === 0) {
      this.disableAddressFields();
    } else {
      this.addressIdSelect(event)
      this.getAddressById(this.addressIdSelected);
    }
    this.enableAddressFields();
  }

  submitForm(event: Event) {
    SubmitFormUtil.handleSubmit(event);
  }
  openModal(template: TemplateRef<any>) {
    this.modalService.openModal(template); 
  }
  closeModal() {
    this.modalService.modalRef?.hide();
  }

  disableInput() {
    this.formEnabled = false;
  }

  enableInput() {
    this.formEnabled = true;
  }

  DisableInputBorder() {
    this.inputsHaveBorder = false;
  }

  enableInputBorder() {
    this.inputsHaveBorder = true;
  }

  enableAddressFields() {
    this.showAddressFields = true;
  }
  disableAddressFields() {
    this.showAddressFields = false;
  }
  get addressFormGroup(): FormGroup | null {
    return this.peopleForm ? this.peopleForm.get('address') as FormGroup : null;
  }
  clearAddressFields() {
    if (this.addressFormGroup) {
      this.addressFormGroup.reset();
    }
  }
  addressIdSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    this.addressIdSelected = this.addressService.titleAndId[selectedIndex-1].id;
    console.log(selectedIndex)
  }
  
  getAddressById(id: number) {
    this.addressService.getById(id).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (address: AddressModel | null) => {
        if (address !== null) {
          console.log('Person found by ID:', address);
          this.peopleForm.get('address')?.patchValue(address);
        }
      },
      error: (error: any) => {
        console.error('Error finding person by ID:', error);
      }
    });
  }
}
