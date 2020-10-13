import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private _userService: UserService) { }

  userToCreate: any = {};
  private emailValido = '^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$';

  registerUsersForm = this.formBuilder.group({
    identificationNumber: ['', { validators: [Validators.required] }],
    firstName: ['', { validators: [Validators.required] }],
    lastName: ['', { validators: [Validators.required] }],
    address: ['', { validators: [Validators.required] }],
    birthdate: ['', { validators: [Validators.required] }],
    phone: ['', { validators: [Validators.required] }],
    email: ['', { validators: [Validators.required, Validators.pattern(this.emailValido)] }],
    username: ['', { validators: [Validators.required] }],
    password: ['', { validators: [Validators.required] }]
  });

  ngOnInit() {
  }

  createUser() {
    if (this.registerUsersForm.invalid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }

    this.userToCreate.cedula = this.registerUsersForm.get('identificationNumber').value;
    this.userToCreate.nombres = this.registerUsersForm.get('firstName').value;
    this.userToCreate.apellidos = this.registerUsersForm.get('lastName').value;
    this.userToCreate.direccion = this.registerUsersForm.get('address').value;
    this.userToCreate.fechaNacimiento = this.registerUsersForm.get('birthdate').value;
    this.userToCreate.telefono = this.registerUsersForm.get('phone').value;
    this.userToCreate.email = this.registerUsersForm.get('email').value;
    this.userToCreate.username = this.registerUsersForm.get('username').value;
    this.userToCreate.password = this.registerUsersForm.get('password').value;

    this._userService.createUser(this.userToCreate).subscribe();

    // console.log(this.registerUsersForm.value);
  }

  getMensajeError(field: string): string {
    let mensaje: string;

    if (this.registerUsersForm.get(field).errors.required) {
      mensaje = 'El campo es requerido';
    } else if (this.registerUsersForm.get(field).hasError('pattern')) {
      mensaje = 'Ingrese un valor válido';
    }

    return mensaje;
  }

  verificarCampo(field: string): boolean {
    return ((this.registerUsersForm.get(field).dirty || this.registerUsersForm.get(field).touched) &&
      !this.registerUsersForm.get(field).valid);
  }

}
