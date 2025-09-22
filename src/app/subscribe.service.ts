import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

    private subscribeUrl = 'http://localhost:3000/api/subscribe';
  private contactUrl = 'http://localhost:3000/api/contact';
  private apiUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) {}

  // 📩 For subscribing email
  subscribe(email: string): Observable<any> {
    return this.http.post<any>(this.subscribeUrl, { email });
  }

  // 📞 For submitting contact form
  submitContact(data: any): Observable<any> {
    return this.http.post<any>(this.contactUrl, data);
  }

  // 🏗 For adding a project
  addProject(
    projectName: string,
    price: string,
    projectType: string,
    category: string,
    imageFile: File,
    htmlFile: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('price', price);
    formData.append('projectType', projectType);
    formData.append('category', category);
    formData.append('image', imageFile);
    formData.append('htmlFile', htmlFile);

    return this.http.post(this.apiUrl, formData);
  }

  // Optional: get all projects
  getProjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
