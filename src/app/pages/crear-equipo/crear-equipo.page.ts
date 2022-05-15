import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonSlides, ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { CanchasService } from 'src/app/services/canchas.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { GestorImagenesService } from 'src/app/services/gestor-imagenes.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare const window: any;  
@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.page.html',
  styleUrls: ['./crear-equipo.page.scss'],
})
export class CrearEquipoPage implements OnInit {
  stadiumProfile =  'assets/main/team-profile.svg';
  img1 = 'assets/main/team-profile.svg';
  showProvincia = false;
  showCanton = false;
  showDistrito = false;
imageURL =  null
  tempImages: String[]=[];
  image = '';
  @ViewChild(IonSlides) slides: IonSlides;
 
  constructor(
    public modalCtrl: ModalController,
     public equiposService: EquiposService,
      public provinciasService: ProvinciasService,
       public cantonesService: CantonesService,
        public distritosService: DistritosService,
         public usuariosService: UsuariosService,
         public camera: Camera,
         public canchasService:CanchasService,
          public gestorImagenesService: GestorImagenesService,
           public alertasService: AlertasService
           
           ) { }

  imgs = [
    
  {  seleccionado: true, img:'001-barcelona.svg'},
  {  seleccionado: false, img: '002-chelsea.svg'},
  {  seleccionado: false, img: '003-borussia-monchengladach.svg'},
  {  seleccionado: false, img: '004-borussia-dortmund.svg'},
  {  seleccionado: false, img: '005-bayern-leverkusen.svg'},
  {  seleccionado: false, img: '006-atletico-de-madrid.svg'},
  {  seleccionado: false, img: '007-villarreal.svg'},
  {  seleccionado: false, img: '008-roman.svg'},
  {  seleccionado: false, img: '009-valencia.svg'},
  {  seleccionado: false, img: '010-sampdoria.svg'},
  {  seleccionado: false, img: '011-tottenham-hotspur.svg'},
  {  seleccionado: false, img: '012-lazio.svg'},
  {  seleccionado: false, img: '013-napoli.svg'},
  {  seleccionado: false, img: '014-sevilla.svg'},
  {  seleccionado: false, img: '015-real-madrid.svg'},
  {  seleccionado: false, img: '016-leipzig.svg'},
  {  seleccionado: false, img: '017-paris-saint-germain.svg'},
  {  seleccionado: false, img: '018-olympique-lyonnais.svg'},
  {  seleccionado: false, img:  '019-monaco.svg'},
  {  seleccionado: false, img:  '020-olympique-de-marseille.svg'},
  {  seleccionado: false, img: '021-nice.svg'},
  {  seleccionado: false, img: '022-manchester-united.svg'},
  {  seleccionado: false, img:  '023-manchester-city.svg'},
  {  seleccionado: false, img:  '024-liverpool.svg'},
  {  seleccionado: false, img: '025-juventus.svg'},
  {  seleccionado: false, img: '026-internazionale-milano.svg'},
  {  seleccionado: false, img: '027-schalke-04.svg'},
  {  seleccionado: false, img: '028-nantes.svg'},
  {  seleccionado: false, img: '029-bayern-munchen.svg'},
  {  seleccionado: false, img: '030-arsenal.svg'},
  
  
  
  ]

  slideOpts = {
    allowTouchMove: false
    };
    
  avatarSlide = {
    slidesPerView: 1
  }
  equipo = {
    Cod_Equipo: 0 ,
    Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito: null,
    Foto: this.imgs[0].img,
    Nombre: '',
    Abreviacion: '',
    Fecha: new Date(),
    Estrellas: 0,
    Dureza: 'meh.svg',
    Estado: 1,
    Descripcion_Estado: '',
 }
 slidePrev() {
  this.slides.slidePrev();
}
slideNext() {
  
  this.slides.slideNext();
}
 img2 = new Image();


 img = 'assets/img/equipos/'+this.equipo.Foto
  ngOnInit() {
    this.provinciasService.provincias = [];
    this.provinciasService.syncProvinciasPromise().then(resp =>{
this.showProvincia = true;
this.provinciasService.provincias = resp;
    });
    
this.imageURL =   "assets/team.svg?" + new Date().getTime()
   // this.equipo.Foto = 'assets/equipos/soccer.png';

   console.log(this.equipo.Foto)
  }
  imageUpload(source:string){
   
    let   fileName = this.equipo.Nombre
    let location = 'perfil-equipo';
       this.gestorImagenesService.selectImage(source,fileName,location).then(resp =>{
        this.equipo.Foto = resp;
  console.log(resp,  this.equipo.Foto, 'respppppppppppppppppggggg')

       })
   
     //  
  }

  seleccionarAvatar(img){

    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
    this.equipo.Foto = img.img

    }

  slideChange(event){
    let currentIndex = this.slides.getActiveIndex().then(resp =>{
      this.imgs.forEach(av => av.seleccionado = false);
      this.imgs[resp].seleccionado = true;
      this.equipo.Foto = this.imgs[resp].img

      console.log(resp,'resp')
    })
 
  }
  crearRegistro(){



this.equiposService.nuevoEquipo(this.equipo)
this.cerrarModal();




}




onChange($event,identifier){
console.log(identifier)
switch(identifier){

case 'provincia':

this.provinciasService.syncProvincias();
this.equipo.Cod_Canton = null;
this.equipo.Cod_Distrito = null;
this.cantonesService.cantones = [];
this.distritosService.distritos = [];
this.cantonesService.syncCantones($event.target.value);
console.log(identifier)
break;
case 'canton':
  console.log(identifier)
this.equipo.Cod_Distrito = null;
this.distritosService.distritos = [];
 if(this.equipo.Cod_Canton){
  this.distritosService.syncDistritos(this.equipo.Cod_Provincia, $event.target.value);
 }
break;

case 'distrito':
  
break;

}
}

  enviarFormulario(){
    //this.equipoService.equipo.push(new Equipos(this.equipo.cantonID,this.equipo.usuarioID,this.equipo.provinciaID,this.equipo.cantonID,this.equipo.distritoID,this.equipo.foto,this.equipo.nombre,this.equipo.abreviacion, new Date(),'../assets/icons/sad.svg',1));
 
//    this.equipoService.checkIfHasequipo();
    this.modalCtrl.dismiss();
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  uploadCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.tempImages.push(img);
      this.equipo.Foto = img;
  
      console.log(this.tempImages);
     }, (err) => {
      // Handle error
     });
  }
  uploadPictures(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.tempImages.push(img);
      this.equipo.Foto = img;
      
      console.log(this.tempImages);
     }, (err) => {
      // Handle error
     });
  }
  
  onChangeProvincias($event){
    this.alertasService.presentaLoading('Cargando datos...')
    this.equipo.Cod_Provincia = $event.target.value;
    this.equipo.Cod_Canton = null;
    this.equipo.Cod_Distrito = null;
    this.cantonesService.cantones = [];
    this.distritosService.distritos = [];
 if(this.equipo.Cod_Provincia){
  this.cantonesService.syncCantones(this.equipo.Cod_Provincia).then(resp =>{
this.showCanton = true;
this.showDistrito = null;
this.cantonesService.cantones = resp.slice(0);
this.alertasService.loadingDissmiss();
  })
 }else{
  this.alertasService.loadingDissmiss();
 }
  }
  onChangeCantones($event){
    this.alertasService.presentaLoading('Cargando datos...')
    this.equipo.Cod_Canton = $event.target.value;
    this.equipo.Cod_Distrito = null;
    this.distritosService.distritos = [];
if(this.equipo.Cod_Provincia && this.equipo.Cod_Canton){
  this.distritosService.syncDistritos(this.equipo.Cod_Provincia,this.equipo.Cod_Canton).then(resp =>{
    this.distritosService.distritos = resp.slice(0);
    this.showDistrito = true;
    this.alertasService.loadingDissmiss();
    
  })
}else{
  this.alertasService.loadingDissmiss();
}

  }

  onChangeDistritos($event){

    this.equipo.Cod_Distrito = $event.target.value;

  }
}