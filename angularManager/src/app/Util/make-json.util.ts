import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MakeJasonUtil {

  makeJson(peopleInfo: any, addressInfo: any[]) {
    return {
      id: 0,
      name: peopleInfo.name,
      gender: peopleInfo.gender,
      birthDate: peopleInfo.birthDate,
      maritalStatus: peopleInfo.maritalStatus,
      addresses: addressInfo.map(address => {
        return {
          id: 0,
          cep: address.cep,
          address: address.address,
          number: Number(address.number),
          complement: address.complement,
          neighborhood: address.neighborhood,
          state: address.state,
          city: address.city
        };
      })
    };
  }
}
