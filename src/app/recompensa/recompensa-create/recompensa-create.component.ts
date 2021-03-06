import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Recompensa } from "../recompensa";
import { RecompensaService } from "../recompensa.service";
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { MascotaPerdida } from '../../mascotaperdida/mascotaperdida';

@Component({
  selector: 'app-recompensa-create',
  templateUrl: './recompensa-create.component.html',
  styleUrls: ['./recompensa-create.component.css']
})
export class RecompensaCreateComponent  implements OnInit{
  /**
   * La mascota perdida
   */
  mascotaperdida: MascotaPerdida;
  /**
   * Formato de la recompensa
   */
  recompensaForm: FormGroup;
   /**
   * Recibe como parametro el id de la mascota perdida
   */
   id: number;

  /**
   * Constructor de la recompensa
   * @param recompensaService  Servicio de recompensa
   * @param formBuilder 
   * @param toastr 
   */
  constructor(
    private recompensaService: RecompensaService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
      
        private router: Router,
  ) {
    this.recompensaForm = this.formBuilder.group({
      monto: ["", Validators.required],
      
    });
  }

  /**
   * Crea una recompensa 
   * @param newRecompensa Recompensa
   */
  createRecompensa(newRecompensa: Recompensa) {
   this.showSuccess();
    // Process checkout data here
    console.warn("La recompensa se ha enviado", newRecompensa);
    this.recompensaService.getMascotaPerdida(this.id).subscribe(o => {
      this.showSuccess();
    }); 
    console.log(newRecompensa);
    newRecompensa.pagado =false;
    this.recompensaService.getMascotaPerdida(this.id).subscribe(mascotaperdidas => this.mascotaperdida = mascotaperdidas);
    newRecompensa.mascotaPerdida = this.mascotaperdida;
    this.recompensaService.createRecompensa(newRecompensa).subscribe(o => {
      this.showSuccess();
    })
    this.recompensaForm.reset();
   
  }
  
  ngOnInit()
  {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log("ENTRE"+this.id);
  }
  ngOnDestroy()
  {
    this.id = +this.route.snapshot.paramMap.get('id');
  }
  /**
   * Llama el método con el id de la mascota correspondiente
   * @param params id
   */
  onLoad(params) {

    this.id = parseInt(params['id']);
    ;
  }
  /**
   * Muestra que se pudo crear
   */
  showSuccess() {
    this.toastr.success("Recompensa", "Creada exitosamente!", {"progressBar": true,timeOut:3000});
  }

}