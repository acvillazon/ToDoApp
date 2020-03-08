import { Injectable } from '@angular/core';
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  async inputSelect(input,title:string,placeHolder:string){
    const { value: user } = await Swal.fire({
      title: title,
      input: 'select',
      inputOptions: input,
      inputPlaceholder: placeHolder,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Necesitas seleccionar una opción'
        }
      }
    })

    return user;
  }

  async simpleMessage(tittle:string,type:any,duration:number){
    return Swal.fire({
      title: tittle,
      icon: type || 'info',
      timer:duration
    });
  }

  async inputText(tittle:string, cancelButton:boolean=true, textConfirmBtn:string="crear"){
    let textInput = '';

    const input = await new Promise((resolve, reject) =>{
      Swal.fire({
        title: tittle,
        input: 'text',
        inputAttributes: { autocapitalize: 'off'},
        showCancelButton: cancelButton,
        confirmButtonText: textConfirmBtn,
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          textInput=login;
        },
      }).then((result) => {
        resolve({result,textInput})
      })
    });
    
    return input
  }


}
