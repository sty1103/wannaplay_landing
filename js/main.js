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

const submitBtn = document.querySelector('section.request .submit');

submitBtn.addEventListener('click', () => {
  const name = document.querySelector('section.request [type=text]');
  const email = document.querySelector('section.request [type=email]');
  const content = document.querySelector('section.request textarea');

  name.value = name.value.trim();
  email.value = email.value.replace(/\s/gi, "");

  if ( !name.value )
    return name.classList.add('invalid');
  else
    name.classList.remove('invalid');
  
  if ( !email.value.match(/\S+@\S+\.\S+/gi) )
    return email.classList.add('invalid');
  else
    email.classList.remove('invalid');

  const data = {
    name: name.value,
    email: email.value,
    content: content.value
  };

  submitBtn.innerHTML += "<span class='fa fa-spinner fa-spin' style='margin-left:8px'></span>";
  submitBtn.disabled = true;

  axios.post('https://wannaplay.kr/wp-json/Avada-Child/submit', data)
  .then((res) => {
    submitBtn.querySelector('span').remove();
    submitBtn.disabled = false;
    alert('참가신청이 완료되었습니다.');
  })
  .catch((err) => {
    submitBtn.querySelector('span').remove();
    submitBtn.disabled = false;
    alert('테스터에 이미 등록된 정보입니다.');
  });
});