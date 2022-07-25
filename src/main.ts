import './style.css'
(_ => {
  "use strict";
  var e = navigator;
  const t = document;
  const p = /Mobi|Andrdoid|Tablet|iPad|iPhone/.test(e.userAgent) || "MacIntel" === e.platform && 1 < e.maxTouchPoints ? "mobile" : "desktop";

  if (p == 'mobile') {
    console.log('mobile');
    t.body.innerHTML = ''
    t.body.innerHTML = '<h1>This website was made for desktop experience</h1>'
    return
  }
  const d = document
  const B = d.querySelector('.box__wrapper')!
  const M = B.querySelector('.magnet__item')! as HTMLElement
  const bounds = B.getBoundingClientRect()

  let x = {
    current: 0,
    target: 0,
  }
  let y = {
    current: 0,
    target: 0
  }
  let mouse = {
    x: 0,
    y: 0
  }

  const lerp = (x: number, xi: number, xf: number) => {
    return (1 - x) * xi + x * xf
  }

  const onMouseMove = (e: MouseEvent) => {
    mouse = {
      x: e.clientX - bounds.x - bounds.width / 2,
      y: e.clientY - bounds.y - bounds.height / 2
    }
  }

  d.addEventListener('mousemove', onMouseMove)

  const update = () => {

    if (Math.abs(mouse.x) - bounds.width / 2 < 0 && Math.abs(mouse.y) - bounds.height / 2 < 0) {
      x.target = mouse.x
      y.target = mouse.y

    } else {
      x.target = lerp(0.1, x.target, 0.1 * mouse.x)
      y.target = lerp(0.1, y.target, 0.1 * mouse.y)
    }
    x.current = lerp(0.08, x.current, x.target * 0.7)
    y.current = lerp(0.08, y.current, y.target * 0.7)


    M.style.transform = `translate( ${x.current}px , ${y.current}px )`

    requestAnimationFrame(update)

  }
  update()

})() 