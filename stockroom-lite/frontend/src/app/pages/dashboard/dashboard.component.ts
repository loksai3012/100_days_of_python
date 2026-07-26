import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { DashboardStats } from '../../models/types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats?: DashboardStats;

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.get<DashboardStats>('/dashboard').subscribe((res) => {
      this.stats = res.data;
    });
  }
}
