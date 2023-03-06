import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss'],
})
export class FooterComponent implements OnInit {
  language = 'en';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  setLanguage(language: string): void {
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
  }
}
