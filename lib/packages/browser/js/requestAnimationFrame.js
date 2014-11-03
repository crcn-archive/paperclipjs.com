if (!global.requestAnimationFrame) {
  window.requestAnimationFrame = function (tick) { 
    setTimeout(tick, 0);
  }
}