import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>();
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    // this.db.collection('clientes').valueChanges().subscribe((resultado)=>{
    //   this.clientes = resultado;
    //   console.log(resultado)
    // });

    this.clientes.length = 0;
    this.db.collection('clientes').get().subscribe((resultado) => {
      resultado.docs.forEach((item) => {


        let cliente = item.data();
        cliente = item.id;
        cliente = item.ref;
        this.clientes.push(cliente)
      })

    })

  }



}
