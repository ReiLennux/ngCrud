import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component} from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent {
  title = 'Angular 15 CRUD';
  showNavbar = true;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.route.root;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        this.showNavbar = currentRoute.snapshot.data['hideNavbar'];
      });
  }

}
