import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private title: string = 'Sprite';
  private url: string = "http://fe.it-academy.by/Examples/cards2.png";
  private currentImgId: number = 1;
  private imgCnt: number = 54;
  private startPosX: number = 0;
  private startPosY: number = 0;
  private offsetStepX: number = -144;
  private offsetStepY: number = -194;
  private pos: {x: number, y: number} = {
    x: this.startPosX,
    y: this.startPosY,
};
  private changeSpriteReqCnt: number = 0;
  private colsNum: number = 4;
  private rowsNum: number = 14;
  private currentRow: number = 1;

  changeSpriteInputs(){
    console.log('AppComponent --- receive sprite inputs change');
    this.changeSpriteReqCnt++;
    this.currentImgId++;
    console.log(this.currentImgId);
    if (this.changeSpriteReqCnt < this.colsNum){
      if (this.currentRow !== this.rowsNum){
        this.pos.x += this.offsetStepX;
      }
      else {
        console.log('last row');
        if (this.currentImgId === this.imgCnt){
          this.pos.x += this.offsetStepX * 2;
        }
      }
    }
    else {
      console.log('reached edge');
      this.resetSpriteReqCnt();
      if (this.currentRow < this.rowsNum){
        this.currentRow++;
        this.pos.x = this.startPosX;
        this.pos.y += this.offsetStepY;
      }
      else {
        this.resetSpriteCurrentImgId();
        this.resetSpriteCurrentRow();
        this.pos.x = this.startPosX;
        this.pos.y = this.startPosY;
      }
    }
    if (this.currentImgId === this.imgCnt + 1){ // last elem
      this.resetSpriteReqCnt();
      this.resetSpriteCurrentImgId();
      this.resetSpriteCurrentRow();
      this.pos.x = this.startPosX;
      this.pos.y = this.startPosY;
    }
  }

  resetSpriteCurrentImgId(){
    this.currentImgId = 1;
  }

  resetSpriteReqCnt(){
    this.changeSpriteReqCnt = 0;
  }

  resetSpriteCurrentRow(){
    this.currentRow = 1;
  }

  setSpriteUrl(){
    return this.url;
  }

  setSpriteWidth(){
    return 140;
  }

  setSpriteHeight(){
    return 190;
  }

  setSpriteOffsetX(){
    return this.pos.x;
  }

  setSpriteOffsetY(){
    return this.pos.y;
  }
}
