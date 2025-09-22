import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SubscribeService } from '../subscribe.service';

@Component({
  selector: 'app-project',
  standalone: true,
   imports: [CommonModule],  
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
   projects: any[] = [];

  constructor(private subscribeService: SubscribeService) {}

  ngOnInit(): void {
    this.subscribeService.getProjects().subscribe(data => this.projects = data);
  }

  openProject(location: string) {
    // Open gygy.html from assets/projects/<location>/gygy.html
    window.open(`/src/app/user/projects/${location}`, '_blank');
  }
}