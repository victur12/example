import { Injectable } from '@angular/core';
import { collectionData, docSnapshots, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  // agregar un contacto a la coleccion

  createContact(contact: any){
    const document = doc(collection(this.firestore, 'contacts'));
    return setDoc(document, contact);
  }

  // traer todos los contactos almacenados en la conleccion
  getContacts(): Observable<any []> {
    const contactsCollection = collection(this.firestore, 'contacts');
    return collectionData(contactsCollection, {idField: 'id'})
    .pipe(map(contacts => contacts as any[]));
  }

  // trae un contacto en especifico
  getContactById(id: String): Observable<any>{
    const document = doc(this.firestore, `contacts/${id}`)
    return docSnapshots(document)
    .pipe(map(doc =>{
      const id = doc.id;
      const data = doc.data();
      return { id, ...data } as any;
    }));
  }

  // editar un contacto en especifico
  editContact(contact:any){
    const document = doc(this.firestore, 'contacts', contact?.id);
    const { id, ...data} = contact;
    return setDoc(document, data);
  }

  // eliminar o remover un contacto en especifico
  removeContact(id: string){
    const document = doc(this.firestore, 'contacts', id);
    return deleteDoc(document);
  }
}
