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
  const M = B.querySelector('.magnet__item-1')! as HTMLElement
  const N = B.querySelector('.magnet__item-2')! as HTMLElement
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

    x.target = mouse.x
    y.target = mouse.y

    let T = x.target ** 2 + y.target ** 2
    T = Math.sqrt(T)
    if (T < 300) {

      x.current = lerp(0.08, x.current, x.target * 0.15)
      y.current = lerp(0.08, y.current, y.target * 0.15)

    } else {
      let R = x.current ** 2 + y.current ** 2
      R = Math.sqrt(R)

      let cX = lerp(0.08, x.current, x.target * 0.15)
      let cY = lerp(0.08, y.current, y.target * 0.15)

      // R = Math.sqrt(R)
      let theta = 0
      if (cX != 0) {
        let a = cY / cX
        theta = Math.atan(a)
      }
      if (cX < 0)
        theta += Math.PI
      let newR = lerp(0.05, R, 0)

      x.current = newR * Math.cos(theta)
      y.current = newR * Math.sin(theta)
    }


    M.style.transform = `translate( ${x.current}px , ${y.current}px )`

    N.style.transform = `translate( ${-x.current}px , ${-y.current}px )`

    requestAnimationFrame(update)

  }
  update()

})() 