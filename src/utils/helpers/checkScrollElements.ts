export const checkScrollElements = () => {
  var slice = Array.prototype.slice;

  function throttle(type: any, name: any, obj: any) {
    obj = obj || window;
    var running = false;
    var func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  }

  slice
    .call(document.querySelectorAll('*'))
    .filter((e) => e.scrollWidth > e.offsetWidth || e.scrollHeight > e.offsetHeight)
    .filter((e) => {
      var style = window.getComputedStyle(e);
      return [style.overflow, style.overflowX, style.overflowY].some((e) => e === 'auto' || e === 'scroll');
    })
    .forEach((e) => {
      var color = Math.floor(Math.random() * 16777215).toString(16);
      e.style.backgroundColor = '#' + color;
      throttle('scroll', 'optimizedScroll', e);

      e.addEventListener('scroll', (event: any) => {
        console.log('%c[scroll]', 'color: white; background-color:#' + color, event.target);
      });
    });
};
