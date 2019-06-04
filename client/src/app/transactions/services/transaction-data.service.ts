import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Transaction} from '@app/transactions/store/transaction.model';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

const LOCAL_API_URL = 'http://localhost:4000';

@Injectable()
export class TransactionDataService {
  constructor(private readonly http: HttpClient) {
  }

  getAllTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(`${LOCAL_API_URL}/transactions`)
  }

  postTransaction(transaction: Transaction): Observable<any> {
    return this.http.post(`${LOCAL_API_URL}/transactions`, transaction)
  }

  deleteTransaction(id: string): Observable<any> {
    return this.http.delete(`${LOCAL_API_URL}/transactions/${id}`)
  }
}
