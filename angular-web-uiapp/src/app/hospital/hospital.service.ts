import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private apiService:ApiService) { }

  getUserHospitals(){
    return this.apiService.query(`
    SELECT nn.hospital_id AS id, H.name 
    FROM nn_user_hospital_relationship AS nn
    LEFT JOIN hospital AS H ON H.id = nn.hospital_id
    WHERE user_id = '${this.apiService.userId}'
    GROUP BY  nn.hospital_id, name
    `);
  }
}
