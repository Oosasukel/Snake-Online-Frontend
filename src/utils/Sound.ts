export class Sound {
  private sound: HTMLAudioElement;

  constructor(src: string) {
    if (process.browser) {
      this.sound = document.createElement('audio');
      this.sound.src = src;
    }
  }

  play() {
    this.sound.play();
  }

  stop() {
    this.sound.pause();
  }
}
