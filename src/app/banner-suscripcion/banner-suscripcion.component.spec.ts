import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSuscripcionComponent } from './banner-suscripcion.component';

describe('BannerSuscripcionComponent', () => {
  let component: BannerSuscripcionComponent;
  let fixture: ComponentFixture<BannerSuscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerSuscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
