import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCirclePlus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Model } from '../core/model';
import { ModelService } from '../core/model.service';

@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.css']
})
export class ModelEditorComponent implements OnInit {
  modelForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    brand: ''
  });

  faCirclePlus = faCirclePlus;
  faPlus = faPlus;
  brandId: any;
  model: Model;
  error: any;

  constructor(
    private fb: FormBuilder,
    private modelService: ModelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.error = null;
    this.model = {} as Model;
    this.brandId = this.route.snapshot.paramMap.get('brandId');

    console.log(this.route.snapshot.paramMap.get('brandId'))
  }

  get name(): FormControl {
    return this.modelForm.get('name') as FormControl;
  }

  async ngOnInit(): Promise<void> {}

  async submit() {
    if (!this.modelForm.valid) {
      return;
    }

    this.modelForm.patchValue({
      brand: { id: this.brandId }
    });

    console.log(this.modelForm.value)

    await this.modelService.createModel(this.modelForm.value as Model).then(() => {
      this.router.navigateByUrl('/brands');
    }).catch((resp) => {
      this.error = resp.error.message;
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/brands');
  }
}

