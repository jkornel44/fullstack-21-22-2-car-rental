import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCirclePlus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from '../core/brand';
import { LocationService } from '../core/locarion.service';
import { Location } from '../core/location';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-location-editor',
  templateUrl: './location-editor.component.html',
  styleUrls: ['./location-editor.component.css']
})
export class LocationEditorComponent implements OnInit {
  @Input() location: Location;

  locationForm: FormGroup = this.fb.group({
    name:  ['', Validators.required],
    postal_code: ['', [Validators.required, Validators.max(9999), Validators.min(1000)]],
    city: ['', Validators.required],
    street: ['', Validators.required],
    street_type: ['', Validators.required],
    house_no: ['', Validators.required],
  });

  faCirclePlus = faCirclePlus;
  faPlus = faPlus;
  error: any;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private router: Router,
  ) {
    this.error = null;
    this.location = {} as Location;
  }

  get name(): FormControl {
    return this.locationForm.get('name') as FormControl;
  }

  get postal_code(): FormControl {
    return this.locationForm.get('postal_code') as FormControl;
  }

  get city(): FormControl {
    return this.locationForm.get('city') as FormControl;
  }

  get street(): FormControl {
    return this.locationForm.get('street') as FormControl;
  }

  get street_type(): FormControl {
    return this.locationForm.get('street_type') as FormControl;
  }

  get house_no(): FormControl {
    return this.locationForm.get('house_no') as FormControl;
  }

  async ngOnInit(): Promise<void> {
  }

  async submit() {
    if (!this.locationForm.valid) {
      return;
    }

    await this.locationService.createLocation(this.locationForm.value as Location).then(() => {
      this.router.navigateByUrl('/locations');
    }).catch((resp) => {
      this.error = resp.error.message;
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/locations');
  }
}
