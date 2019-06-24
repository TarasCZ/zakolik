import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private notificationsService: NotificationService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    let displayMessage = 'An error occurred.';

    if (!environment.production) {
      displayMessage += ' See console for details.';
    } else {
      displayMessage += ' Please refresh the page.';
    }

    console.log(error); // errors won't show anymore

    this.notificationsService.error(displayMessage);

    super.handleError(error);
  }
}
