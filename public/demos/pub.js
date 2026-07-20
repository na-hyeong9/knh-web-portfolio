// ============================================
// 1. 데이터
// ============================================

// src에 실제 영상 주소를 넣으면 된다
var videos = [
  {
    title: "영상 제목 입니다.",
    src: "/videos/test01.mp4",
    type: "video/mp4",
    poster: "",
    like: 28000,
    comment: 640,
    share: 1500,
  },
  {
    title: "두 번째 영상 입니다.",
    src: "/videos/test02.mp4",
    type: "video/mp4",
    poster: "",
    like: 12400,
    comment: 318,
    share: 902,
  },
  {
    title: "세 번째 영상 입니다.",
    src: "/videos/test03.mp4",
    type: "video/mp4",
    poster: "",
    like: 45600,
    comment: 1204,
    share: 3300,
  },
  {
    title: "네 번째 영상 입니다.",
    src: "/videos/test04.mp4",
    type: "video/mp4",
    poster: "",
    like: 7800,
    comment: 96,
    share: 214,
  },
];

var comments = [
  {
    user: "@hana_dev",
    time: "2시간",
    text: "이거 진짜 유용하네요 저장합니다 🙌",
    like: 214,
    color1: "#f78fb3",
    color2: "#a06bd8",
  },
  {
    user: "@june_o",
    time: "5시간",
    text: "알고리즘이 또 일을 하네",
    like: 98,
    color1: "#2ee6a8",
    color2: "#0f9e7a",
  },
  {
    user: "@sora.kim",
    time: "1일",
    text: "브금 정보 좀 알려주세요!",
    like: 41,
    color1: "#ffb020",
    color2: "#f57c00",
  },
  {
    user: "@minter",
    time: "1일",
    text: "0:12 부분 미쳤다 ㅋㅋㅋ",
    like: 156,
    color1: "#a78bff",
    color2: "#7c5cff",
  },
];

// ============================================
// 2. 요소 가져오기
// ============================================

// 액션 버튼(좋아요·댓글·공유·저장)은 영상마다 만들어지므로
// 여기서 전역으로 잡지 않고 이벤트 위임 + renderActions()로 다룬다.
var videoStack = document.getElementById("videoStack");

var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");

var commentsBox = document.getElementById("comments");
var commentTotal = document.getElementById("commentTotal");
var commentList = document.getElementById("commentList");
var commentInput = document.getElementById("commentInput");
var postBtn = document.getElementById("postBtn");
var closeBtn = document.getElementById("closeBtn");

// ============================================
// 3. 상태값
// ============================================

var current = 0; // 지금 보고 있는 영상 번호
var isSoundOn = false; // 소리 켜짐 여부 (자동재생하려면 처음엔 음소거여야 함)
var currentVolume = 1; // 볼륨 (음소거 버튼 호버 시 나오는 슬라이더 값)
var isCommentsOpen = false;

var players = []; // Video.js 플레이어들을 담아둘 배열

var likedList = [];
var savedList = [];
for (var i = 0; i < videos.length; i++) {
  likedList.push(false);
  savedList.push(false);
}

// ============================================
// 4. 도움 함수
// ============================================

function formatCount(number) {
  if (number >= 10000) {
    var man = (number / 10000).toFixed(1);
    if (man.indexOf(".0") !== -1) {
      man = man.replace(".0", "");
    }
    return man + "만";
  }
  if (number >= 1000) {
    var chun = (number / 1000).toFixed(1);
    if (chun.indexOf(".0") !== -1) {
      chun = chun.replace(".0", "");
    }
    return chun + "천";
  }
  return "" + number;
}

function formatTime(seconds) {
  seconds = Math.floor(Number(seconds) || 0);
  return Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
}

// ============================================
// 5. 슬라이드 + Video.js 플레이어 만들기
// ============================================

function createPlayers() {
  for (var i = 0; i < videos.length; i++) {
    var video = videos[i];

    // 각 영상을 세로 트랙에 이어 붙인다.
    var videoItem = document.createElement("div");
    videoItem.className = "video-item";

    // video 태그 만들기
    var videoTag = document.createElement("video");
    videoTag.id = "video-" + i;
    videoTag.className = "video-js";
    videoTag.setAttribute("playsinline", ""); // 아이폰에서 전체화면으로 안 튀게
    videoTag.setAttribute("preload", "metadata");
    if (video.poster) {
      videoTag.setAttribute("poster", video.poster);
    }

    // 영상 박스(.player) 안에는 영상과 그 위에 얹히는 UI만 넣는다.
    var playerBox = document.createElement("section");
    playerBox.className = "player";
    playerBox.appendChild(videoTag);
    playerBox.insertAdjacentHTML(
      "beforeend",
      '<div class="mute-control">' +
        '<button class="mute" type="button" data-control="mute" aria-pressed="false" aria-label="Enable sound">' +
        '<svg class="icon-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none"/><path d="m17 9 5 6M22 9l-5 6"/></svg>' +
        '<svg class="icon-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none"/><path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14"/></svg>' +
        "</button>" +
        '<input class="mute-volume" data-control="mute-volume" type="range" min="0" max="1" step="0.05" value="1" aria-label="볼륨 조절">' +
        "</div>" +
        '<div class="meta"><div class="meta-user"><span class="avatar"></span><b>@member</b></div><p>' +
        video.title +
        "</p></div>" +
        // 일시정지 상태일 때 가운데에 떠오르는 재생 아이콘
        '<div class="play-indicator" aria-hidden="true">' +
        '<span><svg viewBox="0 0 24 24" fill="currentColor"><path d="m8 5 11 7-11 7z"/></svg></span>' +
        "</div>" +
        '<div class="progress"><span></span></div>',
    );
    videoItem.appendChild(playerBox);

    // 액션 버튼은 영상 박스 "바깥"에 두되 같은 슬라이드 안이라 함께 움직인다.
    videoItem.insertAdjacentHTML(
      "beforeend",
      '<div class="actions">' +
        '<div class="action">' +
        '<button class="action-btn like" type="button" data-action="like" aria-pressed="false" aria-label="좋아요">' +
        '<svg viewBox="0 0 24 24"><path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.8 8.8-8.8a5 5 0 0 0 0-7.1z"/></svg>' +
        "</button>" +
        '<span class="action-label like-count"></span>' +
        "</div>" +
        '<div class="action">' +
        '<button class="action-btn comment-btn" type="button" data-action="comment" aria-expanded="false" aria-controls="comments" aria-label="댓글 보기">' +
        '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 20.5l1.6-4.9A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z"/></svg>' +
        "</button>" +
        '<span class="action-label comment-count"></span>' +
        "</div>" +
        '<div class="action">' +
        '<button class="action-btn" type="button" data-action="share" aria-label="공유">' +
        '<svg viewBox="0 0 24 24"><path d="M4 18c0-6 5-8 11-8"/><path d="m14 5 6 5-6 5"/></svg>' +
        "</button>" +
        '<span class="action-label share-count"></span>' +
        "</div>" +
        '<div class="action">' +
        '<button class="action-btn save" type="button" data-action="save" aria-pressed="false" aria-label="저장">' +
        '<svg viewBox="0 0 24 24"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>' +
        "</button>" +
        '<span class="action-label">저장</span>' +
        "</div>" +
        "</div>",
    );
    videoStack.appendChild(videoItem);

    // Video.js 붙이기
    var player = videojs(videoTag, {
      controls: false, // 기본 컨트롤바 안 씀
      autoplay: false, // 재생은 직접
      muted: true, // 자동재생을 위해 처음엔 음소거
      loop: true, // 끝나면 다음으로 넘기지 않고 같은 영상을 반복 재생
      fill: true,
      preload: "metadata",
      sources: [{ src: video.src, type: video.type }],
    });

    players.push(player);
  }

  // 플레이어를 다 만든 뒤에 이벤트를 건다
  for (var j = 0; j < players.length; j++) {
    addPlayerEvents(players[j], j);
  }
}

// 플레이어 하나에 이벤트 붙이기
function addPlayerEvents(player, index) {
  // 재생 시간이 바뀔 때마다 진행 바 업데이트
  player.on("timeupdate", function () {
    // 지금 보고 있는 영상이 아니면 무시
    if (index !== current) return;

    var duration = player.duration();
    if (!duration) return;

    var screen = videoStack.children[index];
    var percent = (player.currentTime() / duration) * 100;
    screen.querySelector(".progress span").style.width = percent + "%";
  });

  // 재생 / 일시정지에 따라 가운데 아이콘을 띄우고 감춘다
  player.on("play", function () {
    videoStack.children[index].classList.remove("is-paused");
  });

  player.on("pause", function () {
    videoStack.children[index].classList.add("is-paused");
  });
}

// ============================================
// 6. 재생 제어
// ============================================

// 새로 보게 될 영상을 처음으로 되돌린다.
// 실제 재생/정지와 음소거 여부는 노출 비율(updateAutoplayByVisibility)이 결정한다.
function playCurrent() {
  if (players[current]) {
    players[current].currentTime(0);
  }

  // 전환이 진행되는 동안 노출 비율을 추적
  pokeVisibilityWatch();

  // 다음 영상 미리 받기
  preloadNext();
}

function preloadNext() {
  var next = current + 1;
  if (next > players.length - 1) return;

  players[next].load();
}

// ============================================
// 6-1. 노출 비율에 따른 재생 제어
// getBoundingClientRect()로 영상이 화면에 얼마나 보이는지 계산해서
//   50% 이상 보이면 -> 음소거 자동재생
//   100% 보이면     -> 소리를 켜고 재생
//   50% 미만이면    -> 정지
// ============================================

var HALF_VISIBLE = 0.5;
var FULLY_VISIBLE = 0.99; // 소수점 오차를 감안한 '100%'
var visibilityState = []; // 영상별 'hidden' | 'half' | 'full'

// 요소가 뷰포트 안에 세로로 얼마나 보이는지 0~1로 돌려준다.
function visibleRatioOf(element) {
  var rect = element.getBoundingClientRect();
  if (rect.height <= 0) return 0;

  var viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  var visibleTop = Math.max(rect.top, 0);
  var visibleBottom = Math.min(rect.bottom, viewportHeight);
  var visibleHeight = Math.max(0, visibleBottom - visibleTop);

  return visibleHeight / rect.height;
}

// 브라우저가 소리 있는 자동재생을 막으면 음소거로 되돌려 다시 시도한다.
function playSafely(player, wantSound) {
  var playPromise = player.play();
  if (!playPromise || !playPromise.catch) return;

  playPromise.catch(function () {
    player.muted(true);
    if (wantSound) {
      isSoundOn = false; // 실제 상태에 맞게 버튼 UI도 되돌린다
      applySound();
    }
    player.play();
  });
}

function updateAutoplayByVisibility() {
  for (var i = 0; i < players.length; i++) {
    var item = videoStack.children[i];
    if (!item) continue;

    var box = item.querySelector(".player") || item;
    var ratio = visibleRatioOf(box);
    var player = players[i];

    var next =
      ratio >= FULLY_VISIBLE
        ? "full"
        : ratio >= HALF_VISIBLE
          ? "half"
          : "hidden";

    // 상태가 바뀌는 순간에만 손댄다.
    // (매 프레임 덮어쓰면 사용자가 누른 음소거가 계속 풀려버린다)
    if (visibilityState[i] === next) continue;
    visibilityState[i] = next;

    if (next === "full") {
      // 100% 노출 - 소리를 켜고 재생
      isSoundOn = true;
      player.volume(currentVolume);
      player.muted(false);
      playSafely(player, true);
      applySound();
    } else if (next === "half") {
      // 50% 이상 노출 - 음소거로 자동재생
      player.muted(true);
      playSafely(player, false);
    } else {
      player.pause();
    }
  }
}

// 슬라이드가 움직이는 동안에는 매 프레임 노출 비율 재측정.
var visibilityRaf = null;
var visibilityStopTimer = null;

function watchVisibility() {
  updateAutoplayByVisibility();
  visibilityRaf = window.requestAnimationFrame(watchVisibility);
}

// 전환·드래그가 일어날 때 호출하면 잠시 동안 추적
function pokeVisibilityWatch(duration) {
  if (visibilityRaf === null) watchVisibility();

  window.clearTimeout(visibilityStopTimer);
  visibilityStopTimer = window.setTimeout(function () {
    window.cancelAnimationFrame(visibilityRaf);
    visibilityRaf = null;
    updateAutoplayByVisibility(); // 멈춘 자리에서 최종 상태 확정
  }, duration || 800);
}

// ============================================
// 7. 화면 그리기
// ============================================

// 영상마다 붙어있는 액션 버튼들을 현재 상태에 맞게 갱신한다.
function renderActions() {
  for (var i = 0; i < videoStack.children.length; i++) {
    var actions = videoStack.children[i].querySelector(".actions");
    if (!actions) continue;

    var item = videos[i];
    var liked = likedList[i];
    var saved = savedList[i];

    actions.querySelector(".like-count").textContent = formatCount(
      item.like + (liked ? 1 : 0),
    );
    actions.querySelector(".comment-count").textContent = formatCount(
      item.comment,
    );
    actions.querySelector(".share-count").textContent = formatCount(item.share);

    var likeButton = actions.querySelector('[data-action="like"]');
    likeButton.classList.toggle("is-on", liked);
    likeButton.setAttribute("aria-pressed", String(liked));

    var saveButton = actions.querySelector('[data-action="save"]');
    saveButton.classList.toggle("is-on", saved);
    saveButton.setAttribute("aria-pressed", String(saved));

    var commentButton = actions.querySelector('[data-action="comment"]');
    var opened = isCommentsOpen && i === current;
    commentButton.classList.toggle("is-on", opened);
    commentButton.setAttribute("aria-expanded", String(opened));
  }
}

function render(skipTransition) {
  var video = videos[current];

  if (skipTransition) {
    videoStack.classList.add("is-resetting");
  }
  videoStack.style.setProperty(
    "--video-offset",
    -(current * videoStack.clientHeight) + "px",
  );
  if (skipTransition) {
    window.requestAnimationFrame(function () {
      videoStack.classList.remove("is-resetting");
    });
  }

  commentTotal.textContent = formatCount(video.comment) + "개";
  renderActions();

  // 새 영상이니까 진행 바는 0부터
  videoStack.children[current].querySelector(".progress span").style.width =
    "0%";

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === videos.length - 1;
}

window.addEventListener("resize", function () {
  render(true);
  updateAutoplayByVisibility();
});

// 페이지 자체가 스크롤되는 환경(임베드 등)에서도 노출 비율로 제어
window.addEventListener(
  "scroll",
  function () {
    pokeVisibilityWatch(300);
  },
  { passive: true },
);

// ============================================
// 8. 댓글 그리기
// ============================================

function renderComments() {
  commentList.innerHTML = "";

  for (var i = 0; i < comments.length; i++) {
    var comment = comments[i];

    var item = document.createElement("article");
    item.className = "comment";
    item.innerHTML =
      '<span class="avatar" style="background:linear-gradient(145deg,' +
      comment.color1 +
      "," +
      comment.color2 +
      ')"></span>' +
      '<div class="comment-body">' +
      '<div class="comment-meta">' +
      comment.user +
      " · " +
      comment.time +
      "</div>" +
      '<p class="comment-text"></p>' +
      '<div class="comment-tools">' +
      '<button class="comment-like" type="button" data-index="' +
      i +
      '" aria-pressed="false" aria-label="댓글 좋아요">' +
      '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.8 8.8-8.8a5 5 0 0 0 0-7.1z"/></svg>' +
      "<span>" +
      comment.like +
      "</span>" +
      "</button>" +
      '<button class="comment-reply" type="button">답글</button>' +
      "</div>" +
      "</div>";

    // 사용자가 쓴 글자는 textContent로 넣어야 안전하다
    item.querySelector(".comment-text").textContent = comment.text;

    commentList.appendChild(item);
  }
}

// ============================================
// 9. 영상 이동
// ============================================

function goTo(step) {
  var next = current + step;

  if (next < 0) return;
  if (next > videos.length - 1) return;

  if (isTransitioning) return;

  isTransitioning = true;
  current = next;
  render();
  playCurrent();

  window.clearTimeout(transitionTimer);
  transitionTimer = window.setTimeout(function () {
    isTransitioning = false;
  }, 540);
}

// ============================================
// 10. 댓글창 열고 닫기
// ============================================

function openComments() {
  isCommentsOpen = true;
  commentsBox.classList.add("is-open");
  document.body.classList.add("comments-open");
  renderActions();
  commentInput.focus();
}

function closeComments() {
  isCommentsOpen = false;
  commentsBox.classList.remove("is-open");
  document.body.classList.remove("comments-open");
  renderActions();
}

// ============================================
// 11. 이벤트 연결
// ============================================

// 음소거 버튼
// 버튼이 영상마다 하나씩 동적으로 생기므로 videoStack에 이벤트 위임으로 붙인다.
// (capture 단계로 잡아서 아래의 '영상 클릭 = 재생/일시정지'와 겹치지 않게 한다)
videoStack.addEventListener(
  "click",
  function (event) {
    var muteBtn = event.target.closest('[data-control="mute"]');
    if (!muteBtn) return;

    event.stopPropagation();

    isSoundOn = !isSoundOn;

    // 소리를 켜는데 볼륨이 0이면 들리도록 올려준다.
    if (isSoundOn && currentVolume === 0) {
      currentVolume = 1;
    }

    applySound();
  },
  true,
);

// 음소거 버튼에 호버하면 나오는 볼륨 슬라이더
videoStack.addEventListener("input", function (event) {
  var slider = event.target.closest('[data-control="mute-volume"]');
  if (!slider) return;

  currentVolume = Number(slider.value);
  isSoundOn = currentVolume > 0; // 0으로 내리면 음소거, 올리면 자동으로 해제

  applySound();
});

// 음소거 버튼·볼륨 슬라이더를 누를 때는 스와이프/재생토글이 같이 먹지 않게 막는다.
// (여기서 막지 않으면 스와이프 쪽 setPointerCapture 때문에 click이 videoStack으로
//  넘어가버려서 음소거 버튼 클릭이 무시된다)
videoStack.addEventListener(
  "pointerdown",
  function (event) {
    if (event.target.closest(".mute-control, .actions")) {
      event.stopPropagation();
    }
  },
  true,
);

videoStack.addEventListener(
  "click",
  function (event) {
    if (event.target.closest('[data-control="mute-volume"]')) {
      event.stopPropagation();
    }
  },
  true,
);

// ============================================
// 컨트롤바 (클릭·드래그로 구간 이동)
// ============================================

var isSeeking = false;

function seekTo(event) {
  var bar = videoStack.children[current].querySelector(".progress");
  var player = players[current];
  if (!bar || !player) return;

  var duration = player.duration();
  if (!duration) return;

  // 바 안에서 클릭한 위치의 비율(0~1)을 그대로 재생 위치로 쓴다.
  var rect = bar.getBoundingClientRect();
  var ratio = (event.clientX - rect.left) / rect.width;
  ratio = Math.min(1, Math.max(0, ratio));

  player.currentTime(ratio * duration);
  bar.querySelector("span").style.width = ratio * 100 + "%";
}

videoStack.addEventListener(
  "pointerdown",
  function (event) {
    if (!event.target.closest(".progress")) return;

    // 스와이프 이동·재생토글이 같이 먹지 않게 막는다.
    event.stopPropagation();
    isSeeking = true;
    seekTo(event);
  },
  true,
);

// 바 밖으로 나가도 계속 끌 수 있게 window에서 받는다.
window.addEventListener("pointermove", function (event) {
  if (isSeeking) seekTo(event);
});

window.addEventListener("pointerup", function () {
  isSeeking = false;
});

videoStack.addEventListener(
  "click",
  function (event) {
    if (event.target.closest(".progress")) {
      event.stopPropagation();
    }
  },
  true,
);

// 현재 소리 상태를 플레이어와 모든 버튼·슬라이더에 반영
function applySound() {
  if (players[current]) {
    players[current].volume(currentVolume);
    players[current].muted(!isSoundOn);
  }

  var muteButtons = videoStack.querySelectorAll('[data-control="mute"]');
  for (var m = 0; m < muteButtons.length; m++) {
    if (isSoundOn) {
      muteButtons[m].classList.add("is-sound-on");
      muteButtons[m].setAttribute("aria-label", "소리 끄기");
    } else {
      muteButtons[m].classList.remove("is-sound-on");
      muteButtons[m].setAttribute("aria-label", "소리 켜기");
    }
    muteButtons[m].setAttribute("aria-pressed", String(!isSoundOn));
  }

  var sliders = videoStack.querySelectorAll('[data-control="mute-volume"]');
  for (var s = 0; s < sliders.length; s++) {
    sliders[s].value = isSoundOn ? currentVolume : 0;
  }
}

// 영상 눌러서 재생 / 일시정지
videoStack.addEventListener("click", function () {
  if (suppressVideoClick) return;

  var player = players[current];

  if (player.paused()) {
    player.play();
  } else {
    player.pause();
  }
});

// 액션 버튼도 영상마다 있으므로 이벤트 위임으로 처리한다.
// (capture 단계 + stopPropagation 으로 '영상 클릭 = 재생/일시정지'와 겹치지 않게)
videoStack.addEventListener(
  "click",
  function (event) {
    var button = event.target.closest("[data-action]");
    if (!button) return;

    event.stopPropagation();

    var item = button.closest(".video-item");
    var index = Array.prototype.indexOf.call(videoStack.children, item);
    if (index < 0) return;

    var action = button.getAttribute("data-action");

    if (action === "like") {
      likedList[index] = !likedList[index];
      renderActions();
    } else if (action === "save") {
      savedList[index] = !savedList[index];
      renderActions();
    } else if (action === "share") {
      if (navigator.share) {
        navigator.share({ title: videos[index].title, url: location.href });
      } else {
        alert("공유 링크: " + location.href);
      }
    } else if (action === "comment") {
      if (isCommentsOpen) {
        closeComments();
      } else {
        openComments();
      }
    }
  },
  true,
);

closeBtn.addEventListener("click", function () {
  closeComments();
});

prevBtn.addEventListener("click", function () {
  goTo(-1);
});

nextBtn.addEventListener("click", function () {
  goTo(1);
});

// 댓글 좋아요 (이벤트 위임)
commentList.addEventListener("click", function (event) {
  var button = event.target.closest(".comment-like");
  if (!button) return;

  var index = Number(button.dataset.index);
  var comment = comments[index];
  var countSpan = button.querySelector("span");

  if (button.classList.contains("is-on")) {
    button.classList.remove("is-on");
    button.setAttribute("aria-pressed", "false");
    countSpan.textContent = comment.like;
  } else {
    button.classList.add("is-on");
    button.setAttribute("aria-pressed", "true");
    countSpan.textContent = comment.like + 1;
  }
});

commentInput.addEventListener("input", function () {
  if (commentInput.value.trim() === "") {
    postBtn.disabled = true;
  } else {
    postBtn.disabled = false;
  }
});

commentInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && postBtn.disabled === false) {
    postBtn.click();
  }
});

postBtn.addEventListener("click", function () {
  var text = commentInput.value.trim();
  if (text === "") return;

  comments.unshift({
    user: "@나",
    time: "방금",
    text: text,
    like: 0,
    color1: "#4d9dff",
    color2: "#1b6fd6",
  });

  videos[current].comment = videos[current].comment + 1;

  commentInput.value = "";
  postBtn.disabled = true;

  renderComments();
  render();
  commentList.scrollTop = 0;
});

// 키보드 조작
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeComments();
    return;
  }

  if (event.target.tagName === "INPUT") return;

  if (event.key === "ArrowUp") {
    event.preventDefault();
    goTo(-1);
  }
  if (event.key === "ArrowDown") {
    event.preventDefault();
    goTo(1);
  }
  if (event.key === " ") {
    event.preventDefault();
    var player = players[current];
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  }
});

// 마우스 휠과 터치 입력은 한 번의 전환이 끝날 때까지 잠근다.
var isScrolling = false;
var isTransitioning = false;
var transitionTimer = null;

videoStack.addEventListener("wheel", function (event) {
  if (isScrolling) return;
  if (Math.abs(event.deltaY) < 12) return;

  event.preventDefault();
  isScrolling = true;

  if (event.deltaY > 0) {
    goTo(1);
  } else {
    goTo(-1);
  }

  setTimeout(function () {
    isScrolling = false;
  }, 600);
});

// 모바일/태블릿: 손가락을 따라 움직이고 놓는 지점에서 스냅한다.
var pointerStartY = 0;
var pointerDeltaY = 0;
var pointerActive = false;
var suppressVideoClick = false;

videoStack.addEventListener("pointerdown", function (event) {
  if (isTransitioning || (event.pointerType === "mouse" && event.button !== 0))
    return;

  pointerActive = true;
  pointerStartY = event.clientY;
  pointerDeltaY = 0;
  videoStack.classList.add("is-resetting");
  videoStack.setPointerCapture(event.pointerId);
});

videoStack.addEventListener("pointermove", function (event) {
  if (!pointerActive) return;

  // 손가락을 따라 트랙이 움직이는 동안에도 노출 비율을 계속 재계산한다
  pokeVisibilityWatch(400);

  var playerHeight = videoStack.clientHeight;
  pointerDeltaY = event.clientY - pointerStartY;

  // 첫/마지막 영상에서는 저항감을 주고 트랙 밖으로 과도하게 끌리지 않게 한다.
  if (
    (current === 0 && pointerDeltaY > 0) ||
    (current === videos.length - 1 && pointerDeltaY < 0)
  ) {
    pointerDeltaY *= 0.28;
  }

  videoStack.style.setProperty(
    "--video-offset",
    -(current * playerHeight) + pointerDeltaY + "px",
  );
});

function finishPointerGesture(event) {
  if (!pointerActive) return;

  pointerActive = false;
  videoStack.classList.remove("is-resetting");

  if (videoStack.hasPointerCapture(event.pointerId)) {
    videoStack.releasePointerCapture(event.pointerId);
  }

  var threshold = Math.max(56, videoStack.clientHeight * 0.12);
  if (Math.abs(pointerDeltaY) >= threshold) {
    var step = pointerDeltaY < 0 ? 1 : -1;
    var canMove =
      (step === 1 && current < videos.length - 1) ||
      (step === -1 && current > 0);

    if (canMove) {
      suppressVideoClick = true;
      goTo(step);
      window.setTimeout(function () {
        suppressVideoClick = false;
      }, 0);
    } else {
      render();
    }
  } else {
    render();
  }
}

videoStack.addEventListener("pointerup", finishPointerGesture);
videoStack.addEventListener("pointercancel", finishPointerGesture);

// 다른 탭으로 가면 멈추고, 돌아오면 다시 재생
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    players[current].pause();
  } else {
    players[current].play();
  }
});

// ============================================
// 12. 시작
// ============================================

createPlayers();
renderComments();
render();
playCurrent();
