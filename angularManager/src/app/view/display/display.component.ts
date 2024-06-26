import { AddressService } from './../../Service/address.service';
import { FormService } from 'src/app/Service/form.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { PeopleModel } from 'src/app/Model/people.model';
import { ModalService } from 'src/app/Service/modal.service';
import { PeopleService } from 'src/app/Service/people.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  public personEnabled: boolean = false;
  public formEnabled: boolean = false
  public inputsHaveBorder!: boolean;
  public people: PeopleModel[] = [];
  public peopleSelected: PeopleModel | null = null;
  public peopleForm: FormGroup = this.formService.createForm();
  public page: number = 1;
  public limit: number = 10;
  public itemsPerPage = 5;
  public updateOn = false;

  constructor(
    private modalService: ModalService,
    private peopleService: PeopleService,
    private formService: FormService,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.formService.applyDateFormat(this.peopleForm, 'birthDate');
    this.getAllPeople();
    this.subscribeToPeople();
  }
  onPageChange(pageNumber: number) {
    this.page = pageNumber;
  }
  updateLimit(event: any) {
    const newLimit = parseInt(event?.target?.value);
    if (!isNaN(newLimit)) {
      this.limit = newLimit;
    } else {
      this.limit = 10;
    }
    this.getAllPeople();
  }

  newPeople(template: TemplateRef<any>) {
    this.peopleSelected = null;
    this.peopleService.idSelect = 0;
    this.addressService.idAndTitle = [];
    this.peopleForm.reset();
    this.disablePerson();
    this.enableInput();
    this.updateOff();
    this.modalService.openPeopleModal(template);
  }

  enableForm() {
    this.enableInput();
    this.enableInputBorder();
  }
  btnDelete(id: number) {
    this.peopleService.delete(id);
    this.reloadPage();
  }

  closeModal() {
    this.modalService.peopleModal?.hide();
  }

  enablePersonInfo(people: PeopleModel) {
    this.enablePerson();
    this.peopleSelect(people);
  }
  enablePerson() {
    this.personEnabled = true;
  }
  disablePerson() {
    this.personEnabled = false
  }

  enableInputBorder() {
    this.inputsHaveBorder = true;
  }

  enableInput() {
    this.formEnabled = true;
  }
  disableForm() {
    this.formEnabled = false;
  }
  reloadPage() {
    window.location.reload();
  }
  addressTitleAndId(people: PeopleModel) {
    this.addressService.idAndTitle = [];
    people.addresses.forEach((address) => {
      const title = `${address.neighborhood} - ${address.number}`;
      this.addressService.idAndTitle.push({ id: address.id, title: title });
    });
  }
  peopleSelect(people: PeopleModel) {
    this.disableForm();
    this.peopleSelected = people;
    this.addressTitleAndId(people);
    this.peopleService.idSelect = people.id;
    if (this.peopleForm) {
      this.peopleForm.reset();
      this.peopleForm.patchValue(people);
    }
  }

  searchPeople(query: string | number) {
    this.disablePerson();
    this.peopleService.search(query, this.page, this.limit);
  }
  getAllPeople() {
    this.disablePerson();
    this.peopleService.getAll(this.page, this.limit);
  }
  subscribeToPeople() {
    this.peopleService.people$.subscribe(people => {
      this.people = people;
    });
  }
  updateOff() {
    this.updateOn = false;
  }
}
