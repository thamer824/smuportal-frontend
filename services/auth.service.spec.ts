import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoginComponent, RegisterComponent } from 'src/app/auth';


describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
