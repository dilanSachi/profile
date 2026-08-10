(function () {
  'use strict';

  var topbarNav = document.getElementById('topbarNav');
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.querySelectorAll('.nav__link');
  var sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  menuBtn.addEventListener('click', function () {
    topbarNav.classList.toggle('open');
    menuBtn.classList.toggle('open');
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      topbarNav.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });

  // Active nav link on scroll
  function setActiveLink() {
    var scrollY = window.scrollY + 80;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  // Fade-in on scroll
  var fadeEls = document.querySelectorAll('.fade-in');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  fadeEls.forEach(function (el) { observer.observe(el); });

  // Hero image carousel
  var gallery = document.getElementById('heroGallery');
  if (gallery) {
    var images = gallery.querySelectorAll('.hero__image');
    var dots = gallery.querySelectorAll('.hero__dot');
    var current = 0;
    var timer;

    function showSlide(index) {
      current = index;
      images.forEach(function (img, i) {
        img.classList.toggle('active', i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      showSlide((current + 1) % images.length);
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        showSlide(Number(dot.dataset.index));
        clearInterval(timer);
        timer = setInterval(nextSlide, 5000);
      });
    });

    timer = setInterval(nextSlide, 5000);
  }

  // YouTube click-to-play (avoids Error 153 on embed)
  var videoPlay = document.getElementById('videoPlay');
  var videoPlayer = document.getElementById('videoPlayer');
  if (videoPlay && videoPlayer) {
    videoPlay.addEventListener('click', function () {
      var videoId = videoPlayer.dataset.videoId;
      var origin = window.location.origin;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId +
        '?autoplay=1&rel=0&modestbranding=1&origin=' + encodeURIComponent(origin);
      iframe.title = 'Ballerina Integration Tutorial';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      videoPlayer.innerHTML = '';
      videoPlayer.appendChild(iframe);
    });
  }
})();
