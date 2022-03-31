// 영상 재생
const video_1 = document.querySelector('section.main video:nth-child(1)');
const video_2 = document.querySelector('section.main video:nth-child(2)');

video_2.pause();

video_1.addEventListener('ended', () => {
  // 첫 번째 영상이 종료된 후 두 번째 영상을 재생
  video_1.remove();
  video_2.play();
});

video_2.addEventListener('play', () => {
  // 블러, 오선, 슬로건 노출
  setTimeout(() => {
    const main = document.querySelector('section.main');

    // 블러, 오선 노출
    main.classList.add('blur', 'bars--width');

    // 오선 위치를 아래로
    setTimeout(() => {
      main.classList.add('bars--transform')

      // 슬로건 노출
      setTimeout(() => {
        main.classList.add('slogan');
      }, 1200);
    }, 2600);
  }, 2000);
});

// 반복 재생
video_2.addEventListener('ended', () => {
  // video_2.load();
  video_2.currentTime = 0.0;
  video_2.play();
});

// 스크롤 컨트롤
const spyEls = document.querySelectorAll('.scroll-spy');

window.addEventListener('scroll', () => {
  const main = document.querySelector('section.main');
  const harmony = document.querySelector('section.harmony');

  // 하모니 섹션 스크롤 애니메이션
  if ( window.scrollY >= main.offsetHeight && window.scrollY <= main.offsetHeight + harmony.offsetHeight ) {
    const inner = harmony.querySelector('.inner');
    const text1 = harmony.querySelector('.scroll-text.first');
    const text2 = harmony.querySelector('.scroll-text.second');

    if ( window.scrollY >= (main.offsetHeight + inner.offsetHeight)/1.5 ) {
      text1.classList.add('hide');
      text2.classList.add('show');
    } else {
      text1.classList.remove('hide');
      text2.classList.remove('show');
    }
  }
});

spyEls.forEach((spyEl, index) => {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,
      triggerHook: .3
    })
    .setClassToggle(spyEl, 'show')
    .reverse(false)
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