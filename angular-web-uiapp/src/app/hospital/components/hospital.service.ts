import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { pathToFileURL } from 'url';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class HospitalService {
  backendUrl:string = ''

  

  constructor(
    private apiService:ApiService
  ) {
   
  }

  getHospitalList():Observable< any[]>{
    return this.apiService.query(`
    SELECT nn.hospital_id AS id, H.name 
    FROM nn_user_hospital_relationship AS nn
    LEFT JOIN hospital AS H ON H.id = nn.hospital_id
    WHERE user_id = '${this.apiService.userId}'
    GROUP BY  nn.hospital_id, name
    `);
  }

}
