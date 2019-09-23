import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthComponent} from './auth.component';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  declarations: [LoginComponent, RegistrationComponent, AuthComponent]
})
export class AuthModule {}
