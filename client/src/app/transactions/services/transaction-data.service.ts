import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '@app/transactions/model/transaction.model';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';

@Injectable()
export class TransactionDataService {
  constructor(private readonly http: HttpClient) {}

  getAllTransactions(): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(`${env.apiUrl}/transactions`);
  }

  postTransaction(transaction: Transaction): Observable<any> {
    return this.http.post(`${env.apiUrl}/transactions`, transaction);
  }

  deleteTransaction(id: string): Observable<any> {
    return this.http.delete(`${env.apiUrl}/transactions/${id}`);
  }
}
