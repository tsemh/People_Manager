import { AddressService } from './../../Service/address.service';
import { FormService } from 'src/app/Service/form.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { PeopleModel } from 'src/app/Model/people.model';
import { ModalService } from 'src/app/Service/modal.service';
import { PeopleService } from 'src/app/Service/people.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  public personEnabled: boolean = false;
  public formEnabled!: boolean;
  public inputsHaveBorder!: boolean;
  public people: PeopleModel[] = [];
  public peopleSelected!: PeopleModel;
  public peopleForm: FormGroup = this.formService.createForm();
  public page: number = 1;
  public limit: number = 5;

  constructor(
    private modalService: ModalService,
    private peopleService: PeopleService,
    private formService: FormService,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.getAllPeople();
  }

  newPeople(template: TemplateRef<any>) {
    this.enableForm();
    this.openModal(template);
  }

  enableForm() {
    this.enableInput();
    this.enableInputBorder();
  }
  btnDelete(id:number) {
    this.deletePeople(id);
    this.reloadPage();
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.openModal(template);
  }

  closeModal() {
    this.modalService.modalRef?.hide();
  }

  enablePersonInfo(people: PeopleModel) {
    this.enablePerson();
    this.peopleSelect(people);
  }
  enablePerson() {
    this.personEnabled = true;
  }

  enableInputBorder() {
    this.inputsHaveBorder = true;
  }

  enableInput() {
    this.formEnabled = true;
  }
  reloadPage() {
    window.location.reload();
  }
  addressTitleAndId(people: PeopleModel) {
    this.addressService.titleAndId = [];
    people.addresses.forEach((address) => {
      const title = `${address.neighborhood} - ${address.number}`;
      this.addressService.titleAndId.push({ id: address.id, title: title }); 
    });
  }
  peopleSelect(people: PeopleModel) {
    this.peopleSelected = people;
    this.addressTitleAndId(people);
    if (this.peopleForm) {
      this.peopleForm.reset();
      this.peopleForm.patchValue(people);
    }
  }
  getAllPeople() {
    this.peopleService.getAll(this.page, this.limit).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (people: PeopleModel[] | null) => {
        if (people !== null) {
          this.people = people;
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  getById(id: number) {
    this.peopleService.getById(id).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (person: PeopleModel | null) => {
        if (person !== null) {
          console.log('Person found by ID:', person);
        }
      },
      error: (error: any) => {
        console.error('Error finding person by ID:', error);
      }
    });
  }

  searchPeople(query: string | number) {
    this.peopleService.search(query, this.page, this.limit).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (people: PeopleModel[] | null) => {
        if (people !== null) {
          console.log('People found by search query:', people);
          this.people = people;
        }
      },
      error: (error: any) => {
        console.error('Error searching for people:', error);
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
          console.log('New person created:', createdPeople);
        }
      },
      error: (error: any) => {
        console.error('Error creating new person:', error);
      }
    });
  }

  updatePeople(id: number, updatedPeople: PeopleModel) {
    this.peopleService.update(id, updatedPeople).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: (updatedPerson: PeopleModel | null) => {
        if (updatedPerson !== null) {
          console.log('Person updated:', updatedPerson);
        }
      },
      error: (error: any) => {
        console.error('Error updating person:', error);
      }
    });
  }

  deletePeople(id: number) {
    this.peopleService.delete(id).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    ).subscribe({
      next: () => {
        console.log('Person deleted with ID:', id);
      },
      error: (error: any) => {
        console.error('Error deleting person:', error);
      }
    });
  }
}
