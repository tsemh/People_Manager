import { AddressService } from './../../Service/address.service';
import { PeopleModel } from './../../Model/people.model';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/Service/modal.service';
import { SubmitFormUtil } from 'src/app/Util/submit-form.util';
import { merge } from 'rxjs';
import { PeopleService } from 'src/app/Service/people.service';
import { NotificationService } from 'src/app/Service/notification.service';
import { FormService } from 'src/app/Service/form.service';
import { MakeJasonUtil } from 'src/app/Util/make-json.util';
import * as moment from 'moment';

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
  public newAddressOff: boolean = false;
  public deleteOn: boolean = false;
  public age: number = 0;
  public daysUntilNextBirthday: number = 0;
  public isBirthdayToday: boolean = false;

  constructor(
    private modalService: ModalService,
    private notificationService: NotificationService,
    private formService: FormService,
    private makeJsonUtil: MakeJasonUtil,

    public addressService: AddressService,
    private peopleService: PeopleService) { }

  ngOnInit(): void {
    merge(
      this.notificationService.idSelectedChanged,
      this.notificationService.titleAndIdChanged
    ).subscribe(() => this.disableAddressFields());
    this.formService.validators(this.peopleForm);
  }
  get addressFormGroup(): FormGroup | null {
    return this.peopleForm ? this.peopleForm.get('address') as FormGroup : null;
  }

  enableForm() {
    this.enableInputBorder();
    this.enableInput();
    this.enableDelete()
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
      this.loadAddressDetails(this.addressIdSelected);
      this.enableAddressFields();
    }
  }
  
  loadAddressDetails(addressId: number): void {
    this.addressService.getById(addressId, this.peopleForm);
  }

  submitForm(event: Event) {
    SubmitFormUtil.handleSubmit(event);
  }

  submitPeopleForm(template: TemplateRef<any>) {
    const peopleInfo = this.formService.grabInformationPeopleForm(this.peopleForm);
    const addressArray = [this.addressService.infoAddress]; 
    const addressInfo: any = {...this.addressService.infoAddress};
    addressInfo.number = Number(addressInfo.number);
  
    if (this.isEditMode()) {
      this.updatePeopleAndAddress(peopleInfo, addressInfo);
    } else {
      if (this.isValidPeopleAndAddress(peopleInfo, addressArray[0], template)) {
        this.createOrUpdatePeople(peopleInfo, addressInfo);
      }
    }
  }
  
  isEditMode(): boolean {
    return !!(this.peopleService.idSelect && this.peopleService.idSelect !== 0 && this.addressIdSelected && this.addressIdSelected !== 0);
  }
  
  updatePeopleAndAddress(peopleInfo: any, addressInfo: any) {
    this.peopleService.updatePeopleAndAddress(peopleInfo, addressInfo, this.addressIdSelected);
    window.location.reload();
  }
  
  isValidPeopleAndAddress(peopleInfo: any, addressInfo: any, template: TemplateRef<any>): boolean {
    if (!this.isPeopleInfoValid(peopleInfo)) {
      alert("The person's information was not filled in correctly");
      return false;
    }
  
    if (!this.isAddressInfoValid(addressInfo)) {
      this.newAddress(template);
      return false;
    }
  
    return true;
  }
  
  createOrUpdatePeople(peopleInfo: any, addressInfo: any) {
    if (this.peopleService.idSelect && this.peopleService.idSelect !== 0) {
      this.peopleService.update(peopleInfo);
    } else {
      this.peopleService.post(this.makeJsonUtil.makeJson(peopleInfo, [addressInfo]));
      this.calculateAge();
      this.calculateDaysUntilNextBirthday();
      this.modalService.closePeopleModal();
      this.clearAddressFields();
      this.showBirthdayAlert();
    }
  
    window.location.reload();
  }
  

  submitAddressForm() {
    this.setAddressOnService();
    const addressInfo = this.getAddressInfoFromForm();
    if (!this.isAddressInfoValid(addressInfo)) {
      alert("The address's information was not filled in correctly");
      return;
    }
  
    if (this.peopleService.idSelect && this.peopleService.idSelect !== 0) {
      this.createAddress(addressInfo);
    }
    this.disableNewAddress();
    this.closeModalAndClearFields();
  }

  disableNewAddress() {
    if(this.addressService.infoAddress) {
      this.newAddressOff = true;
    }
  }
  enableDelete() {
    this.deleteOn = true;
  }

  setAddressOnService() {
    this.addressService.infoAddress = this.formService.grabInformationAddressForm(this.peopleForm);
  }

  getAddressInfoFromForm(): any { //addresInfo
    return this.formService.grabInformationAddressForm(this.peopleForm);
  }
 
  createAddress(addressInfo: any) { //addressInfo
    this.addressService.post(addressInfo, this.peopleService.idSelect);
  }
  updateAddress(addressInfo: any){ //addressInfo
    this.addressService.update(this.addressIdSelected, addressInfo)
  }
  closeModalAndClearFields() {
    this.modalService.closeAddressModal();
    this.clearAddressFields();
  }

  removeAddress() {
    this.addressService.delete(this.addressIdSelected);
    window.location.reload();
  }

  isAddressInfoValid(addressInfo: any): boolean {
    return addressInfo && addressInfo.cep && addressInfo.address;
  }


  isPeopleInfoValid(peopleInfo: any): boolean {
    return peopleInfo.name && peopleInfo.gender && peopleInfo.birthDate && peopleInfo.maritalStatus;
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
  disablePressNumber(event: any, fieldName: string) {
    this.formService.disablePressNumber(event, fieldName)
  }

  disablePressText(event: any, fieldName: string) {
    this.formService.disablePressText(event, fieldName)
  }

  calculateAge(): void {
    const birthDate = this.peopleForm.get('birthDate')?.value;
    if (birthDate) {
      const today = moment();
      const formattedBirthDate = moment(birthDate, 'YYYY-MM-DD');
      this.age = today.diff(formattedBirthDate, 'years');
    }
  }

  calculateDaysUntilNextBirthday(): void {
    const birthDate = this.peopleForm.get('birthDate')?.value;
    if (birthDate) {
      const today = moment();
      const formattedBirthDate = moment(birthDate, 'YYYY-MM-DD');
      const nextBirthday = formattedBirthDate.clone().add(this.age + 1, 'years');
      this.daysUntilNextBirthday = nextBirthday.diff(today, 'days');
      this.isBirthdayToday = formattedBirthDate.month() === today.month() && formattedBirthDate.date() === today.date();
    }
  }

  showBirthdayAlert() {
    let message = `Você tem ${this.age} anos de idade.`;
    if (this.isBirthdayToday) {
      message += "\nParabéns pelo seu aniversário!";
    } else {
      message += `\nFaltam ${this.daysUntilNextBirthday} dias para o seu próximo aniversário.`;
    }
    alert(message);
  }
}
