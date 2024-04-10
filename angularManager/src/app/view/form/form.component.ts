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


  constructor(private modalService: ModalService,
    public addressService: AddressService,
    private peopleService: PeopleService,
    private notificationService: NotificationService,

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
      this.addressIdSelect(selectedIndex)
      this.getAddressById(this.addressIdSelected);
      this.enableAddressFields();
    }
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
  addressIdSelect(selectedIndex: number) {
    this.addressIdSelected = this.addressService.idAndTitle[selectedIndex - 1].id;
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
}
