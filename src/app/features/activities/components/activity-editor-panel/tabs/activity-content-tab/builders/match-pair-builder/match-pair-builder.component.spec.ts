import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPairBuilderComponent } from './match-pair-builder.component';

describe('MatchPairBuilderComponent', () => {
  let component: MatchPairBuilderComponent;
  let fixture: ComponentFixture<MatchPairBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchPairBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchPairBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
