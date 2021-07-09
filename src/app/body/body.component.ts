import {  Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private ngZone: NgZone, private elRef:ElementRef){}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {

      const canvaId: HTMLCanvasElement = this.elRef.nativeElement.querySelector("#canvas");
      const hiddenCanvas: HTMLCanvasElement = this.elRef.nativeElement.querySelector("#canvas2");

      const context: CanvasRenderingContext2D | null = canvaId.getContext("2d");
      const hiddenContext: CanvasRenderingContext2D | null = hiddenCanvas.getContext("2d");

      // -------------------------------------------- Parametrs ------------------------------------------------

      if(context != null && hiddenContext != null){

      const boundry = {
        width: 400,
        height: 400
      }

      const PROTON_IMG = './assets/images/proton.png';
      const NEUTRON_IMG = './assets/images/neutron.png';
      const ELECTRON_IMG = './assets/images/electron.png';

      const imgBound = 15;
      const protonBound = 15;

      const numProtons = 4;
      const numNeutrons = 4;
      const numElectrons = 4;

      const speed = 30;

      const ellipse = {
        a: 200,
        b: 40
      }
      // -------------------------------------------- Functions ------------------------------------------------

      const random = (a: number, b: number) => {
        b = b + 1;
        return (Math.floor(Math.random() * (b - a)) + a);
      }
      const loadImage = (url: string) => new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
              resolve(img);
          }
      });
      const computeCoordinates = (sign = 1, x: number) => {
          return sign * (ellipse.b / ellipse.a) * Math.sqrt(ellipse.a ** 2 - x ** 2);
      }
      // -------------------------------------------- Electrons ------------------------------------------------
      class ElectronProp{
        public position: number;
        public sign: number;
        public speed: number;
        public constructor(){
          const r1 = Math.random();
          const r2 = Math.random();
          this.position = (r1 < 1 / 2 ? 1 : -1) * random(0, ellipse.a);
          this.sign = r2 < 1 / 2 ? 1 : -1;
          this.speed = speed;
        }
      }
      // -------------------------------------------- Add Electrons ------------------------------------------------
        const addElectrons = (num: number) => {
          let electrons0 = [];
          for(let i=0; i < num; i++){
              electrons0.push(new ElectronProp());
          }
          return electrons0;
      }
      const electrons = addElectrons(numElectrons);

        var animationRef = null;
        // -------------------------------------------- Add Electrons ------------------------------------------------
        const drawProtonsNeutrons = async () => {
          const protonImg:any = await loadImage(PROTON_IMG);
          const NotronImg:any = await loadImage(NEUTRON_IMG);

          let protons = numProtons;
          let neutrons = numNeutrons;
          let previous = 1; // 1 proton, -1 neutron
          for (let i = 0; i < (numProtons + numNeutrons); i++) {
              hiddenContext.save();
              if (i < 4) {
                  hiddenContext.translate(boundry.width / 2, boundry.height / 2);
                  hiddenContext.rotate((i % 2 == 0 ? 1 : -1) * Math.PI * i / 2);
                  hiddenContext.translate(-protonBound / 2, -protonBound / 2);
                  if (previous == 1) {
                      if (protons > 0) {
                          protons--;
                          hiddenContext.drawImage(protonImg, 0, 8, protonBound, protonBound);
                      } else {
                          neutrons--;
                          hiddenContext.drawImage(NotronImg, 0, 8, protonBound, protonBound);
                      }
                  } else {
                      if (neutrons > 0) {
                          neutrons--;
                          hiddenContext.drawImage(NotronImg, 0, 8, protonBound, protonBound);
                      } else {
                          protons--;
                          hiddenContext.drawImage(protonImg, 0, 8, protonBound, protonBound);
                      }
                  }
              }
              else if (i < 16) {
                  hiddenContext.translate(boundry.width / 2, boundry.height / 2);
                  hiddenContext.rotate((i % 2 == 0 ? 1 : -1) * Math.PI * i / 6);
                  hiddenContext.translate(-protonBound / 2, -protonBound / 2);
                  if (previous == 1) {
                      if (protons > 0) {
                          protons--;
                          hiddenContext.drawImage(protonImg, 0, 18, protonBound, protonBound);
                      } else {
                          neutrons--;
                          hiddenContext.drawImage(NotronImg, 0, 18, protonBound, protonBound);
                      }

                  } else {
                      if (neutrons > 0) {
                          neutrons--;
                          hiddenContext.drawImage(NotronImg, 0, 18, protonBound, protonBound);
                      } else {
                          protons--;
                          hiddenContext.drawImage(protonImg, 0, 18, protonBound, protonBound);
                      }
                  }
              }
              hiddenContext.restore();
              previous *= -1;
          }
        }
          //------------------------------------------ Draw Electrons -----------------------------------
          const drawElectrons = async () => {
            const electronImg:any = await loadImage(ELECTRON_IMG);
            electrons.forEach((el, index) => {
                hiddenContext.save();
                hiddenContext.beginPath();
                hiddenContext.translate(boundry.width/2, boundry.height/2);
                //hiddenContext.rotate(el.angle);
                hiddenContext.translate(-imgBound/2, -imgBound/2);
                hiddenContext.drawImage(electronImg, el.position, computeCoordinates(el.sign, el.position), imgBound, imgBound);
                hiddenContext.restore();
            });
          }
          //----------------------------------- Update Electrons positions -------------------------------
          const updateElectrons = async () => {
            const electronImg:any = await loadImage(ELECTRON_IMG);
            
            let direction = 1;
            electrons.forEach((el, index) => {
                hiddenContext.save();
                hiddenContext.beginPath();
                hiddenContext.translate(boundry.width/2, boundry.height/2);
                hiddenContext.rotate(direction*Math.PI*index/electrons.length);
                hiddenContext.translate(-imgBound/2, -imgBound/2);
                el.position += el.speed;
                hiddenContext.drawImage(electronImg, el.position, computeCoordinates(el.sign, el.position), imgBound, imgBound);
                if(Math.abs(el.position) >= ellipse.a){
                    el.sign *= -1;
                    el.speed *= -1;
                }
                hiddenContext.restore();
                //direction *= -1;
            });
          }
          //----------------------------------------- Draw Ellipses ----------------------------------------
            const drawEllipses = async () => {
                let direction = 1;
                electrons.forEach((el, index) => {
                    hiddenContext.save();
                    hiddenContext.beginPath();
                    hiddenContext.strokeStyle = 'rgba(0,0,0,0.15)';
                    hiddenContext.translate(boundry.width/2, boundry.height/2);
                    hiddenContext.ellipse(0, 0, ellipse.a, ellipse.b, direction*Math.PI*index/electrons.length, 0, 2*Math.PI);
                    hiddenContext.stroke();
                    hiddenContext.restore();
                });
            }
        //--------------------------------- Init -----------------------------------
          function init(){
              (async () => {
                if(hiddenContext != null){
                  hiddenContext.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);
                  hiddenContext.globalCompositeOperation= "destination-over";
                  await drawElectrons();
                  await drawEllipses();
                  await drawProtonsNeutrons();
                  await draw();
                }
              })();
          }
        //---------------------------------- Draw ----------------------------------
        function draw(){
            (async () => {
              if(hiddenContext != null && context != null){
                hiddenContext.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);
                await updateElectrons();
                await drawProtonsNeutrons();
                //await drawCircle();
                await drawEllipses();
                context.clearRect(0, 0, canvaId.width, canvaId.height);
                context.drawImage(hiddenCanvas, 0, 0, canvaId.width, canvaId.height);
              }
            })();
            requestAnimationFrame(draw);
        }
        //----------------------------------- Start Drawing ---------------------------------------
        requestAnimationFrame(init);
      }
    });
  }
}
