import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';

export interface Track {
  name: string;
  path: string;
}

@Component({
  selector: 'app-mediation-player',
  templateUrl: './mediation-player.page.html',
  styleUrls: ['./mediation-player.page.scss'],
})
export class MediationPlayerPage implements OnInit {

  playlist: Track[] = [
    {
      name: 'Track 1',
      // tslint:disable-next-line: max-line-length
      path: './assets/Meditationplayer/Track1.mp3'  /// Users/jamesomalley/Desktop/FYP/WeQuitGP-master/src/assets/Meditationplayer/Track1.mp3
    },
    {
      name: 'Track 2',
      path: './assets/Meditationplayer/Track2.mp3'
    },
    {
      name: 'Track 3',
      path: './assets/Meditationplayer/Track3.mp3'
    }
  ];

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', { static: false }) range: IonRange;


  constructor() { }

  start(track: Track) {
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],

      onplay: () => {
        console.log('onplay');
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress(); // show slider / progress 
      },
      onend: () => {
        console.log('onend');  // trouble shooting 

      }
    });
    this.player.play(); //play track 
  }

  togglePlayer(pause) {
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause(); //pause
    } else {
      this.player.play(); //play
    }
  }

  next() {
    const index = this.playlist.indexOf(this.activeTrack);

    if (index != this.playlist.length - 1) {
      this.start(this.playlist[index + 1]); //next track
    } else {
      this.start(this.playlist[0]);
    }
  }

  prev() {
    const index = this.playlist.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.playlist[index - 1]); //previous track
    } else {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  updateProgress() {
    let seek = this.player.seek();
    this.progress = (+seek / this.player.duration()) * 100 || 0; // update slider / progress 
    setTimeout(() => {
      this.updateProgress();
    }, 100);
  }

  seek() {
    const newValue = +this.range.value;
    const duration = this.player.duration();
    this.player.seek(duration * (newValue / 100)); //duration of track 
  }

  ngOnInit() {
  }

}
