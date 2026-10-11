import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Empleados } from './empleados';

describe('Empleados', () => {
  let component: Empleados;
  let fixture: ComponentFixture<Empleados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Empleados],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Empleados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
