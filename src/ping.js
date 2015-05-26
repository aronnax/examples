
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

var Ball = makeEntityProto({className: 'Ball'}, rendrr,
    component.bounded,
    component.moveable,
    component.rectangular);

var Pin = makeEntityProto({className: 'Pin'}, rendrr,
    component.moveable,
    component.rectangular,
    component.rounded);

function main(window) {
  var loop = Object.create(Looping);

  let ball = Ball.make();
  ball.init({w: 10, h: 10, y: 20});
  ball.v.x = 1;
  ball.v.y = 1;

  let pin = Pin.make();
  pin.init({w: 15, h: 15, x: 50, y: 50, r: {br: 5, bl: 5, tr: 5, tl: 5}});

  loop.onConstantly(dt => {
    ball.update(dt);
    pin.update(dt);
  });
  loop.onEveryFrame(dt => {
    ball.render();
    pin.render();
  });
  loop.start();

}

main(window || global);
