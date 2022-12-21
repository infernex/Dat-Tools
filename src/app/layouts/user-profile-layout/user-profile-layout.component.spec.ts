import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileLayoutComponent } from './user-profile-layout.component';

describe('UserProfileLayoutComponent', () => {
  let component: UserProfileLayoutComponent;
  let fixture: ComponentFixture<UserProfileLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
