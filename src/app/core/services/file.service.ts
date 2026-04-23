import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private url: string = "https://api.cloudinary.com/v1_1/dnx8n0vfe/image/upload";
  constructor(private httpClient: HttpClient) { }


  uploadFile(file: FormData, preset: string): Promise<{ url: string } | undefined> {
    return this.httpClient.post<{ url: string }>(`${this.url}?upload_preset=${preset}`, file).toPromise();
  }
}
