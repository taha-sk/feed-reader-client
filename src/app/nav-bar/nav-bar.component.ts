import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css'],
    standalone: false
})
export class NavBarComponent implements OnInit {

  isAdmin: boolean = this.setAdmin();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  setAdmin(){
    const admin = localStorage.getItem("admin");
    if(admin === "true"){
      return true;
    }
    return false;
  }

}
