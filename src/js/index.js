$(document).ready(function () {
  // global variables
  var player,
    isPlaying = false, //setting video state
    posterImg = $(".section__video__holder__img img"),
    videoOverlay = $(".video_overlay"),
    videoTitle = $(".video_title"),
    videoBtn = $(".video_button");
  const tl = gsap.timeline({ paused: true });

  // youtube api ready
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("video", {
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  };

  // gsap timeline

  tl.to(
    videoTitle,
    {
      duration: 0.3,
      yPercent: 100,
      opacity: 0,
      ease: "expo.out",
    },
    0
  );
  tl.to(
    posterImg,
    {
      duration: 0.75,
      xPercent: -100,
      // opacity: 0,
      ease: "power2.out",
    },
    0
  );
  tl.to(
    videoOverlay,
    {
      duration: 1,
      xPercent: -100,
      opacity: 0,
      ease: "sine.out",
    },
    0.4
  );

  // animation on mousemove for circles

  $(document).mousemove(function (event) {
    var xPos = event.clientX / $(window).width() - 0.5,
      yPos = event.clientY / $(window).height() - 0.5,
      circle1 = $(".circle"),
      circle2 = $(".circle__l"),
      circle3 = $(".circle__m"),
      circle4 = $(".circle__s"),
      circle5 = $(".circle__xs");
    let c1 = gsap.timeline(),
      c2 = gsap.timeline(),
      c3 = gsap.timeline(),
      c4 = gsap.timeline(),
      c5 = gsap.timeline();

    c1.to(circle1, 1, {
      y: xPos * 20,
      x: yPos * 20,
      ease: Power1.easeOut,
    });
    c2.to(circle2, 1, {
      y: xPos * 100,
      x: yPos * 40,
      ease: Power1.easeOut,
    });
    c3.to(circle3, 1, {
      y: xPos * 40,
      x: yPos * 60,
      ease: Power1.easeOut,
    });
    c4.to(circle4, 1, {
      y: xPos * 50,
      x: yPos * 30,
      ease: Power1.easeOut,
    });
    c5.to(circle5, 1, {
      y: xPos * 30,
      x: yPos * 60,
      ease: Power1.easeOut,
    });
  });

  // video player state
  function playPause(state) {
    $("#video")
      .get(0) // get object
      .contentWindow.postMessage(
        '{"event":"command","func":"' + state + 'Video","args":""}',
        "*"
      );
  }

  // btn on click for play/pause state
  $(document).on("click", "#play-button", function () {
    if (isPlaying == true) {
      playPause("pause");
      isPlaying = false;
      tl.reverse();
      $(this).removeClass("btn_active");
    } else {
      tl.play();
      $(this).addClass("btn_active");
      setTimeout(function () {
        playPause("play");
        isPlaying = true;
      }, 100);
    }
  });

  // video end state
  function onPlayerStateChange(event) {
    if (event.data === 0) {
      tl.reverse();
      player.seekTo(0); // setting video to start again from beggining
      $("#play-button").removeClass("btn_active");
      playPause("pause");
      isPlaying = false;
    }
  }
});
