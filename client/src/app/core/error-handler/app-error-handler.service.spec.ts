import { TestBed } from '@angular/core/testing';
import { AppErrorHandler } from '@app/core/error-handler/app-error-handler.service';
import { NotificationService } from '@app/core';

describe('AppErrorHandler', () => {
  let appErrorHandler: AppErrorHandler;
  let notificationService: any;
  let errorHandler: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppErrorHandler,
        { provide: NotificationService, useValue: { error: jest.fn() } }
      ]
    });

    errorHandler = jest.fn();
    errorHandler.handleError = jest.fn();
    appErrorHandler = TestBed.get(AppErrorHandler);

    notificationService = TestBed.get(NotificationService);
    spyOn(notificationService, 'error');
  });

  it('should pass dev error to the notification service', () => {
    const error = new Error('error');
    appErrorHandler.handleError(error);

    expect(notificationService.error).toHaveBeenCalledWith(
      'An error occurred. See console for details.'
    );
  });

  it('should pass the error to the parent ErrorHandler', () => {
    const error = new Error('error');
    Object.setPrototypeOf(appErrorHandler, errorHandler);

    appErrorHandler.handleError(error);

    expect(errorHandler.handleError).toHaveBeenCalledWith(error);
  });
});
