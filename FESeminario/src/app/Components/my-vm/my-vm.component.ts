import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AxiosService} from "../../Services/axios/axios.service";
import {UsuarioModule} from "../../Modules/usuario/usuario.module";
import {MaquinavirtualService} from "../../Services/maquinavirtual/maquinavirtual.service";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-my-vm',
  templateUrl: './my-vm.component.html',
  styleUrls: ['./my-vm.component.css']
})
export class MyVMComponent implements OnInit{

  public lista!: Array<any>;
  user:UsuarioModule={nombre:'', apellidos:'', contrasenia:'', correo:'', tipousuario:'1'}
  select = [false, false, false, false];
  iniciada:boolean = false
  apagada:boolean = true
  state:string = "start"
  buttonText = "Iniciar"
  constructor(private axiosService:AxiosService, private router: Router, private maquinaService:MaquinavirtualService, private http: HttpClient) {

    this.select = [true, false];
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        console.log("EVENT", event)
        switch (event.urlAfterRedirects){
          case "/":
            this.select = [false, false, false, false];break;
          case "/userprofile":
            this.select = [true, false, false, false];break;
          case "/my-vm":
            this.select = [false, true, false, false];break;
          case "/my-vm":
            this.select = [false, false, true, false];break;
          case "/my-vm":
            this.select = [false, false, false, true];break;
          default:
            this.select = [true, false, false, false]; break;
        }
      }
    })
  }

  ngOnInit(): void {
    this.maquinaService.getMaquinasVirtuales().then(value => {
      this.lista = value.data;
    })
  }
  navig  (path:string){
    this.router.navigate([path]);
    console.log(path);
  }

  iniciarVM(vm:any){
    return this.http.post(
      "http://localhost:8000/solicitud",{
        "solicitud":this.state,
        "nombre":vm.nombre
      },
      {
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    ).subscribe({
        next:(result:any) =>{
          this.switchState()
          console.log(result);
        }
      }
    )
  }

  switchState(){
    if (this.iniciada){
      this.iniciada = false
      this.apagada = true
      this.state = "start"
      this.buttonText = "Iniciar"
    }else {
      this.iniciada = true
      this.apagada = false
      this.state = "finish"
      this.buttonText = "Apagar"
    }
  }

    protected readonly parseInt = parseInt;
}
