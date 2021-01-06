/**
 jQuery Masked Input Plugin
 Copyright (c) 2007 - 2014 Josh Bush (digitalbush.com)
 Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
 Version: 1.4.0
 */

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function (a) {
    var b, c = navigator.userAgent, d = /iphone/i.test(c), e = /chrome/i.test(c), f = /android/i.test(c);
    a.mask = {
        definitions: {9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]"},
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, a.fn.extend({
        caret: function (a, b) {
            var c;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select())
            })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
                begin: a,
                end: b
            })
        }, unmask: function () {
            return this.trigger("unmask")
        }, mask: function (c, g) {
            var h, i, j, k, l, m, n, o;
            if (!c && this.length > 0) {
                h = a(this[0]);
                var p = h.data(a.mask.dataName);
                return p ? p() : void 0
            }
            return g = a.extend({
                autoclear: a.mask.autoclear,
                placeholder: a.mask.placeholder,
                completed: null
            }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
                "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null)
            }), this.trigger("unmask").each(function () {
                function h() {
                    if (g.completed) {
                        for (var a = l; m >= a; a++) if (j[a] && C[a] === p(a)) return;
                        g.completed.call(B)
                    }
                }

                function p(a) {
                    return g.placeholder.charAt(a < g.placeholder.length ? a : 0)
                }

                function q(a) {
                    for (; ++a < n && !j[a];) ;
                    return a
                }

                function r(a) {
                    for (; --a >= 0 && !j[a];) ;
                    return a
                }

                function s(a, b) {
                    var c, d;
                    if (!(0 > a)) {
                        for (c = a, d = q(b); n > c; c++) if (j[c]) {
                            if (!(n > d && j[c].test(C[d]))) break;
                            C[c] = C[d], C[d] = p(d), d = q(d)
                        }
                        z(), B.caret(Math.max(l, a))
                    }
                }

                function t(a) {
                    var b, c, d, e;
                    for (b = a, c = p(a); n > b; b++) if (j[b]) {
                        if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
                        c = e
                    }
                }

                function u() {
                    var a = B.val(), b = B.caret();
                    if (a.length < o.length) {
                        for (A(!0); b.begin > 0 && !j[b.begin - 1];) b.begin--;
                        if (0 === b.begin) for (; b.begin < l && !j[b.begin];) b.begin++;
                        B.caret(b.begin, b.begin)
                    } else {
                        for (A(!0); b.begin < n && !j[b.begin];) b.begin++;
                        B.caret(b.begin, b.begin)
                    }
                    h()
                }

                function v() {
                    A(), B.val() != E && B.change()
                }

                function w(a) {
                    if (!B.prop("readonly")) {
                        var b, c, e, f = a.which || a.keyCode;
                        o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault())
                    }
                }

                function x(b) {
                    if (!B.prop("readonly")) {
                        var c, d, e, g = b.which || b.keyCode, i = B.caret();
                        if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
                            if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                                if (t(c), C[c] = d, z(), e = q(c), f) {
                                    var k = function () {
                                        a.proxy(a.fn.caret, B, e)()
                                    };
                                    setTimeout(k, 0)
                                } else B.caret(e);
                                i.begin <= m && h()
                            }
                            b.preventDefault()
                        }
                    }
                }

                function y(a, b) {
                    var c;
                    for (c = a; b > c && n > c; c++) j[c] && (C[c] = p(c))
                }

                function z() {
                    B.val(C.join(""))
                }

                function A(a) {
                    var b, c, d, e = B.val(), f = -1;
                    for (b = 0, d = 0; n > b; b++) if (j[b]) {
                        for (C[b] = p(b); d++ < e.length;) if (c = e.charAt(d - 1), j[b].test(c)) {
                            C[b] = c, f = b;
                            break
                        }
                        if (d > e.length) {
                            y(b + 1, n);
                            break
                        }
                    } else C[b] === e.charAt(d) && d++, k > b && (f = b);
                    return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l
                }

                var B = a(this), C = a.map(c.split(""), function (a, b) {
                    return "?" != a ? i[a] ? p(b) : a : void 0
                }), D = C.join(""), E = B.val();
                B.data(a.mask.dataName, function () {
                    return a.map(C, function (a, b) {
                        return j[b] && a != p(b) ? a : null
                    }).join("")
                }), B.one("unmask", function () {
                    B.off(".mask").removeData(a.mask.dataName)
                }).on("focus.mask", function () {
                    if (!B.prop("readonly")) {
                        clearTimeout(b);
                        var a;
                        E = B.val(), a = A(), b = setTimeout(function () {
                            z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a)
                        }, 10)
                    }
                }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
                    B.prop("readonly") || setTimeout(function () {
                        var a = A(!0);
                        B.caret(a), h()
                    }, 0)
                }), e && f && B.off("input.mask").on("input.mask", u), A()
            })
        }
    })
});

jQuery(document).ready(function () {

    var $ = jQuery, $doc = $(document), $win = $(window);

  var onInitialized = function(e){
    // сначала выделяем нужный слайд...
    var current = $($('.index__slider .active img')[0]);
    var other = $('.index__slider__item');
    var parent = current.parent();
    other.removeClass('focus');
    parent.addClass('focus');

    // меняем фон
    var slide = current.attr('data-img');

    $('.index__banner__item').removeClass('active');
    $('#' + slide).addClass('active');
  };

  var onInitializedProduct = function(e){
    // сначала выделяем нужный слайд...
    var $this = $('.catalog-full__slider__gallery');
    var current = $($('.active img', $this)[0]);
    var other = $('.item', $this);
    var parent = current.parent();
    other.removeClass('focus');
    parent.addClass('focus');


    // меняем фон
    var photo = current.attr('data-photo');

    $('.catalog-full__slider__big-photo').removeClass('animated');
    setTimeout(function () {
      $('.catalog-full__slider__big-photo').css({
        backgroundImage: 'url(images/'+photo+')'
      }).addClass('animated');

    }, 500);
  };

  $('[name="phone"]').mask("+7(999)999-99-99");

  $('.index__slider').owlCarousel({
    loop: true,
    nav: true,
    dotsEach: false,
    autoplay: true,
    smartSpeed: 4000,
    navigation: false,
    navText: [],
    responsive:{
      0:{
        items:2,
        nav:true
      },
      766:{
        items:3,
        nav:true
      },
      1280:{
        items:4,
        nav:true
      }
    },
    onTranslated: onInitialized,
    onInitialized: onInitialized
  });

  $('.catalog-full__slider__gallery').owlCarousel({
    loop: true,
    nav: true,
    dotsEach: false,
    autoplay: false,
    smartSpeed: 1000,
    navigation: false,
    navText: [],
    responsive:{
      0:{
        items:5,
        nav:true
      },
      766:{
        items:5,
        nav:true
      },
      1280:{
        items:5,
        nav:true
      }
    },
    onTranslated: onInitializedProduct,
    onInitialized: onInitializedProduct
  });

  $('.number').each(function () {
    var $this = $(this);
    var inp = $('input', $this);
    var min = $('.number__minus', $this);
    var max = $('.number__plus', $this);
    var currentText = inp.val()*1;
    var changeText = currentText;
    min.click(function () {
      if (changeText > 1) {
        changeText--;
        inp.val(changeText);
      }

    });
    max.click(function () {
      changeText++;
      inp.val(changeText);
    });

  });

  $('.index__gallery__desktop').owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    dotsEach: true,
    autoplay: false,
    smartSpeed: 1000,
    navigation: false,
    navText: [],
    items: 1
  });

  $('.index__gallery__mobile').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    dotsEach: true,
    autoplay: false,
    smartSpeed: 1000,
    navigation: false,
    navText: [],
    responsive:{
      0:{
        items:1,
        nav:true
      },
      766:{
        items:2,
        nav:true
      }
    },
  });

  $('.index__sale__slider').owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    dotsEach: true,
    autoplay: false,
    smartSpeed: 1000,
    navigation: false,
    navText: [],
    items: 1
  });

  var filter = $('.catalog__filter'),
      menuDevice = $('.header--mobile'),
      sortPanel = $('.catalog__sorter__device');

  $('#filter-open').click(function () {
    menuDevice.addClass('out-active');
    $('body').addClass('not-active');
    filter.addClass('active');
  });

  $('.close', filter).click(function () {
    menuDevice.removeClass('out-active');
    filter.removeClass('active');
    $('body').removeClass('not-active');
  });

  $('#sort-open').click(function () {
    menuDevice.addClass('out-active');
    $('body').addClass('not-active');
    sortPanel.addClass('active');
  });

  $('.close', sortPanel).click(function () {
    menuDevice.removeClass('out-active');
    $('body').removeClass('not-active');
    sortPanel.removeClass('active');
  });

  $('.sort_btn').click(function () {
    var $this = $(this);
    if ($this.hasClass('sort__desc') || $this.hasClass('sort__asc')) {
      $this.toggleClass('sort__desc sort__asc');
    }
    else {
      $('.sort_btn').removeClass('sort__desc sort__asc');
      $this.addClass('sort__desc');
    }
  });

  /**
   *  слайдер цен ------------------------------------------------------------------
   * */

  $('.slider').each(function () {
    var $this = $(this);
    var id = $this.attr('data-id');

    var cost_min = $('#first-' + id).val() * 1;
    var cost_max = $('#last-'+ id).val() * 1;
    var slider_min = $this.attr('data-min') * 1;
    var slider_max = $this.attr('data-max') * 1;

    var min = $('.slider__min', $this);
    var max = $('.slider__max', $this);

    var CostSlider = document.getElementById('slider-' + id);
    noUiSlider.create(CostSlider, {
      start: [cost_min, cost_max],
      connect: true,
      step: 1,
      range: {
        'min': slider_min,
        'max': slider_max
      }
    });
    var cost_first = document.getElementById('first-' + id);
    var cost_last = document.getElementById('last-' + id);

    min.text(cost_min);
    max.text(cost_max);

    CostSlider.noUiSlider.on('update', function (values, handle) {

      var value = values[handle];
      if (handle) {
        cost_last.value = Math.round(value);
        max.text(Math.round(value));
      } else {
        cost_first.value = Math.round(value);
        min.text(Math.round(value));
      }

      $('#cost-first').change();
    });

    cost_first.addEventListener('change', function () {
      CostSlider.noUiSlider.set([this.value, null]);
    });

    cost_last.addEventListener('change', function () {
      CostSlider.noUiSlider.set([null, this.value]);
    });
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    if ($this.prop('disabled')) {
      $styledSelect.addClass('disabled');
      $('.select').addClass('disabled');
    }

    var $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
      e.stopPropagation();
      $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();
      //console.log($this.val());
    });

    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });

  });

  $('.filter__accordeon').each(function () {
    var $this = $(this);
    var title = $('.filter__accordeon__title', $this);
    title.click(function () {
      $this.toggleClass('active');
    });
  });

  $('.button--togle-menu').click(function () {
    $('.menu-device').addClass('active');
    $('body').addClass('not-active');
  });

  $('.menu-device__close').click(function () {
    $('.menu-device').removeClass('active');
    $('body').removeClass('not-active');
  });

  $('.header__bottom-panel .search .search--button').click(function () {
      $('.search__form').addClass('open');
      $('.header__menu').addClass('disabled');
    $('.search__form input').focus();
  });

  $(document).click(function (event) {
    if ($(event.target).closest(".search__form").length) return;
    if ($(event.target).closest(".header__bottom-panel .search").length) return;
    $('.search__form').removeClass('open');
    $('.header__menu').removeClass('disabled');

    event.stopPropagation();
  });

  $('.index__brands__tab').click(function () {

    if (!$(this).hasClass('active')) {
      $('.index__brands__tab').removeClass('active');
      $(this).addClass('active');
      var id = $(this).attr('data-tab');
      $('.index__brands__cont').removeClass('active');
      $('#'+ id).addClass('active');
    }

  });

  $('.profile__tab').click(function () {

    if (!$(this).hasClass('active')) {
      $('.profile__tab').removeClass('active');
      $(this).addClass('active');
      var id = $(this).attr('data-tab');
      $('.profile__cont').removeClass('active');
      $('#'+ id).addClass('active');
    }

  });

  $('.catalog-full__tab').click(function () {

    if (!$(this).hasClass('active')) {
      $('.catalog-full__tab').removeClass('active');
      $(this).addClass('active');
      var id = $(this).attr('data-tab');
      $('.catalog-full__cont').removeClass('active');
      $('#'+ id).addClass('active');
    }

  });

  $('[data-fancybox]').fancybox({

  });

  $('.form_select select').each(function () {
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;


    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    if ($this.prop('disabled')) {
      $styledSelect.addClass('disabled');
      $('.select').addClass('disabled');
    }

    var $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      var li = $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
      if (($this.val() == 0 && i == 0) || $this.val() == $this.children('option').eq(i).val()) {
        li.addClass('selected');
        $styledSelect.text($this.children('option').eq(i).text());
      }

    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
      e.stopPropagation();
      $('.select-styled').removeClass('active').next('ul.select-options').hide();
      $(this).toggleClass('active').next('ul.select-options').toggle();

    });

    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $listItems.removeClass('selected');
      $(this).addClass('selected');
      $list.hide();
      //console.log($this.val());
    });

    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });

  });

  $('.select__city select').each(function () {
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    if ($this.prop('disabled')) {
      $styledSelect.addClass('disabled');
      $('.select').addClass('disabled');
    }

    var $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      var li = $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
      if (i == 0) {
        li.addClass('selected');
      }
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
      e.stopPropagation();
      $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $listItems.removeClass('selected');
      $(this).addClass('selected');
      $list.hide();
      //console.log($this.val());
    });

    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });

  });

  $('.eye').click(function () {
    var p = $(this).parent();
    $(this).toggleClass('eye--close');
    if ($(this).hasClass('eye--close')) {
      $('input', p).attr('type', 'text');
    } else {
      $('input', p).attr('type', 'password');
    }

  });

  $('[data-link]').click(function () {
    var link = $(this).attr('data-link');
    $('.modal__overlay').removeClass('active');
    $('#'+ link).addClass('active');
    $('body').addClass('not-active');
  });

  $('.modal__window .close').click(function () {
    var p = $(this).parent().parent();
    p.removeClass('active');
    $('body').removeClass('not-active');
  });

  $('.accordeon__select').click(function () {
    var p = $(this).parent();
    p.toggleClass('active');
  });

  var geocoder;
  var map;
  var query = new Array(
    "7-9 Fullerton Street, Woollahra NSW 2025",
    "78 Canberra Avenue, Griffith, ACT 2603"
  );

  if ($('#map').is('div')) {

    var MY_MAPTYPE_ID = 'custom_style';

    function initialize() {
      geocoder = new google.maps.Geocoder();

      var featureOpts = [ { "stylers": [ { "saturation": -100 }, { "lightness": -5 } ] } ];

      var mapOptions = {
        zoom: 16,
        mapTypeControl: false,
        scrollwheel: false,
        zoomControl: true,
        mapTypeId: MY_MAPTYPE_ID,
      };

      map = new google.maps.Map(document.getElementById('map'),  mapOptions);

      var customMapType = new google.maps.StyledMapType(featureOpts);



      map.mapTypes.set(MY_MAPTYPE_ID, customMapType);



      codeAddress();
    }

    function codeAddress() {

      for (var i = 0; i < query.length; i++) {

        var address = query[i];
        var icon = {
          path: "M43 0C19.2899 0 0 19.2813 0 42.9812C0 53.0236 3.46359 62.2718 9.25912 69.5969L43 112L76.7409 69.5969C82.5364 62.2718 86 53.0236 86 42.9812C86 19.2813 66.7101 0 43 0ZM43 61.7551C32.3274 61.7551 23.6446 53.076 23.6446 42.408C23.6446 31.74 32.3274 23.0609 43 23.0609C53.6726 23.0609 62.3554 31.74 62.3554 42.408C62.3554 53.076 53.6728 61.7551 43 61.7551Z",
          fillColor: '#EE273C',
          fillOpacity: 1,
          anchor: new google.maps.Point(0,0),
          strokeWeight: 0,
          scale: 1/4
        }

        geocoder.geocode({

            'address': address

          }, function (k) {

            return function (results, status) {

              if (status == google.maps.GeocoderStatus.OK) {

                map.setCenter(results[0].geometry.location);


                var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: icon,
                  draggable: false,
                });

              } else {

                alert('Geocode was not successful for the following reason: ' + status);

              }

            }

          }(i)
        );

      }

    }

    google.maps.event.addDomListener(window, 'load', initialize);

    google.maps.event.addDomListener(window, "resize", function() {

      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    });
  }


});
