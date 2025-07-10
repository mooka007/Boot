class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }

  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
  }
}

const video1 = new Video("JavaScript Tutorial", "CodeMaster", 600);
video1.watch(); 

const video2 = new Video("CSS Basics", "DesignGuru", 300);
video2.watch(); 