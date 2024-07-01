import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'pp-easter-egg',
  standalone: true,
  templateUrl: './easter-egg.component.html',
  styleUrls: ['./easter-egg.component.scss']
})
export class EasterEggComponent implements AfterViewInit {
  @ViewChild("easterEgg") easterEgg! : ElementRef<HTMLDivElement>
  @ViewChild("nerdEmoji") nerdEmoji! : ElementRef<HTMLImageElement>
  @ViewChild("nerdSong") nerdSong! : ElementRef<HTMLAudioElement>

  ngAfterViewInit(){
    if (Math.random()*1000 == 693){
      this.showEasterEgg()
    }
  }

  showEasterEgg(){
    if (this.easterEgg != null){
      this.easterEgg.nativeElement.style.display = "block"
      this.easterEgg.nativeElement.style.left = (Math.random() * window.innerWidth).toString() + "px"
      this.easterEgg.nativeElement.style.top = (Math.random() * window.innerHeight).toString() + "px"
    }
  }

  clickedEgg(){
    this.easterEgg.nativeElement.style.display = "none"
    setTimeout(() => {
      this.nerdEmoji.nativeElement.classList.add("nerdEmoji")
      this.nerdSong.nativeElement.play()
    }, 3000);
  }
}
