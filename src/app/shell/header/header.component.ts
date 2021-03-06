import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { I18nService } from '@app/core';
import { Subject, interval } from 'rxjs';
import { map, take, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  count: number;
  messages: string[] = [];
  requestCancelled: boolean;
  private _success: Subject<string[]>;
  constructor(private i18nService: I18nService, private router: Router) {}

  ngOnInit() {
    this.initializeSubject();
  }

  initializeSubject() {
    this._success = new Subject<string[]>();
    this._success.subscribe(_messages => {
      this.messages = _messages;
    });
  }

  public cancel() {
    this.messages = [];
    this.requestCancelled = true;
    this.count = 10;
  }

  public changeSuccessMessage() {
    const msgs = [
      'this is not a carefully manicured Github account',
      'it demonstrates the progress I have made in a short period of time',
      'You will be redirected to my github page in',
      ' seconds'
    ];

    this._success.next(msgs);
    const count = 10;

    interval(1000)
      .pipe(
        take(count),
        map(i => count - i - 1),
        startWith(count)
      )
      .subscribe(x => {
        this.count = x;
        if (this.count === 0 && !this.requestCancelled) {
          window.location.href = 'https://github.com/danmcmanus';
        }
      });
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
}
