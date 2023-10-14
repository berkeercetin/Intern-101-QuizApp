import { Injectable } from '@angular/core';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private auth:AuthService) { }

  
}
