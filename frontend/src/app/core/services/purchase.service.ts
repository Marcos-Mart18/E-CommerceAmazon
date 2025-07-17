import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SavePurchaseDto } from '../../shared/models/save-purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private readonly http=inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/purchase';

  save(savePurchaseDto: SavePurchaseDto): Observable<{message: string}>{
    return this.http.post<{message:string}>(`${this.baseUrl}/save`,savePurchaseDto);
  }
}
