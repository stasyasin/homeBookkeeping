import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/User.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params.nowCanLogin) {
        this.showMessage({type: 'success', text: 'Now you can login'});
      }
    });
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit(): void {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email).subscribe((user: User) => {
      if (user) {
        if (user.password === formData.password) {
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
          // this.router.navigate(['']);
        } else {
          this.showMessage({type: 'danger', text: 'Password invalid'});
        }
      } else {
        this.showMessage({type: 'danger', text: 'lack of luck, no customer'});
      }
    });
  }
}
