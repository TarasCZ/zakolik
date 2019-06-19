import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { NotificationService } from '../notifications/notification.service';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private notificationsService: NotificationService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    let displayMessage = 'An error occurred.';

    console.log(error);

    if (!environment.production) {
      displayMessage += ' See console for details.';
    } else {
      displayMessage += ' Please refresh the page.';
    }

    this.notificationsService.error(displayMessage);

    super.handleError(error);
  }
}
