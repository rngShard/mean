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
    this._authService.verify(this.id).subscribe(() => {
      this.verificationResult = true;
    }, err => console.log(err));
  }

  getId(): string { // retrieves id from path
    const searchParams = window.location.search;
    const id = searchParams.substring(1).split('=')[1];
    return id;
  }
}
