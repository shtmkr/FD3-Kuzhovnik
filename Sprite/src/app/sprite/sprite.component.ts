import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sprite',
  templateUrl: 'sprite.component.html',
  styleUrls: ['sprite.component.css']
})
export class SpriteComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  @Input('url') private spriteUrl: string;
  @Input('offset-x') private spriteOffsetX: number;
  @Input('offset-y') private spriteOffsetY: number;
  @Input('width') private spriteWidth: number;
  @Input('height') private spriteHeight: number;
  @Output('clicked') private spriteClicked: EventEmitter<void> = new EventEmitter<void>();

  clicked(){
    console.log('SpriteComponent --- Sprite clicked');
    this.spriteClicked.emit();
  }

  getWidth(){
    return this.spriteWidth.toString() + 'px';
  }

  getHeight(){
    return this.spriteHeight.toString() + 'px';
  }

  getBg(){
    return `url('${this.spriteUrl}') no-repeat`
  }

  getOffsetX(){
    return this.spriteOffsetX.toString() + 'px';
  }

  getOffsetY(){
    return this.spriteOffsetY.toString() + 'px';
  }

  getComputedOffset(){
    return `${this.getOffsetX()} ${this.getOffsetY()}`
  }

  getComputedStyle(){
    return {
      'width': this.getWidth(),
      'height': this.getHeight(),
      'background': this.getBg(),
      'backgroundPosition': this.getComputedOffset()
    }
  }
}
