import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiUrlService {

    get apiUrl(): string {
        return environment.apiUrl;
    }

}
