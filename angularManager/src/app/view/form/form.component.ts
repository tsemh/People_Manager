import { AddressService } from './../../Service/address.service';
import { PeopleModel } from './../../Model/people.model';
import { Component, Input, TemplateRef} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/Service/modal.service';
import { SubmitFormUtil } from 'src/app/Util/submit-form.util';
import { TitleAndId } from 'src/app/Interface/title-and-id.interface';

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
  public addressTitleAndId: TitleAndId[] = [];
  public addressIdSelected!: number;

  constructor(private modalService: ModalService,
              private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.addressTitleAndId = this.addressService.titleAndId;
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
    this.enableAddressFields();
    this.addressIdSelect(event)
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
  addressIdSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    this.addressIdSelected = this.addressTitleAndId[selectedIndex].id;
    console.log(this.addressIdSelected);
  }
  save() {
    console.log(this.peopleForm.value)
  }
}
