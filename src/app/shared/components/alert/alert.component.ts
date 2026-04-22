import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css',
    standalone: false
})
export class AlertComponent {
    @Input() message: string = '';
    @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
    @Input() dismissible: boolean = true;
    @Input() visible: boolean = true;

    get alertClass(): string {
        const base = 'p-4 rounded-lg';
        switch (this.type) {
            case 'success': return `${base} bg-green-50 border border-green-300`;
            case 'error': return `${base} bg-red-50 border border-red-300`;
            case 'warning': return `${base} bg-yellow-50 border border-yellow-300`;
            default: return `${base} bg-blue-50 border border-blue-300`;
        }
    }

    get textClass(): string {
        switch (this.type) {
            case 'success': return 'text-green-800 dark:text-green-300';
            case 'error': return 'text-red-800 dark:text-red-300';
            case 'warning': return 'text-yellow-800 dark:text-yellow-300';
            default: return 'text-blue-800 dark:text-blue-300';
        }
    }

    get iconPath(): string {
        switch (this.type) {
            case 'success': return 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 3a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1Z';
            case 'error': return 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm1 5a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Z';
            case 'warning': return 'M8.257 3.099c.765 1.36 2.722 1.36 3.486 0l8.14 14.064c.765 1.36-.212 2.837-1.743 2.837H1.543C.212 19.866-.765 18.389.001 17.029l8.256-14.93ZM12 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm1 4a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1Z';
            default: return 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z';
        }
    }

    get iconColor(): string {
        switch (this.type) {
            case 'success': return 'text-green-500 dark:text-green-400';
            case 'error': return 'text-red-500 dark:text-red-400';
            case 'warning': return 'text-yellow-500 dark:text-yellow-400';
            default: return 'text-blue-500 dark:text-blue-400';
        }
    }

    close(): void {
        this.visible = false;
    }
}