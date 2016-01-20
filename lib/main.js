import $ from 'jquery';
import Bars from './bars';

import SoundCloudSource from './soundcloud';

var sc = new SoundCloudSource;

class Intensity {
  constructor(x,y) {
    this.value = 0;
    this.start(x,y);
  }

  get(x,y) {
    if(x !== this.x && y !== this.y) {
      this.stop();
      this.start(x,y);
    }
    return (this.value + 1) * 20;
  }

  start(x,y) {
    this.x = x;
    this.y = y;
    this.incr = setInterval(() => this.value++, 100);
  }

  stop() {
    this.value = 0;
    clearInterval(this.incr);
  }
}

function setupSoundcloud() {
    sc.setup($("#audio-soundcloud")[0]);
    let trackUrl = "https://soundcloud.com/rsk7/sounds-from-monday-evening";
    $("#trackUrl").val(trackUrl);
    sc.track(trackUrl);
    $("#trackUrl").change(e => sc.track(e.target.value));
}

function start() {
  let intensity;

  $("#draw-area").mousedown(function(e) {
    let bar = $("<div>").addClass("bar");
    if (!intensity) {
      $(this).append(bar);
    }


    intensity = intensity || new Intensity(e.pageX, e.pageY);
    let height = intensity.get(e.pageX, e.pageY);
    bar.css({top: e.pageY, left: e.pageX, height: height});
  });

  $("#draw-area").mouseup(() => {
    if (intensity) {
      intensity.stop();
      intensity = null;
    }
  });

  $("#draw-area").mousemove(function(e) {
    if (intensity) {
      let height = intensity.get(e.pageX, e.pageY);
      let bar = $("<div>")
        .addClass("bar")
        .css({top: e.pageY, left: e.pageX, height: height});
      $(this).append(bar);
    }
  });

  var eq;

  $("#setup-bars").click(() => {
    var count = $(".bar").length;
    eq = new Bars("#draw-area", count);
    eq.setDataProvider(() => sc.dataProvider().frequency());
    eq.draw();
  });


  setupSoundcloud();
}

$(start);


