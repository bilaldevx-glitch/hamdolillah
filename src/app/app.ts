import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

type Stat = {
  label: string;
  value: number;
  unit?: string;
  delta: number;
  trend: 'up' | 'down' | 'flat';
};

type Ticker = {
  symbol: string;
  price: number;
  change: number;
  trend: 'up' | 'down' | 'flat';
};

type Activity = {
  label: string;
  time: string;
  tone?: 'info' | 'success' | 'warn';
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  activeSection = 'Dashboard';
  lastAction = 'System idle — awaiting command.';
  pulseCount = 0;

  stats: Stat[] = [
    { label: 'Energy', value: 84290, delta: 12.4, trend: 'up' },
    { label: 'Active Nodes', value: 12480, delta: 5.1, trend: 'up' },
    { label: 'Alerts', value: 1240, delta: -2.3, trend: 'down' },
    { label: 'Conversion', value: 3.9, unit: '%', delta: 0.4, trend: 'up' }
  ];

  tickers: Ticker[] = [
    { symbol: 'NEO', price: 428.12, change: 1.24, trend: 'up' },
    { symbol: 'LUX', price: 91.48, change: -0.32, trend: 'down' },
    { symbol: 'PRISM', price: 238.03, change: 0.14, trend: 'up' },
    { symbol: 'VOLT', price: 61.29, change: 0.0, trend: 'flat' },
    { symbol: 'ORBIT', price: 129.77, change: -0.85, trend: 'down' }
  ];

  activity: Activity[] = [
    { label: 'New pulse detected', time: '2m', tone: 'success' },
    { label: 'Voltage spike resolved', time: '10m', tone: 'warn' },
    { label: 'System sync complete', time: '1h', tone: 'info' },
    { label: 'Quantum ping delivered', time: '3h', tone: 'info' }
  ];

  missions = [
    { project: 'Aurora UI', status: 'On Track', owner: 'Amina', due: 'Feb 20' },
    { project: 'Photon App', status: 'At Risk', owner: 'Yassine', due: 'Mar 12' },
    { project: 'Neon API', status: 'On Track', owner: 'Sara', due: 'Mar 28' }
  ];

  private timer?: number;

  ngOnInit(): void {
    this.timer = window.setInterval(() => this.simulateLiveData(), 1800);
  }

  ngOnDestroy(): void {
    if (this.timer) window.clearInterval(this.timer);
  }

  selectSection(section: string) {
    this.activeSection = section;
    this.setAction(`Switched to ${section}.`);
  }

  triggerPulse() {
    this.pulseCount += 1;
    this.setAction('Pulse broadcast initiated.');
    this.pushActivity('Pulse broadcasted', 'success');
  }

  launchScan() {
    this.setAction('Neural scan launched.');
    this.pushActivity('Neural scan running', 'info');
  }

  syncNodes() {
    this.setAction('Node sync scheduled.');
    this.pushActivity('Node sync queued', 'info');
  }

  generateReport() {
    this.setAction('Report compiled and shared.');
    this.pushActivity('Report compiled', 'success');
  }

  viewAll() {
    this.setAction('Opened full mission log.');
    this.pushActivity('Mission log opened', 'info');
  }

  private setAction(message: string) {
    this.lastAction = message;
  }

  private pushActivity(label: string, tone: Activity['tone'] = 'info') {
    const time = 'just now';
    this.activity = [{ label, time, tone }, ...this.activity].slice(0, 6);
  }

  private simulateLiveData() {
    this.stats = this.stats.map((stat) => {
      const drift = stat.unit === '%' ? this.rand(-0.2, 0.3) : this.rand(-240, 260);
      const nextValue = Math.max(0, +(stat.value + drift).toFixed(2));
      const delta = +(stat.delta + this.rand(-0.4, 0.5)).toFixed(2);
      const trend = delta === 0 ? 'flat' : delta > 0 ? 'up' : 'down';
      return { ...stat, value: nextValue, delta, trend };
    });

    this.tickers = this.tickers.map((ticker) => {
      const change = +this.rand(-1.8, 1.9).toFixed(2);
      const price = +(ticker.price + change).toFixed(2);
      const trend = change === 0 ? 'flat' : change > 0 ? 'up' : 'down';
      return { ...ticker, price, change, trend };
    });

    const beats = [
      'Liquidity spike detected',
      'Market pulse stabilised',
      'Arb signal confirmed',
      'Latency drop: 12ms',
      'Trade burst from sector 7'
    ];
    if (Math.random() > 0.4) {
      this.pushActivity(beats[Math.floor(Math.random() * beats.length)], 'info');
    }
  }

  private rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
