
import {Looping} from 'aronnax-looping';
import {Pooled} from 'aronnax-pooling';

const MAX_WIDTH = 400,
      MAX_HEIGHT = 300;

function wrapProto(proto) {
  var toReturn = {};
  for (let prop in proto) {
    if (proto.hasOwnProperty(prop)) {
      let value = proto[prop];
      toReturn[prop] = {
        enumerable: true,
        writable: true,
        value: value
      }
    }
  }
  return toReturn;
}


var Entity = Object.create(Pooled, wrapProto({

  x: 0,
  y: 0,
  renderer: null,

  init(ctx) {
    this._ctx = ctx;
  },

  render() {
    this.renderer.render();
  },

  update() {

  }
}));

function EntityFactory(props) {
  var entity = Entity.make();
  for (prop in props) {
    entity[prop] = props[prop];
  }
  return entity;
}

var main = function(window) {
  var loop = Object.create(Looping),
      ctx;

  ctx = document.querySelector('.context');
  ctx.style.width = MAX_WIDTH + 'px';
  ctx.style.height = MAX_HEIGHT + 'px';

  let ball = EntityFactory({w: 10, h: 10});

  loop.onConstantly(dt => {
    ball.update(dt);
  });
  loop.onEveryFrame(dt => {
    ball.render();
  });

}
main(window || global);
