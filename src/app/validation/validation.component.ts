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
  fileEncrypted: string;
  fileDecrypted: string;
  md5Hash: string;
  message: string;

  constructor(private fileService: FileService,
              private storageService: StorageService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      keyFile: [''],
      file: ['']
    });
  }

  generateKeys() {
    const token = this.storageService.userinfo.token;
    this.fileService.get(token).subscribe(response => {
      this.publicKey = response.data.publicKey.content;
      this.privateKey = response.data.privateKey.content;
      this.message = '';
    }, error => {
      this.message = error.error.message;
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
    element.setAttribute('download', 'publicKey.bin');
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
    element.setAttribute('download', 'privateKey.bin');
    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

  encryptFile(){
    const token = this.storageService.userinfo.token;
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('publicKey', this.uploadForm.get('keyFile').value);

    this.fileService.post(formData, token, 'RSA', 'encrypt').subscribe( response => {
      this.fileEncrypted = response.data.content;
      this.md5Hash = response.data.md5Hash;
      this.message = '';
    }, error => {
      this.message = error.error.message;
    });
  }

  decryptFile(){
    const token = this.storageService.userinfo.token;
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('privateKey', this.uploadForm.get('keyFile').value);
    formData.append('md5Hash', this.md5Hash)
    this.fileService.post(formData, token, 'RSA', 'decrypt').subscribe( response => {
      this.fileDecrypted = response.data.content;
      this.message = '';
    }, error => {
      this.message = error.error.message;
    });
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
      this.uploadForm.get('keyFile').setValue(file);
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

  downloadFileEncrypted() {
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
    element.setAttribute('href', `data:${fileType};base64,${(this.fileEncrypted)}`);
    element.setAttribute('download', this.fileUploaded);
    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

  downloadFileDecrypted() {
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
    element.setAttribute('href', `data:${fileType};base64,${(this.fileDecrypted)}`);
    element.setAttribute('download', this.fileUploaded);
    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

}
