import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeService, Project } from '../subscribe.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
    selector: 'app-get-project',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './get-project.html',
    styleUrls: ['./get-project.scss']
})
export class GetProject implements OnInit {
    projects: Project[] = [];
    loading = true;

    constructor(private subscribeService: SubscribeService) { }

    ngOnInit(): void {
        this.fetchProjects();
    }

    // 🧩 Fetch all projects
    fetchProjects(): void {
        this.subscribeService.getProjects().subscribe({
            next: (res: Project[]) => {
                console.log('Full response:', res); // Check gallery structure
                this.projects = Array.isArray(res) ? res : [];
                this.loading = false;
            },
            error: (err) => {
                console.error('❌ Error fetching projects:', err);
                this.loading = false;
            }
        });
    }

    // 🖼️ Handle image path safely
    getImage(project: Project): string {
        if (!project.gallery || !project.gallery.length) return 'assets/no-image.jpg';

        const firstImage: any = project.gallery[0]; // ✅ cast to any to avoid TS errors

        let imagePath = '';

        if (typeof firstImage === 'string') {
            imagePath = firstImage; // gallery is array of strings
        } else if (firstImage.url) {
            if (typeof firstImage.url === 'string') {
                imagePath = firstImage.url; // url is string
            } else if (typeof firstImage.url === 'object' && firstImage.url.path) {
                imagePath = firstImage.url.path; // url is object with path
            }
        } else if (firstImage.filename) {
            imagePath = firstImage.filename; // fallback
        }

        if (!imagePath) return 'assets/no-image.jpg';

        // Prepend backend address if not full URL
        return imagePath.startsWith('http') ? imagePath : `http://localhost:3000/${imagePath.replace(/\\/g, '/')}`;
    }



    // 💰 Compute price dynamically
    getPrice(project: Project): string {
        if (project.category === 'residential') {
            return project.priceFrom || project.price1bhk || project.price2bhk || 'N/A';
        } else if (project.category === 'commercial') {
            return project.retailPrice || project.officePrice || 'N/A';
        }
        return 'N/A';
    }

}
