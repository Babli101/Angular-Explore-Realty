// src/app/subscribe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// -----------------------------
// Project Interfaces
// -----------------------------
export interface GalleryItem {
  url?: string;
  filename: string;
}

export interface Project {
  _id?: string;
  name: string;
  category?: 'residential' | 'commercial';
  gallery?: GalleryItem[];
  brochure?: GalleryItem;
  price1bhk?: string;
  price2bhk?: string;
  price3bhk?: string;
  price4bhk?: string;
  retailPrice?: string;
  officePrice?: string;
  priceFrom?: string;
  developer?: string;
  rera?: string;
  size?: string;
  status?: 'trending' | 'upcoming' | 'newlyLaunched';
  description?: string;
  amenities?: string[];
  location?: {
    main?: string;
    location1?: string;
    location2?: string;
    location3?: string;
    location4?: string;
    location5?: string;
    mapEmbed?: string;
  };
  possession?: string;
  createdAt?: string;
}
// -----------------------------
// Service
// -----------------------------
@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private subscribeUrl = 'http://localhost:3000/api/subscribe';
  private contactUrl = 'http://localhost:3000/api/contact';
  private apiUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) {}

  // 📩 Subscribe email
  subscribe(email: string): Observable<any> {
    return this.http.post<any>(this.subscribeUrl, { email });
  }

  // 📞 Submit contact form
  submitContact(data: any): Observable<any> {
    return this.http.post<any>(this.contactUrl, data);
  }

  // 🏗️ Add project with images & brochure
  addProject(projectData: any, images: FileList | null, brochure: File | null): Observable<Project> {
    const formData = new FormData();

    // Append project fields
    Object.entries(projectData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    // Append gallery images
    if (images) {
      Array.from(images).forEach(file => formData.append('gallery', file));
    }

    // Append brochure file
    if (brochure) {
      formData.append('brochure', brochure);
    }

    return this.http.post<Project>(this.apiUrl, formData);
  }

  // 🔍 Post project using FormData directly
  postProject(formData: FormData): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, formData);
  }

  // 🔍 Get all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // 🔍 Get single project by ID
  getProjectById(id: string): Observable<{ success: boolean; project: Project }> {
  return this.http.get<{ success: boolean; project: Project }>(`${this.apiUrl}/${id}`);
}
}
