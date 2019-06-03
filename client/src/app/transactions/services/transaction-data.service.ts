import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Transaction} from '@app/transactions/store/transaction.model';
import {HttpClient} from '@angular/common/http';

const LOCAL_API_URL = 'localhost:4000';

@Injectable()
export class TransactionDataService {
  constructor(private readonly http: HttpClient) {
  }

  getAllTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(`${LOCAL_API_URL}/transactions`)
  }
}
