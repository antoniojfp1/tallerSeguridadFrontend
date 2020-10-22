import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileService } from '../shared/file.service';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  uploadForm: FormGroup;
  publicKey: string;
  privateKey: string;

  constructor(private fileService: FileService,
              private storageService: StorageService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  generateKeys() {
    const token = this.storageService.userinfo.token;
    this.fileService.get(token).subscribe(response => {
      this.publicKey = response.data.publicKey.content;
      this.privateKey = response.data.privateKey.content;
    });
  }

}
