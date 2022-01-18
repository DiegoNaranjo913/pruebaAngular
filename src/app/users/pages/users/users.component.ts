import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userSelected!: User;
  userChange!: User;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  actualizarTabla(element: User) {
    this.userChange = element;
  }


  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 1000
    });
  }

  editar(element: User) {
    this.userSelected = element;
  }





}
