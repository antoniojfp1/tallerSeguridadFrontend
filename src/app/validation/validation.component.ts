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
  publicKeyNameFile: string;
  fileUploaded: string;

  constructor(private fileService: FileService,
              private storageService: StorageService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      publicKeyFile: [''],
      file: ['']
    });
  }

  generateKeys() {
    const token = this.storageService.userinfo.token;
    this.fileService.get(token).subscribe(response => {
      this.publicKey = response.data.publicKey.content;
      this.privateKey = response.data.privateKey.content;
    });
  }

  downloadPublicKey() {
    const setting = {
      element: {
        dynamicDownload: null as HTMLElement
      }
    };
    if (!setting.element.dynamicDownload) {
      setting.element.dynamicDownload = document.createElement('a');
    }
    const element = setting.element.dynamicDownload;
    const fileType = 'application/msword';
    element.setAttribute('href', `data:${fileType};base64,${(this.publicKey)}`);
    element.setAttribute('download', 'application.bin');
    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

  downloadPrivateKey() {
    const setting = {
      element: {
        dynamicDownload: null as HTMLElement
      }
    };
    if (!setting.element.dynamicDownload) {
      setting.element.dynamicDownload = document.createElement('a');
    }
    const element = setting.element.dynamicDownload;
    const fileType = 'application/msword';
    element.setAttribute('href', `data:${fileType};base64,${(this.privateKey)}`);
    element.setAttribute('download', 'application.bin');
    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

  encryptFile() {

  }

  selectPublicKey(event: any) {
    event.preventDefault();
    const fileHiden = document.getElementById('publicKeyFileHiden');
    fileHiden.click();
  }

  selectFile(event: any) {
    event.preventDefault();
    const fileHiden = document.getElementById('fileHiden');
    fileHiden.click();
  }

  onPublicKeyFileChange(event: any) {
    const reader = new FileReader();
    if (event.target && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('publicKeyFile').setValue(file);
        reader.readAsDataURL(file);
        reader.onload = (() => {
          this.publicKeyNameFile = file.name;
        });
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
        reader.readAsDataURL(file);
        reader.onload = (() => {
          this.fileUploaded = file.name;
        });
    }
  }

}
