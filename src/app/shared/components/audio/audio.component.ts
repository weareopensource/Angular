import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
declare var MediaRecorder: any;

const READY = 'READY';
const PAUSED = 'PAUSED';
const RECORDING = 'RECORDING';
const STOPED = 'STOPED';

interface RecordState { READY; PAUSED; RECORDING; STOPED; }

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

  @ViewChild('audio')
  public audio;

  @ViewChild('source')
  public source;

  @ViewChild('download', {read: ElementRef})
  public download;

  private recorder;
  public state = 'ready';

  private chunks = [];

  constructor(private el: ElementRef) {}

   ngOnInit() {
    navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => {
      this.recorder = new MediaRecorder(stream);
      this.recorder.ondataavailable = e => {
        setTimeout(() => {
          this.chunks.push(e.data);
          if (this.recorder.state === 'inactive') {
            const blob = new Blob(this.chunks, { type: 'audio/webm' });
            this.audio.nativeElement.src =
            this.source.nativeElement.src =
            this.download.nativeElement.href = URL.createObjectURL(blob);
          }
        });
      };
    });
  }

  start() {
    this.recorder.start();
    this.state = 'recording';
  }
  pause() {
    this.recorder.pause();
    this.state = 'paused';
  }
  resume() {
    this.recorder.resume();
    this.state = 'recording';
  }
  stop() {
    this.recorder.stop();
    this.state = 'stoped';
  }
}
