import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-agregar-clientes',
  templateUrl: './agregar-clientes.component.html',
  styleUrls: ['./agregar-clientes.component.css']
})
export class AgregarClientesComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  urlImg: string = ' '
  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private db: AngularFirestore) { }


  ngOnInit(): void {
    this.formularioCliente = this.fb.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      FechaNacimiento: ['', Validators.required],
      Telefono: [''],
      ImgPerfil: ['', Validators.required]
    })
  }

  agregar() {
    this.formularioCliente.value.ImgPerfil = this.urlImg
    this.formularioCliente.value.FechaNacimiento = new Date(this.formularioCliente.value.FechaNacimiento)
    console.log(this.formularioCliente.value);
    this.db.collection('clientes').add(this.formularioCliente.value).then((finish) => {
      console.log('Cliente agregado')
    })
  }

  uploadImage(evento) {
    if (evento.target.files.length > 0) {
      let nombre = new Date().getTime().toString();
      let archivo = evento.target.files[0]
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))
      let ruta = 'Clientes/' + nombre + extension;
      const reference = this.storage.ref(ruta)
      const tarea = reference.put(archivo)
      tarea.then((objeto) => {
        console.log('imagen subida')
        reference.getDownloadURL().subscribe((url) => {
          this.urlImg = url;
        })
      })
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt(porcentaje.toString());
      })

    }

  }

}
