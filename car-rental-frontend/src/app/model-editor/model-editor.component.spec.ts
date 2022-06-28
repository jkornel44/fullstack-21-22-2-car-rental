import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEditorComponent } from './model-editor.component';

xdescribe('ModelEditorComponent', () => {
  let component: ModelEditorComponent;
  let fixture: ComponentFixture<ModelEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
