import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  teamMembers = [
    {
      name: 'Ziad Ashraf'
    },  
    {
      name: 'Loaay Ahmed'
    },
    {
      name: 'Mahmoud Emad'
    },
    {
      name: 'Abdelrahman Mohamed'
    },
    {
      name: 'Zeinab Alaa'
    }
  ];

  ngOnInit(): void {
    this.animateStats();
  }

  private animateStats(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounting(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
  }

  private startCounting(element: HTMLElement): void {
    const target = +element.getAttribute('data-count')!;
    const duration = 2000; // ms
    const stepTime = 20; // ms
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      element.textContent = Math.floor(current).toString();
    }, stepTime);
  }
}