import { Component, OnInit } from '@angular/core';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  faTriangleExclamation = faTriangleExclamation;

  constructor() { }

  ngOnInit(): void {
  }

}
