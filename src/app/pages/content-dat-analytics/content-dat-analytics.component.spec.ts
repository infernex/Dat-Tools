import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDatAnalyticsComponent } from './content-dat-analytics.component';

describe('ContentDatAnalyticsComponent', () => {
  let component: ContentDatAnalyticsComponent;
  let fixture: ComponentFixture<ContentDatAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDatAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDatAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
