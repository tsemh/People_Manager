import { AddressService } from './../../Service/address.service';
import { PeopleModel } from './../../Model/people.model';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/Service/modal.service';
import { SubmitFormUtil } from 'src/app/Util/submit-form.util';
import { TitleAndId } from 'src/app/Interface/title-and-id.interface';
import { FormService } from 'src/app/Service/form.service';
import { catchError, merge, of } from 'rxjs';
import { AddressModel } from 'src/app/Model/address.model';
import { PeopleService } from 'src/app/Service/people.service';
import { NotificationService } from 'src/app/Service/notification.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() formEnabled: boolean = false;
  @Input() peopleForm!: FormGroup;
  public showAddressFields: boolean = false;
  public inputsHaveBorder: boolean = false;
  public people?: PeopleModel;
  public addressIdSelected!: number;
  public newPeopleData: any;

  constructor(
    private modalService: ModalService,
    public addressService: AddressService,
    private notificationService: NotificationService,
    private peopleService: PeopleService

  ) { }

  ngOnInit(): void {
    merge(
      this.notificationService.idSelectedChanged,
      this.notificationService.titleAndIdChanged
    ).subscribe(() => this.disableAddressFields());
  }

  enableForm() {
    this.enableInputBorder();
    this.enableInput();
  }

  disableForm() {
    this.modalService.closePeopleModal();
    this.DisableInputBorder();
    this.disableInput();
  }

  newAddress(template: TemplateRef<any>) {
    this.disableAddressFields();
    this.modalService.openAddressModal(template);
  }
  selectAddressField(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    this.clearAddressFields();
    if (selectedIndex === 0) {
      this.disableAddressFields();
    } else {
      this.addressIdSelect(selectedIndex)
      this.getAddressById(this.addressIdSelected);
      this.enableAddressFields();
    }
  }

  submitForm(event: Event) {
    SubmitFormUtil.handleSubmit(event);
  }
  submitPeopleForm(template: TemplateRef<any>) {
    const peopleInfo = this.grabInformationPeopleForm();
    const addressInfo = [this.addressService.infoAddress ];

    if (this.isPeopleInfoValid(peopleInfo)) {
      if (this.isAddressInfoValid(addressInfo[0])) {
        this.postPeople(this.makePeopleJson(peopleInfo, addressInfo))
        this.modalService.closePeopleModal();
      } else {
        this.newAddress(template);
        return;
      }
    } else {
      console.error('Erro: Informações da pessoa não preenchidas corretamente.');
      return;
    }
  }

  submitAddressForm() {
    this.addressService.infoAddress = this.grabInformationAddressForm();

    if (!this.isAddressInfoValid(this.addressService.infoAddress )) {
      console.error('Erro: Informações de endereço não preenchidas corretamente.');
      return;
    }

    this.modalService.closeAddressModal();
    this.clearAddressFields()
  }

  isAddressInfoValid(addressInfo: any): boolean {
    return addressInfo && addressInfo.cep && addressInfo.address;
  }
  

  isPeopleInfoValid(peopleInfo: any): boolean {
    return peopleInfo.name && peopleInfo.gender && peopleInfo.birthDate && peopleInfo.maritalStatus;
  }

  makePeopleJson(peopleInfo: any, addressInfo: any[]) {
    return {
      id: 0,
      name: peopleInfo.name,
      gender: peopleInfo.gender,
      birthDate: peopleInfo.birthDate,
      maritalStatus: peopleInfo.maritalStatus,
      addresses: addressInfo.map(address => {
        return {
          id:0,
          cep: address.cep,
          address: address.address,
          number: parseInt(address.number, 5),
          complement: address.complement,
          neighborhood: address.neighborhood,
          state: address.state,
          city: address.city
        };
      })
    };
  }
  grabInformationPeopleForm() {
    return {
      name: this.peopleForm.get('name')?.value,
      gender: this.peopleForm.get('gender')?.value,
      birthDate: this.peopleForm.get('birthDate')?.value,
      maritalStatus: this.peopleForm.get('maritalStatus')?.value
    };
  }

  grabInformationAddressForm() {
    const addressFormGroup = this.peopleForm.get('address') as FormGroup;
    return {
      cep: addressFormGroup.get('cep')?.value,
      address: addressFormGroup.get('city')?.value,
      number: addressFormGroup.get('number')?.value,
      complement: addressFormGroup.get('complement')?.value,
      neighborhood: addressFormGroup.get('neighborhood')?.value,
      state: addressFormGroup.get('state')?.value,
      city: addressFormGroup.get('city')?.value
    };
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
  addressIdSelect(selectedIndex: number) {
    this.addressIdSelected = this.addressService.idAndTitle[selectedIndex - 1].id;
  }
  closeAddressModal() {
    this.modalService.closeAddressModal();
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
          this.peopleForm.get('address')?.patchValue(address);
        }
      },
      error: (error: any) => {
        console.error('Error finding person by ID:', error);
      }
    });
  }
  postPeople(newPeople: PeopleModel) {
    this.peopleService.post(newPeople).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (createdPeople: PeopleModel | null) => {
        if (createdPeople !== null) {
        }
      },
      error: (error: any) => {
        console.error('Error creating new person:', error);
      }
    });
  }
}
