import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public peopleModal?: BsModalRef;
  public addressModal?: BsModalRef;

  constructor(private modalService: BsModalService) {  }

  openPeopleModal(template: TemplateRef<any>) {
    this.peopleModal = this.modalService.show(template);
  }
  openAddressModal(template: TemplateRef<any>) {
    this.addressModal = this.modalService.show(template);
  }
  closePeopleModal() {
    this.peopleModal?.hide();
  }

  closeAddressModal() {
    this.addressModal?.hide();
  }
}
