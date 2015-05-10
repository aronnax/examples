
import Loop from 'aronnax-looping';
import Pooling from 'aronnax-pooling';

const MAX_WIDTH = 400,
      MAX_HEIGHT = 300;

var Entity = Object.create(Pooled, {
  _ctx: { value: null },

  x: { value: 0 },
  y: { value: 0 },

  init: {
    value: function(ctx) {
      this._ctx = ctx;
    }
  },

  render: {
    value: function() {

    }
  }
});

var main = function(window) {
  var loop = Object.create(Loop),
      ctx;

  ctx = document.querySelector('.context');
  ctx.style.width = MAX_WIDTH + 'px';
  ctx.style.height = MAX_HEIGHT + 'px';

  let ball = Object.create(Entity);
  let wallL = Object.create(Entity);
  let wallR = Object.create(Entity);

  wallL.w = 5;
  wallL.h = MAX_HEIGHT;
  wallL.x = MAX_WIDTH - wallL.w;

  wallR.w = 5;

  loop.onEveryFrame(dt => {

  });

}
main(window || global);
