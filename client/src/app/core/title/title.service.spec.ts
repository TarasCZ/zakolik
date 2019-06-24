import { TestBed } from '@angular/core/testing';
import { TitleService } from '@app/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('TitleService', () => {
  let titleService: TitleService;
  let translateServiceMock: any;
  let translateSerivce: any;
  let translatedValue: string;
  let title: any;

  beforeEach(() => {
    translatedValue = 'translated';
    translateServiceMock = {
      get: jest.fn(() => of(translatedValue))
    };

    TestBed.configureTestingModule({
      providers: [
        TitleService,
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: Title, useValue: { setTitle: jest.fn() } }
      ]
    });

    titleService = TestBed.get(TitleService);
    translateSerivce = TestBed.get(TranslateService);
    title = TestBed.get(Title);
  });

  it('should create component', () => {
    expect(titleService).toBeTruthy();
  });

  describe('when title is present in snapshot data', () => {
    it('should set title asynchronously', done => {
      const snapshot = { children: [], data: { title: 'title' } } as unknown;

      titleService.setTitle(snapshot as ActivatedRouteSnapshot);

      setTimeout(() => {
        expect(title.setTitle).toHaveBeenCalledWith('translated - Zakolik');
        done();
      });
    });

    it('should set title asynchronously even when stored deeply in snapshot', done => {
      const snapshot = {
        children: [
          {
            children: [{ children: [], data: { title: 'title' } }]
          }
        ]
      } as unknown;

      titleService.setTitle(snapshot as ActivatedRouteSnapshot);

      setTimeout(() => {
        expect(title.setTitle).toHaveBeenCalledWith('translated - Zakolik');
        done();
      });
    });

    it('should not set title if is the same as translated', done => {
      translatedValue = 'title';
      const snapshot = { children: [], data: { title: 'title' } } as unknown;

      titleService.setTitle(snapshot as ActivatedRouteSnapshot);

      setTimeout(() => {
        expect(title.setTitle).toHaveBeenCalledTimes(0);
        done();
      });
    });

    it('should use provided translate service instead default', done => {
      const lazyTranslateService = {
        get: jest.fn(() => of('translated'))
      } as unknown;
      const snapshot = { children: [], data: { title: 'title' } } as unknown;

      titleService.setTitle(
        snapshot as ActivatedRouteSnapshot,
        lazyTranslateService as TranslateService
      );

      setTimeout(() => {
        expect(title.setTitle).toHaveBeenCalledWith('translated - Zakolik');
        done();
      });
    });
  });

  it('should set title synchronously if not present', () => {
    const snapshot = { children: [], data: {} } as unknown;

    titleService.setTitle(snapshot as ActivatedRouteSnapshot);

    expect(title.setTitle).toHaveBeenCalledWith('Zakolik');
  });
});
