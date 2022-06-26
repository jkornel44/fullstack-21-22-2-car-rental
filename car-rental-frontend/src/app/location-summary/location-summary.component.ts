import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faXmark, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { Location } from '../core/location';

@Component({
  selector: 'app-location-summary',
  templateUrl: './location-summary.component.html',
  styleUrls: ['./location-summary.component.css']
})
export class LocationSummaryComponent implements OnInit {

  @Input() location!: Location;
  @Input() isModalOpen!: Boolean;

  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  faXmark = faXmark;
  faLocationPin = faLocationPin;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeModal.emit();
  }

}
