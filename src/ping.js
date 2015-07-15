
import {component,
        makeEntityProto,
        setupHTMLRenderer} from 'aronnax-entity';
import {inheritance as inh} from 'aronnax-inheritance';
import {Looping} from 'aronnax-looping';


const CTX_W = 600,
      CTX_H = 400;

var collision = {
  _c_entities: [],

  init(entity) {
    this._c_entities.push(entity);
  },
  update(entity) {
    for (cEntity of this._c_entities) {
      let intersects = this.insersects(cEntity, entity);
    }
  }
};

function setupRender(selector) {
  var rendrr,
      ctx;

  ctx = document.querySelector(selector);
  rendrr = setupHTMLRenderer(ctx, {
    ctxW: CTX_W,
    ctxH: CTX_H
  });

  return rendrr;
}

var rendrr = setupRender('.htmlcontext');

console.debug('collision', component.collision);
var Ball = makeEntityProto({className: 'Ball'}, rendrr,
    component.bounded,
    component.moveable,
    component.rounded,
    component.collision);
console.debug('Ball', Ball);

var Pin = makeEntityProto({className: 'Pin'}, rendrr,
    component.moveable,
    component.rectangular,
    component.rounded);

const pinps = [
  {x: 510, y: 40},
  {x: 20, y: 150},
  {x: 220, y: 200},
  {x: 400, y: 350},
  {x: 140, y: 100}
];

function main(window) {
  var loop = Object.create(Looping),
      ball,
      pins = [];

  for (let i = 0, ilen = 5; i < ilen; i++) {
    let pin = Pin.make();
    pin.init({
      x: pinps[i].x,
      y: pinps[i].y,
      r: 20
    });
    pin._element.style.border = '3px solid gray';
    pins.push(pin);
  }

  ball = Ball.make();
  ball.init({w: 10, h: 10, r: 5, y: 20});
  ball.v.x = 1;
  ball.v.y = 1;
  ball._element.style.border = '1px solid gray';
  console.debug('pin', pins[1]);
  console.debug('ball', ball);
  ball.on('collision', (data) => {
    var currentBall = data.a,
        collidedPin = data.b;

    console.log('collision', collidedPin);
  });

  loop.onConstantly(dt => {
    ball.update(dt);
    for (let pin of pins) {
      pin.update(dt);
      let isCol = ball.collision.checkCollision(ball, pin);
      if (isCol) {
        ball.bg = '#cc1212';
        pin.bg = '#094ee2';
      } else {
        ball.bg = '#000';
        pin.bg = '#000';
      }
    }
  });
  loop.onEveryFrame(dt => {
    ball.render();
    for (let pin of pins) {
      pin.render();
    }
  });
  loop.start();

}

main(window || global);
