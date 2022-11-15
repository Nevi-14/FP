import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilUsuario } from 'src/app/models/perfilUsuario';

@Component({
  selector: 'app-perfil-jugador',
  templateUrl: './perfil-jugador.page.html',
  styleUrls: ['./perfil-jugador.page.scss'],
})
export class PerfilJugadorPage implements OnInit {
@Input() perfil:PerfilUsuario;
userPic = null;
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.userPic = this.perfil.Foto ?  'https://futplaycompany.com/FUTPLAY_APIS_HOST/PerfilUsuarioUploads/' + this.perfil.Foto +'?'+ this.dateF() : 'assets/user.svg';;
    console.log(this.perfil, 'perfil')
  }

  calcularFecha(fecha){
    var dob = new Date(fecha);
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();
    
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff); 
    
    //extract year from date    
    var year = age_dt.getUTCFullYear();
    
    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    return age;
  }
  
  dateF(){
    return new Date().getTime() 
  }
  cerrarModal(){

    this.modalCtrl.dismiss();
  }
}