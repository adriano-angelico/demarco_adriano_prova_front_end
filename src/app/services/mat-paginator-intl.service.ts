import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MatPaginationIntlService extends MatPaginatorIntl {
  constructor(private translateService: TranslateService) {
    super();

    // React whenever the language is changed
    this.translateService.onLangChange.subscribe((_event: Event) => {
      this.translateLabels();
    });

    // Initialize the translations once at construction time
    this.translateLabels();
  }

  override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ): string => {
    const of = this.translateService
      ? this.translateService.instant('PAGINATOR.MAT_PAGINATOR.OF')
      : 'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex =
      page * pageSize > length
        ? (Math.ceil(length / pageSize) - 1) * pageSize
        : page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  injectTranslateService(translate: TranslateService): void {
    this.translateService = translate;

    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels(): void {
    this.firstPageLabel = this.translateService.instant(
      'PAGINATOR.MAT_PAGINATOR.FIRST_PAGE'
    );
    this.itemsPerPageLabel = this.translateService.instant(
      'PAGINATOR.MAT_PAGINATOR.ITEMS_PER_PAGE'
    );
    this.lastPageLabel = this.translateService.instant(
      'PAGINATOR.MAT_PAGINATOR.LAST_PAGE'
    );
    this.nextPageLabel = this.translateService.instant(
      'PAGINATOR.MAT_PAGINATOR.NEXT_PAGE'
    );
    this.previousPageLabel = this.translateService.instant(
      'PAGINATOR.MAT_PAGINATOR.PREVIOUS_PAGE'
    );
    this.changes.next();
  }
}
