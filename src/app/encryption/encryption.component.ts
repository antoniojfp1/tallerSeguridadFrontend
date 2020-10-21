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

  downloadFile() {
    console.log('Downloading file');
    /*this.cargueService.obtenerArchivoSeleccionado(idFile).subscribe(respuesta => {
      this.generarArchivoPlano(nombreArchivo, (respuesta.archivo));
    });*/
  }

  private generarArchivoPlano(nombreArchivo: string, texto: string) {
    const setting = {
      element: {
        dynamicDownload: null as HTMLElement
      }
    };
    if (!setting.element.dynamicDownload) {
      setting.element.dynamicDownload = document.createElement('a');
    }
    const element = setting.element.dynamicDownload;
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    element.setAttribute('href', `data:${fileType};base64,${(texto)}`);
    element.setAttribute('download', nombreArchivo);
    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

}
