const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const reasons = [
  ['01','She was studying.','If studying makes her guilty, I suppose the same pages somehow turn innocent when a boy reads them.'],
  ['02','She wanted to achieve something.','She had the audacity to want more from life. Really unreasonable of her.'],
  ['03','She was travelling.','Yeah, perhaps she should have stayed home. So next time your mother goes out, ask her to stay in too. There are plenty of people in this world who think just like you.'],
  ['04','She was working.',"She was working. Must have been another privilege we forgot she wasn't supposed to have."],
  ['05','She was serving patients.','And her fault was this: she was busy serving patients, while someone else was busy deciding she would be their next target, right?'],
  ['06','She was studying far from home.','She went far from home. Apparently, that was permission enough for someone.'],
  ['07','She was walking in a park.','Apparently, even taking a walk comes with terms and conditions.'],
  ['08','She said no.','Exactly. Her fault was making a decision for her own life. Apparently, that was enough to question her right to live.'],
  ['09','She trusted someone.','Trust is something we ask another human being to give us. Betraying it is not a fault in the person who trusted.'],
  ['10','She was alone.','Being alone is a circumstance, not consent. No woman owes the world company in order to deserve safety.'],
  ['11','She had a dream.','A dream is not an invitation. She was trying to become more, not asking to become less.'],
  ['12','She simply existed.','There was no fault to explain. There were dreams still becoming dreams, confidence still growing, a future she had not yet met — and then all of it was violently taken from her.'],
];

let ri = 0;
const stage = $('#reasonStage');

function showReason() {
  const [n, title, yesReply] = reasons[ri];
  stage.innerHTML = `
    <div class="reason-card">
      <span class="reason-number">${n}</span>
      <h2>${title}</h2>
      <p>Was that her fault?</p>
      <div class="answer-row">
        <button class="answer answer-no">No.</button>
        <button class="answer answer-yes">Yes.</button>
      </div>
      <div class="reason-response" aria-live="polite"></div>
    </div>`;

  const no = $('.answer-no');
  const yes = $('.answer-yes');
  const response = $('.reason-response');

  no.onclick = () => advanceReason();
  yes.onclick = () => {
    response.innerHTML = `<p class="yes-reply">${yesReply}</p><button class="continue-reason">Keep going.</button>`;
    yes.classList.add('chosen');
    no.classList.add('dimmed');
    response.classList.add('show');
    $('.continue-reason').onclick = advanceReason;
  };
}

function advanceReason() {
  ri++;
  if (ri < reasons.length) {
    showReason();
  } else {
    stage.innerHTML = `
      <div class="reason-card reason-final-card">
        <span class="reason-number">—</span>
        <h2>She existed.</h2>
        <p>Was that her fault?</p>
        <div class="final-fault">No fault.</div>
        <div class="final-fault-line">Yet she was punished — brutally, permanently, for something she never did.</div>
      </div>`;
    document.body.classList.add('existence');
    existencePulse();
  }
}

showReason();

$('#begin').onclick = () => document.querySelector('.threshold').scrollIntoView({behavior:'smooth'});
$('.threshold-no').onclick = () => document.querySelector('.reasons').scrollIntoView({behavior:'smooth'});
$('.threshold-yes').onclick = () => {
  const box = $('.threshold-response');
  box.innerHTML = '<p>Remember—you have a mother, and you may have a daughter.</br>Now look at your answer again.</p><button class="continue-threshold">Continue.</button>';
  box.classList.add('show');
  $('.threshold-yes').classList.add('chosen');
  $('.threshold-no').classList.add('dimmed');
  $('.continue-threshold').onclick = () => document.querySelector('.reasons').scrollIntoView({behavior:'smooth'});
};

const years = $('#years');
for (let y = 1; y <= 10; y++) {
  const s = document.createElement('span');
  s.textContent = `year ${y}`;
  years.appendChild(s);
}

const caseYears = $('#caseYears');
const cases = [
  ['2010','Dhaula Kuan gang-rape case — Delhi'],
  ['2010','Priyadarshini Mattoo case — Supreme Court verdict upheld life imprisonment'],
  ['2011','No single case is used as a symbol here. The year remains part of the record.'],
  ['2012','Delhi gang-rape and murder — Nirbhaya'],
  ['2012','Sowjanya rape-and-murder case — Karnataka'],
  ['2013','Mumbai Shakti Mills gang-rape cases'],
  ['2014','Badaun rape-and-death case'],
  ['2014','Dhaula Kuan case — five accused convicted and sentenced to life imprisonment'],
  ['2015','No single case is allowed to stand for the year. Thousands of other stories existed beyond the headlines.'],
  ['2016','Bulandshahr highway gang-rape case'],
  ['2017','Unnao rape case'],
  ['2017','Kathua case begins to emerge through the investigation of the 2018 crime'],
  ['2018','Kathua rape-and-murder case'],
  ['2018','Unnao case — investigation and legal proceedings continue'],
  ['2019','Hyderabad veterinary doctor rape-and-murder case'],
  ['2019','Unnao rape case — convictions in connected proceedings'],
  ['2020','Hathras assault-and-death case'],
  ['2020','Nirbhaya case — four adult convicts executed after 8 years of proceedings'],
  ['2021','Delhi Chhawla rape-and-murder case — later Supreme Court acquittal'],
  ['2022','Bilkis Bano case — remission controversy and later Supreme Court proceedings'],
  ['2023','Manipur sexual-violence case — nationwide scrutiny'],
  ['2023','Sowjanya case — accused acquitted by the trial court after the 2012 crime'],
  ['2024','RG Kar rape-and-murder case — Kolkata'],
  ['2024','2024 Delhi and Hathras rape cases among a continuing stream of reported crimes'],
  ['2025','RG Kar case — conviction and life sentence in January'],
  ['2025','The legal and public aftermath of major cases continued through appeals and related proceedings'],
  ['2026','Delhi Swaroop Nagar gang-rape and murder case — investigation ongoing'],
  ['2026','Aastha Kunj Park gang-rape case — Supreme Court takes suo motu cognisance'],
  ['2026','Greater Noida–Delhi sleeper-bus gang-rape case — chargesheet filed'],
];
caseYears.innerHTML = cases.map(([year,name]) => `<div class="case-year"><span>${year}</span><strong>${name}</strong></div>`).join('');

const steps = $$('[data-step]');
const bar = $('#progressBar');
function update() {
  const h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = h > 0 ? (scrollY / h * 100) + '%' : '0%';
}
addEventListener('scroll', update, {passive:true});
update();

const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('seen');
    if (e.target.classList.contains('threshold')) setMood('threshold');
    if (e.target.classList.contains('reasons')) setMood('reasons');
    if (e.target.classList.contains('ordinary')) setMood('ordinary');
    if (e.target.classList.contains('interrupt')) setMood('interrupt');
    if (e.target.classList.contains('fault')) setMood('fault');
    if (e.target.classList.contains('nothing')) setMood('nothing');
    if (e.target.classList.contains('after')) setMood('after');
    if (e.target.classList.contains('silence')) setMood('silence');
    if (e.target.classList.contains('final')) setMood('final');
  }
}), {threshold:.28});
steps.forEach(s => io.observe(s));

// No external audio file: a small Web Audio soundscape is generated in the browser.
let audioCtx = null;
let master = null;
let drone = null;
let high = null;
let pulse = null;
let pulseGain = null;
let noise = null;
let noiseGain = null;
let playing = false;

function createAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  master = audioCtx.createGain();
  master.gain.value = 0.0001;
  master.connect(audioCtx.destination);

  drone = audioCtx.createOscillator();
  drone.type = 'sine';
  drone.frequency.value = 52;
  const droneGain = audioCtx.createGain();
  droneGain.gain.value = 0.16;
  drone.connect(droneGain).connect(master);

  high = audioCtx.createOscillator();
  high.type = 'triangle';
  high.frequency.value = 104;
  const highGain = audioCtx.createGain();
  highGain.gain.value = 0.025;
  high.connect(highGain).connect(master);

  pulse = audioCtx.createOscillator();
  pulse.type = 'sine';
  pulse.frequency.value = 1.15;
  pulseGain = audioCtx.createGain();
  pulseGain.gain.value = 0.0;
  pulse.connect(pulseGain).connect(master);

  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i=0;i<data.length;i++) data[i] = (Math.random()*2-1) * 0.18;
  noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  noiseGain = audioCtx.createGain();
  noiseGain.gain.value = 0.006;
  noise.connect(noiseGain).connect(master);

  drone.start(); high.start(); pulse.start(); noise.start();
}

function setMood(section) {
  if (!playing || !audioCtx) return;
  const now = audioCtx.currentTime;
  const moods = {
    threshold: [46, 92, 0.002, 0.010],
    reasons:   [50, 100, 0.004, 0.012],
    ordinary:  [58, 116, 0.002, 0.008],
    interrupt: [43, 86, 0.010, 0.018],
    fault:     [48, 96, 0.004, 0.012],
    nothing:   [38, 76, 0.012, 0.020],
    after:     [42, 84, 0.006, 0.016],
    silence:   [34, 68, 0.014, 0.024],
    final:     [44, 88, 0.008, 0.018]
  };
  const [a,b,p,n] = moods[section] || moods.reasons;
  drone.frequency.exponentialRampToValueAtTime(a, now + 1.3);
  high.frequency.exponentialRampToValueAtTime(b, now + 1.3);
  pulseGain.gain.cancelScheduledValues(now);
  pulseGain.gain.linearRampToValueAtTime(p, now + 1.2);
  noiseGain.gain.linearRampToValueAtTime(n, now + 1.2);
}

function existencePulse() {
  if (!playing || !audioCtx) return;
  const now = audioCtx.currentTime;
  drone.frequency.exponentialRampToValueAtTime(30, now + .8);
  high.frequency.exponentialRampToValueAtTime(60, now + .8);
  pulseGain.gain.cancelScheduledValues(now);
  pulseGain.gain.linearRampToValueAtTime(.045, now + .4);
  pulseGain.gain.linearRampToValueAtTime(.004, now + 1.8);
}

$('#soundBtn').onclick = async () => {
  if (!audioCtx) createAudio();
  if (audioCtx.state === 'suspended') await audioCtx.resume();
  const now = audioCtx.currentTime;
  if (!playing) {
    master.gain.cancelScheduledValues(now);
    master.gain.exponentialRampToValueAtTime(0.11, now + 1.4);
    playing = true;
    $('#soundBtn span').textContent = 'on';
    setMood('reasons');
  } else {
    master.gain.cancelScheduledValues(now);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
    playing = false;
    $('#soundBtn span').textContent = 'off';
  }
};
