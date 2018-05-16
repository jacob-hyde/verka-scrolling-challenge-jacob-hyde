import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinityScrollingComponent } from './infinity-scrolling.component';

describe('InfinityScrollingComponent', () => {
  let component: InfinityScrollingComponent;
  let fixture: ComponentFixture<InfinityScrollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfinityScrollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinityScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
