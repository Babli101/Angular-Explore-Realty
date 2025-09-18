import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchResults: any[] = [];
  searched = false; // to track if search has been done once

  allProperties = [
    { city: 'Delhi', type: 'Buy', price: 120000 },
    { city: 'Delhi', type: 'Rent', price: 40000 },
    { city: 'Mumbai', type: 'Commercial', price: 250000 },
    { city: 'Mumbai', type: 'Buy', price: 200000 },
  ];

  searchProperties(form: NgForm) {
    this.searched = true; // mark that user searched

    const { city, listingType, minPrice, maxPrice } = form.value;
    const min = +minPrice || 0;
    const max = +maxPrice || Number.MAX_SAFE_INTEGER;

    this.searchResults = this.allProperties.filter((property) => {
      return (
        (!city || property.city === city) &&
        (!listingType || property.type === listingType) &&
        property.price >= min &&
        property.price <= max
      );
    });
  }
}