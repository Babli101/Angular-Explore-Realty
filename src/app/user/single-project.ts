import { Component, AfterViewInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core'; // <-- PLATFORM_ID comes from @angular/core
import { ActivatedRoute } from '@angular/router';
import { SubscribeService } from '../subscribe.service';
import { gsap } from 'gsap';


@Component({
  selector: 'app-single-project',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './single-project.html',
  styleUrls: ['./single-project.scss']
})
export class SingleProjectComponent implements AfterViewInit {
  project: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute, 
    private subscribeService: SubscribeService) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.subscribeService.getProjectById(projectId).subscribe(data => {
        this.project = data;
      });
    }
  }

 ngAfterViewInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.animateLines();
  }
}

private animateLines() {
  if (!isPlatformBrowser(this.platformId)) return; // extra safety
  const lines = document.querySelectorAll<HTMLElement>('.line');
  if (!lines.length) return;

  const tl = gsap.timeline({ repeat: -1 });
  const time = 0.9;
  const y = 100;

  tl.fromTo(
    lines,
    { opacity: 0, y: y },
    { opacity: 1, y: 0, duration: time, stagger: 2, ease: "circ.inOut" }
  );

  tl.to(
    lines,
    { opacity: 0, y: -y, duration: time, stagger: 2, ease: "circ.inOut", delay: time },
    1.3
  );
}

}
