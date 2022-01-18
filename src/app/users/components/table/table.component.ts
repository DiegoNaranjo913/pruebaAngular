import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { PageEvent } from '@angular/material/paginator';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { ModalDetailComponent } from '../modal-detail/modal-detail.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'actions'];
  pagina: number = 0;
  length: number = 0;
  pageSize: number = 4;
  responsive: boolean = false;
  loading: boolean = true;
  dataSource: any = null;
  mensaje: string = "";
  @Output() editarFormulario = new EventEmitter<any>();
  @Output() mensaje2 = new EventEmitter<any>();
  @Input()
  set actualizar(element: User) {
    this.getUserService();
  }
  constructor(private _userService: UsersService, private _observer: BreakpointObserver, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserService();
  }

  ngAfterViewInit() {
    this._observer.observe(['(max-width: 1200px)']).subscribe((res) => {
      if (res.matches) {
        this.responsive = true;
        this.displayedColumns = ['id', 'first_name', 'last_name', 'actions'];
      } else {
        this.responsive = false;
        this.displayedColumns = ['id', 'first_name', 'last_name', 'email', 'actions'];
      }
    });
  }


  getUserService() {
    this._userService.getUsersServer(this.pagina + 1, this.pageSize).subscribe((resp: any) => {
      let arreglo: any[] = [];
      arreglo = resp.body;
      this.dataSource = arreglo.sort((a, b) => a.id - b.id);
      this.length = resp.headers.get('X-Total-Count');
    })
  }

  onPaginateChange(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.getUserService();
  }

  editar(element: any) {
    this.editarFormulario.emit({ ...element });
  }

  verDetalle(element: User) {
    this._dialog.open(ModalDetailComponent, {
      maxWidth: '500px',
      data: { ...element },
    });
  }

  eliminar(id: number) {
    this._userService.deleteUser(id).subscribe((res) => {
      this.mensaje2.emit('Se elimino el usuario');
      this.getUserService();
    });
  }
}
