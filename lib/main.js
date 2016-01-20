import {d3} from 'd3';
import $ from 'jquery';


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

function start() {
  let intensity;

  $("#draw-area").mousedown((e) => {
    intensity = new Intensity(e.pageX, e.pageY);
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

      console.log(height);
      $(this).append(bar);
    }
  });
}

$(start);


