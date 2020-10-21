import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-encription',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {

  nombreArchivo: string;
  uploadForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    console.log('Enviado');
  }

  onFileChange(event: any) {
    console.log(event);
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

}
