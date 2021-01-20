import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { Member } from 'src/models/memeber.model';
import { Tool } from 'src/models/tool.model';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';
import { AuthentificationService } from 'src/services/authentification.service';


@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'name', 'createdDate', 'source', 'actions'];
  dataSource: Tool[] = [];

  constructor(private toolService: ToolService,
    private dialog: MatDialog, public authentificationService: AuthentificationService) {

  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private fetchDataSource(): void {
    this.toolService.getAllTools().then(data => this.dataSource = data);
  }

  onRemoveAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.toolService.removeToolById(id).then(() => this.fetchDataSource());
      }
    });
  }
}
