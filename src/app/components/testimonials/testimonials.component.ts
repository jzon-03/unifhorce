import { Component, OnInit } from '@angular/core';
import { TestimonialsService, Testimonial } from '../../services/testimonials.service';

@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrl: './testimonials.component.scss',
    standalone: false
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];
  loading = true;
  error: string | null = null;

  constructor(private testimonialsService: TestimonialsService) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.loading = true;
    this.error = null;
    
    this.testimonialsService.getTestimonials().subscribe({
      next: (testimonials) => {
        this.testimonials = testimonials;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading testimonials:', err);
        this.error = 'Failed to load testimonials. Please try again later.';
        this.loading = false;
      }
    });
  }

  trackByTestimonial(index: number, testimonial: Testimonial): string {
    return testimonial.name + testimonial.hospital;
  }
}
