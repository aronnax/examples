
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

var htmlRendrr = {
  ctx: null,
  element: null,
  render(entity) {
    var elementExists = !!this.element;
    if (!elementExists) {
      // TODO use pooling to make element.
      this.element = document.createElement('div');
      this.element.style.position = 'absolute';
      this.element.style.background = 'black';
      this.ctx.appendChild(this.element);
    }
    this.element.style.width = Math.floor(entity.w) + 'px';
    this.element.style.height = Math.floor(entity.h) + 'px';
    this.element.style.left = Math.floor(entity.x) + 'px';
    this.element.style.top = Math.floor(entity.y) + 'px';
  }
};

var Bounded = {
  boundX: 0,
  boundY: 0,
  update() {
    if (this.x >= this.boundX) {
      this.emit('bounds:hit', {
        axis: 'x',
        side: 'r'
      });
    }
    if (this.x <= 0) {
      this.emit('bounds:hit', {
        axis: 'x',
        side: 'l'
      });
    }
  }
};


var Entity = Object.create(Pooled, wrapProto({

  x: 0,
  y: 0,
  velocity: {
    x: 0,
    y: 0
  },
  renderer: null,

  init(ctx) {
    this._ctx = ctx;
  },

  render() {
    this.renderer.render(this);
  },

  update() {
    if (this.x >= MAX_WIDTH) {
      this.velocity.x = -5;
    }
    if (this.x <= 0) {
      this.velocity.x = 5;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}));

function EntityFactory(props) {
  var entity = Entity.make();
  for (let prop in props) {
    entity[prop] = props[prop];
  }
  return entity;
}

var main = function(window) {
  var loop = Object.create(Looping),
      rendrr,
      ctx;

  ctx = document.querySelector('.context');
  ctx.style.position = 'relative';
  ctx.style.width = MAX_WIDTH + 'px';
  ctx.style.height = MAX_HEIGHT + 'px';

  rendrr = Object.create(htmlRendrr);
  rendrr.ctx = ctx;

  let ball = EntityFactory({w: 10, h: 10, renderer: rendrr});
  ball.x = 20;
  // TODO this is wrong, when its an object, its changing the proto
  ball.velocity.x = 5;

  loop.onConstantly(dt => {
    ball.update(dt);
  });
  loop.onEveryFrame(dt => {
    console.clear();
    console.log('frame ', loop.frame);
    ball.render();
  });
  loop.start();

}
main(window || global);
