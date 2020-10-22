import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileService } from '../shared/file.service';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-encription',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {

  nombreArchivo: string;
  uploadForm: FormGroup;
  password: string;
  fileEncrypted: string;
  fileDecrypted: string;

  constructor(private formBuilder: FormBuilder,
              private fileService: FileService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  seleccionarArchivo(event: any) {
    event.preventDefault();
    const fileHiden = document.getElementById('fileHiden');
    fileHiden.click();
  }

  encryptFile(){
    const token = this.storageService.userinfo.token;
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append('password', this.password);
    this.fileService.post(formData, token, 'encrypt').subscribe( response => {
      this.fileEncrypted = response.data.content;
    });
  }

  decryptFile(){
    const token = this.storageService.userinfo.token;
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append('password', this.password);
    this.fileService.post(formData, token, 'decrypt').subscribe( response => {
      this.fileDecrypted = response.data.content;
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
        reader.readAsDataURL(file);
        reader.onload = (() => {
          this.nombreArchivo = file.name;
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
    element.setAttribute('download', this.nombreArchivo);
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
    element.setAttribute('download', this.nombreArchivo);
    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

}
