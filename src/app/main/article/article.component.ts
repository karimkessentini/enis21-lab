import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { Article } from 'src/models/article.model';
import { ArticleService } from 'src/services/article.service';
import { AuthentificationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  
  displayedColumns: string[] = ['id', 'titre', 'type', 'lien', 'createdDate', 'source','actions'];
  dataSource: Article[] = [];

  constructor(private articleService: ArticleService,
    private dialog: MatDialog,
    public authentificationService: AuthentificationService
    ) { }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private fetchDataSource(): void {
    this.articleService.getAllArticles().then(data => this.dataSource = data);
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
        this.articleService.removeArticleById(id).then(() => this.fetchDataSource());
      }
    });
  }

}
