// JavaScript source code
"use strict";

$(document).ready(function () {
  var vidInt = $("#daIntro");
  var vidCon = $("#vidCont");

  vidInt.currentTime = 5;
  vidInt.css('opacity', '0.6');

  vidCon.css('opacity', '0.9');
  vidCon.css('background-color', '#000');

  $(document).on('click', '.navLink', function (event) {
    event.preventDefault();

    $(this).modalAnimate({
      modalTarget: 'modal-container',
      effect: $(this).data('effect'),
      autoEffect: true
    });

  });

  /**************************************/
  var angleStart = -360;

  function rotate(li, d) {
    $({ d: angleStart }).animate({ d: d }, {
      step: function (now) {
        $(li)
          .css({ transform: 'rotate(' + now + 'deg)' })
          .find('label')
          .css({ transform: 'rotate(' + (-now) + 'deg)' });
      }, duration: 0
    });
  }

  function toggleOptions(s) {
    $(s).toggleClass('open');
    var li = $(s).find('li');
    var deg = $(s).hasClass('half') ? 180 / (li.length - 1) : 360 / li.length;
    for (var i = 0; i < li.length; i++) {
      var d = $(s).hasClass('half') ? (i * deg) - 90 : i * deg;
      $(s).hasClass('open') ? rotate(li[i], d) : rotate(li[i], angleStart);
    }
  }

  $('.selector button').click(function (e) {
    toggleOptions($(this).parent());
  });

  function startToogleEffect() {
    setTimeout(function () { toggleOptions('.selector'); }, 1200);
  }

  $(document).on('click', '#navTeam', function (event) {
    event.preventDefault();
    startToogleEffect();
  });

  /***********************************/
  function setActiveSub() {
    var a = document.getElementsByTagName('a')
    for (i = 0; i < a.length; i++) {
      a[i].classList.remove('subActive');
    }
    elem.classList.add('subActive');
  }


});


