import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/auth/register.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  phone: string;
  password: string;
  retypePassword: string;
  passwordMatch: boolean;
  fullName: String;
  address: string;
  isAccep: boolean;
  dateOfBirth: Date;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.phone = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccep = false;
    this.passwordMatch = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneChange() {
    // console.log('Phone number changed:', this.phone);
  }

  register() {
    const registerDTO: RegisterDTO = {
      fullname: this.fullName,
      phone_number: this.phone,
      address: this.address,
      password: this.password,
      retype_password: this.retypePassword,
      date_of_birth: this.dateOfBirth,
      facebook_account_id: 0,
      google_account_id: 0,
      role_id: 1, // role 2 của user; role 1 cua admin
    };
    console.log(registerDTO);

    //  goi service gui data sang backend
    this.userService.register(registerDTO).subscribe({
      next: (data) => {
        console.log('Register successful:', data);
        this.router.navigate(['/login']);
      },
      complete: () => {
        console.log('Register complete');
      },
      error: (error) => {
        console.error('Register failed:', error);
      },
    });
  }

  // Nếu mà retyePass khác với Pass thí trả về thêm 1 giá trị là passwordMismatch cho form registerForm
  checkPasswordMatch() {
    this.passwordMatch = this.password !== this.retypePassword;
  }

  unableRegisterBtn() {}
}
