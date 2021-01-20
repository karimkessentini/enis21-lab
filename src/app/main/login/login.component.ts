import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  error: string;

  constructor(private authentificationService: AuthentificationService, private route: Router) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.authentificationService.login(this.form.get('login').value, this.form.get('password').value).then(user => {
        this.route.navigate(['dashboard']);
      }).catch(error => {
        this.error = error;
      });
    }
  }

}
