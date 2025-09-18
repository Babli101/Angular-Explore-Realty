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
  projectName: string = '';
  price: string = '';
  location: string = '';
   imageFile!: File;  

  constructor(private subscribeService: SubscribeService) {}

  // ✅ file select handler
  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }
  onAddProject() {
    this.subscribeService.addProject(
      this.projectName,
      this.price,
      this.location,
      this.imageFile 
    ).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert('✅ Project added!');
          this.projectName = '';
          this.price = '';
          this.location = '';
          this.imageFile = undefined as any;
        } else {
          alert('❌ Something went wrong');
        }
      },
      error: (err) => {
        console.error(err);
        alert('❌ Server error');
      }
    });
  }
}
