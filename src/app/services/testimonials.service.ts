import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Testimonial {
  name: string;
  title: string;
  hospital: string;
  locationFrom: string;
  locationTo: string;
  quote: string;
  initials: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  private csvUrl = 'assets/data/testimonials.csv';

  constructor(private http: HttpClient) {}

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      map(csvData => this.parseCSV(csvData))
    );
  }

  private parseCSV(csvData: string): Testimonial[] {
    const lines = csvData.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(header => header.trim());
    const testimonials: Testimonial[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      if (values.length === headers.length) {
        const testimonial: Testimonial = {
          name: values[0],
          title: values[1],
          hospital: values[2],
          locationFrom: values[3],
          locationTo: values[4],
          quote: values[5],
          initials: values[6]
        };
        testimonials.push(testimonial);
      }
    }

    return testimonials;
  }

  private parseCSVLine(line: string): string[] {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Handle escaped quotes
          current += '"';
          i++; // Skip the next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last field
    result.push(current.trim());
    
    return result;
  }

  // Method to add a new testimonial (for future admin functionality)
  addTestimonial(testimonial: Testimonial): string {
    const csvLine = `${testimonial.name},${testimonial.title},${testimonial.hospital},${testimonial.locationFrom},${testimonial.locationTo},"${testimonial.quote}",${testimonial.initials}`;
    return csvLine;
  }

  // Method to validate testimonial data
  validateTestimonial(testimonial: Partial<Testimonial>): boolean {
    return !!(
      testimonial.name && 
      testimonial.title && 
      testimonial.hospital && 
      testimonial.locationFrom && 
      testimonial.locationTo && 
      testimonial.quote && 
      testimonial.initials
    );
  }
}