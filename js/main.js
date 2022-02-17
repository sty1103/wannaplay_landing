const spyEls = document.querySelectorAll('.scroll-spy');

spyEls.forEach((spyEl, index) => {
  new ScrollMagic
  .Scene({
    triggerElement: spyEl,
    triggerHook: .3
  })
  .setClassToggle(spyEl, 'show')
  .addTo(new ScrollMagic.Controller());
});

const floatEls = document.querySelectorAll('.floating');

floatEls.forEach((floatEl, index) => {
  gsap.to(`.floating${++index}`, Math.random() + 1.5, {
    y: 16,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut,
    delay: Math.random() * 1.5
  });
});

const expEl = document.querySelector('.main ul li:first-child');
const qnaEl = document.querySelector('.main ul li:last-child');

expEl.addEventListener('click', () => {
  document.querySelector('section.harmony').scrollIntoView({ behavior:'smooth'} );
});

qnaEl.addEventListener('click', () => {
  document.querySelector('section.request').scrollIntoView({ behavior:'smooth'} );
});

