import {d3} from 'd3';
import $ from 'jquery';

function start() {
  let mousedown = false;
  $("#draw-area").mousedown(() => mousedown = true);
  $("#draw-area").mouseup(() => mousedown = false);
  $("#draw-area").mousemove(function(e) {
    if (mousedown) {
      let bar = $("<div>")
        .addClass("bar")
        .css({top: e.pageY, left: e.pageX});
      $(this).append(bar);
    }
  });
}

$(start);


