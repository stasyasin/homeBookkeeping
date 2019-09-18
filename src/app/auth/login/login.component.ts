import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/User.model';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(type: string, text: string) {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit(): void {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email).subscribe((user: User) => {
      if (user) {
        if (user.password === formData.password) {
          // logic auth here
        } else {
          this.showMessage('danger', 'Password invalid');
        }
      } else {
        this.showMessage('danger', 'lack of luck, no customer');
      }
    });
  }
}
