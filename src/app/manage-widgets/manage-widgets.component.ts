import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAndOutAnimations } from './router-animations';

@Component({
  selector: 'app-manage-widgets',
  templateUrl: './manage-widgets.component.html',
  styleUrls: ['./manage-widgets.component.css'],
  animations: [
    slideInAndOutAnimations
  ]
})
export class ManageWidgetsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
