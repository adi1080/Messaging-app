import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepliedMessagesComponent } from './replied-messages.component';

describe('RepliedMessagesComponent', () => {
  let component: RepliedMessagesComponent;
  let fixture: ComponentFixture<RepliedMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepliedMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepliedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
