import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubscribeService } from '../subscribe.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  projectName = '';
  price = '';
  projectType = '';
  category = '';
  imageFile!: File;
  htmlFile!: File;

   // ✅ Add these arrays for dropdowns
  projectTypes = ['Residential', 'Commercial'];
  categories = ['All', 'Newly Launched', 'Trending', 'Upcoming'];
  
  constructor(private subscribeService: SubscribeService) {}

  onImageSelected(event: any) { this.imageFile = event.target.files[0]; }
  onHtmlSelected(event: any) { this.htmlFile = event.target.files[0]; }

  onAddProject() {
    this.subscribeService.addProject(
      this.projectName,
      this.price,
      this.projectType,
      this.category,
      this.imageFile,
      this.htmlFile
    ).subscribe({
      next: (res) => {
        if (res.success) {
          alert('✅ Project added!');
          this.projectName = '';
          this.price = '';
          this.projectType = '';
          this.category = '';
          this.imageFile = undefined as any;
          this.htmlFile = undefined as any;
        } else alert('❌ Something went wrong');
      },
      error: (err) => { console.error(err); alert('❌ Server error'); }
    });
  }
}
