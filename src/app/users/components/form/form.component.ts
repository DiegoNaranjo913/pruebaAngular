import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  miFormulario: FormGroup = this._fb.group({
    id: [''],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    avatar: [''],
  })

  @Input()
  set myForm(element: User) {
    this.miFormulario.setValue(element);
  }
  @Output() mensaje = new EventEmitter<any>();
  @Output() actualizar = new EventEmitter<any>();

  constructor(private _userService: UsersService, private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  limpiarForm() {
    this.miFormulario.reset();
  }

  updateUser() {
    this._userService.updateUser(this.miFormulario.value).subscribe((res) => {
      this.refrescarForm('Se actualizo el usuario');
    })
  }

  createUser() {
    if (this.miFormulario.get('id')?.value !== '' && this.miFormulario.get('id')?.value !== null) {
      this.updateUser();
      return;
    }
    this._userService.createUser(this.miFormulario.value).subscribe((res) => {
      this.refrescarForm('Se creo el usuario');
    });
  }

  refrescarForm(mensaje: string) {
    this.mensaje.emit(mensaje);
    this.actualizar.emit(this.miFormulario.value);
    this.limpiarForm();
  }



}
