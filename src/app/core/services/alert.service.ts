import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) {}

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 3000): void {
    const config = { timeOut: duration, positionClass: 'toast-bottom-right' };
    switch (type) {
      case 'success': this.toastr.success(message, '', config); break;
      case 'error': this.toastr.error(message, '', config); break;
      case 'warning': this.toastr.warning(message, '', config); break;
      case 'info': this.toastr.info(message, '', config); break;
    }
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  clear(): void {
    this.toastr.clear();
  }
}