import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['../auth.component.scss']
})
export class VerifyComponent implements OnInit {
  verificationResult: boolean;
  id: string;

  constructor(private _authService: AuthService) {
    this.verificationResult = null;
    this.id = this.getId();
  }

  ngOnInit() {
    console.log('verifying: ', this.id);
    // TODO: authservice
  }

  getId(): string { // retrieves id from path
    const path = window.location.pathname;
    const pathArgs = path.split('/'); // '', [lang], 'auth', 'verify', [id]
    return pathArgs[4];
  }
}
