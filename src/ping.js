
import {component,
        makeEntityProto,
        setupHTMLRenderer} from 'aronnax-entity';
import {inheritance as inh} from 'aronnax-inheritance';
import {Looping} from 'aronnax-looping';


const CTX_W = 600,
      CTX_H = 400;

function main(window) {
  var loop = Object.create(Looping),
      rendrr,
      ctx;

  ctx = document.querySelector('.htmlcontext');
  rendrr = setupHTMLRenderer(ctx, {
    ctxW: CTX_W,
    ctxH: CTX_H
  });

  let Ball = makeEntityProto({}, rendrr,
      component.bounded,
      component.moveable,
      component.rectangular);
  let ball = Ball.make();
  ball.init({w: 10, h: 10, y: 20});
  ball.v.x = 1;
  ball.v.y = 1;

  loop.onConstantly(dt => {
    ball.update(dt);
  });
  loop.onEveryFrame(dt => {
    ball.render();
  });
  loop.start();

}

main(window || global);
