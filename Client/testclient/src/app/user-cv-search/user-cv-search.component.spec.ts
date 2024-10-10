import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCvSearchComponent } from './user-cv-search.component';

describe('UserCvSearchComponent', () => {
  let component: UserCvSearchComponent;
  let fixture: ComponentFixture<UserCvSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCvSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCvSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
