import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/auth/login.dto';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginResponse } from '../../responses/users/login.response';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
  ) {
    this.phoneNumber = '';
    this.password = '';
  }

  onChangePhoneNumber() {
    // console.log(this.phoneNumber);
  }

  onLogin() {
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
    };

    console.log(loginDTO);

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        console.log(response);
        this.tokenService.setToken(response.token);
        this.router.navigate(['/']);
      },
      complete: () => {
        console.log('Register complete');
      },
      error: (error) => {
        console.error('Register failed:', error);
      },
    });
  }
}
