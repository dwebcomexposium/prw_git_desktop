$(document).ready(function(){
    var $win = $(window);
    var $body = $('body');

    var is = {
        Mobile  : false,
        Desktop : false,
        Tablet  : false
    };

    var get = {
        Scroll   : 0,
        WinWidth : 0
    };

    // Detect Mac
    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        $body.addClass('browser-mac');
    }

    $('.site-banner .main-navigation, .site-banner .lang-switcher, .site-banner .quicklinks, .site-banner .global-search-form').wrapAll('<div class="header-content">');
    $('.site-banner .lang-switcher, .site-banner .quicklinks, .site-banner .global-search-form').wrapAll('<div class="header-inner">');

    // Append Date in Header for Mobile
    $('.site-banner .inside').append('<div class="date-mobile"><strong>' + $('.date-aside strong').html() + '</strong></div>');

    // Append Burger Button
    $('.site-banner .inside').append('<a href="#" class="btn-menu"><span></span></a>')

    $('.edito-gauche, .edito-droite').wrapAll('<div class="edito-wrapper">');
    $('.testimonial, .pub').wrapAll('<div class="testimonial-wrapper">');


    $('.lp-exposant .edito-contact, .lp-exposant .block-image').wrapAll('<div class="contact-wrapper">');

    $('.article .article-title img').wrap('<div class="image-wrapper">');

    $('.gla-item img').each(function(){
        $(this).wrap('<div class="image-wrapper">');
    });

    $('.article_list .la-item img').each(function(){
        $(this).wrap('<div class="image-wrapper">');
    });

    $('.mn-item-lvl-1:not(.mn-menu-item-avecpicto)').on('mouseover', function(){
        $(this).closest('.main-navigation').addClass('hover');
    }).on('mouseout', function(){
        $(this).closest('.main-navigation').removeClass('hover');
    });

    $('.testimonial .af-title').attr({
        'data-top': 'transform: translateY(25px)',
        'data-bottom-top': 'transform: translateY(-25px)'
    });

    // Add Animations
    $('body').addClass('ready'); // shows the body - it's invisible by default to prevent showing the elements before initialization of the animations below

    addAnimateAttr([
        'main .date-aside', 
        '.site-banner', 
        '.section-intro', 
        '.edito-gauche', 
        '.edito-droite', 
        '.actus',
        '.testimonial',
        '.pub',
        '.slider-offre',
        '.conference',
        '.block-testimonials',
        '.slider-business',
        '.partner',
        '.twitter',
        '.newsletter-form',
        // Exposants
        '.edito-exposants',
        '.devenir-exposant',
        '.focus-business',
        '.promocom',
        '.contact-wrapper',
        '.focus-faq',
        // List page
        '.article_list .list-articles',
        '.article_list .gla-item',
        '.article_list .la-item',
        // Article Page
        '.article .article-wrapper',
        '.breadcrumb-nav',
        '.article .cl-item',
        '.faq'
    ]);

    // Add Parallax effects
    $('.edito-exposants img').attr({
        'data-top': 'transform: translateY(0)',
        'data-bottom-top': 'transform: translateY(-55px)'
    });

    $('.edito-exposants figcaption').attr({
        'data-top': 'transform: translateY(25px)',
        'data-bottom-top': 'transform: translateY(-150px)'
    });

    $('.image:first-child .image__inner').attr({
        'data-top': 'transform: translateY(0)',
        'data-bottom-top': 'transform: translateY(-30px)'
    });

    $('.image:first-child .image__band').attr({
        'data-top': 'transform: translateY(25px)',
        'data-bottom-top': 'transform: translateY(-150px)'
    });

    $('.image:nth-child(2) .image__inner').attr({
        'data-top': 'transform: translateY(0)',
        'data-bottom-top': 'transform: translateY(-150px)'
    });

    $('.image:nth-child(2) .image__band').attr({
        'data-top': 'transform: translateY(25px)',
        'data-bottom-top': 'transform: translateY(-150px)'
    });

    fetchTweets();
    addDeviceResolution();
    addBaseClickEvents();
    imgToSVG();
    mainMenuHandler();
    setBlockImage();
    addImageLink();

    $win.on('load', function(){
        newsletterLabel();
        reInitSliders();
        initSliderTwitter();
        initSliders();
        changeNavColor();

        if (is.Desktop) {
            skrollr.init();
        }

        AOS.init({
            offset: $win.height() / 10,
            duration: 800
        });
    });

    $win.on('resize orientationchange', function(){
        addDeviceResolution();
    });

    $win.on('scroll', function(){
        get.Scroll = $win.scrollTop();
    });

    function addImageLink() {
        $('.la-item').each(function(){
            var $this = $(this);
            var $image = $this.find('.image-wrapper img');
            var $link = $this.find('.la-item-content .link-read-more').attr('href');

            $image.wrap('<a href="' + $link + '">');
        });
    }

    function changeNavColor() {
        if ($('.mn-item-lvl-1 > .mn-link.is-active').length) {
            $('.main-navigation').addClass('main-navigation--secondary');
        }
    }

    function addAnimateAttr(input) {
        for (i = 0; i < input.length; i++) {
            $(input[i]).attr('data-aos', 'fade-in');
        }
    }

    function setBlockImage() {
        $('.image').each(function(){
            var $image = $(this).find('.image__inner');
            var desktopImage = $image.data('image-desktop');
            var mobileImage = $image.data('image-mobile');

            if (is.Mobile) {
                $image.css('background-image', 'url(' + mobileImage + ')');
            } else {
                $image.css('background-image', 'url(' + desktopImage + ')');
            }
        });
    }

    function mainMenuHandler() {
        $('.main-navigation .mn-item-lvl-1.mn-item-has-submenu').each(function(){
            $(this).prepend('<i class="menu-arrow"></i>');
        });

        $('.main-navigation .mn-item-lvl-2.mn-item-has-submenu').each(function(){
            $(this).prepend('<i class="submenu-arrow"></i>');
        });

        $('.main-navigation .menu-arrow').on('touchstart', function(){
            if (is.Mobile || is.Tablet) {
                var $arrow = $(this);

                $('.main-navigation .menu-arrow.is-open').removeClass('is-open');

                $arrow.parent().toggleClass('is-open');
                $arrow.closest('.main-navigation').toggleClass('hover');
            }
        });
    }

    function fetchTweets() {
        var configProfile = {
          "profile": {"screenName": 'prwofficial'},
          "domId": 'tweets1',
          "maxTweets": 6,
          "enableLinks": true, 
          "showUser": true,
          "showTime": false,
          "showImages": false,
          "lang": 'en'
        };

        if ($('.block.twitter').length) {
            twitterFetcher.fetch(configProfile);
        }
    }

    function initSliders() {
        var $sliderTestimonials = $('.slider-testimonials');

        if ($sliderTestimonials.length) {
            $sliderTestimonials.find('.slides').caroufredsel({
                width: '100%',
                responsive: true,
                items: 1,
                circular: true,
                infinite: true,
                swipe: true,
                auto: {
                    items: 1,
                    play: false,
                    timeoutDuration: 5000
                },
                prev : function(){
                    return $sliderTestimonials.find('.slider__arrow--prev');
                },
                next : function(){
                    return $sliderTestimonials.find('.slider__arrow--next');
                }
            });
        }
    }

    function reInitSliders() {
        $('.cxp-swiper').each(function(){
            var $this = $(this);
            var data = $this.wrap('<div>').parent().html();

            // Create new html
            $this.parent().append(data);

            // Delete old slider
            $this.remove();
        });

        $('.cxp-swiper').each(function(){
            var $this = $(this);

            // Initialize Caroufredsel Slider
            if ($this.parents('.slider-offre').length) {
                // Slider Offre
                if (is.Mobile) {
                    $this.find('.swiper-wrapper').carouFredSel({
                        onCreate: function(){
                            $this.find('.la-item:first-child').addClass('current');
                        },
                        width: '100%',
                        items: 1,
                        circular: true,
                        infinite: true,
                        swipe: true,
                        responsive: true,
                        scroll: {
                            onAfter : function( data ) { 
                                $(data.items.old[0]).removeClass('current');
                                $(data.items.visible[0]).addClass('current');
                            },
                            fx: 'fade',
                            items: 1,
                            duration: 600
                        },
                        auto: {
                            items: 1,
                            play: false,
                            timeoutDuration: 5000
                        },
                        prev : function(){
                            $this.append('<a href="#" class="slider-arrow slider-arrow-prev"><i class="icon icon-short-arrow-left" aria-hidden="true"></i></a>')
                            return $this.find('.slider-arrow-prev');
                        },
                        next : function(){
                            $this.append('<a href="#" class="slider-arrow slider-arrow-next"><i class="icon icon-short-arrow-right" aria-hidden="true"></i></a>')
                            return $this.find('.slider-arrow-next');
                        }
                    });
                } else {
                    $this.find('.swiper-wrapper').carouFredSel({
                        onCreate: function(){
                            $this.find('.la-item:first-child').addClass('current');
                        },
                        width: '100%',
                        items: 1,
                        circular: true,
                        infinite: true,
                        swipe: true,
                        direction: 'up',
                        scroll: {
                            onAfter : function( data ) { 
                                $(data.items.old[0]).removeClass('current');
                                $(data.items.visible[0]).addClass('current');
                            },
                            fx: 'fade',
                            items: 1,
                            duration: 600
                        },
                        auto: {
                            items: 1,
                            play: true,
                            timeoutDuration: 5000
                        },
                        prev : function(){
                            $this.append('<a href="#" class="slider-arrow slider-arrow-prev"><i class="icon icon-short-arrow-left" aria-hidden="true"></i></a>')
                            return $this.find('.slider-arrow-prev');
                        },
                        next : function(){
                            $this.append('<a href="#" class="slider-arrow slider-arrow-next"><i class="icon icon-short-arrow-right" aria-hidden="true"></i></a>')
                            return $this.find('.slider-arrow-next');
                        }
                    });
                }
            } else if ($this.parents('.slider-business').length) {
                // Slider Business
                if (is.Mobile) {
                    $this.find('.swiper-wrapper').carouFredSel({
                        width: '100%',
                        items: 1,
                        circular: true,
                        infinite: true,
                        responsive: true,
                        swipe: true,
                        auto: {
                            items: 1,
                            play: false,
                            timeoutDuration: 5000
                        },
                        prev : function(){
                            $this.append('<a href="#" class="slider-arrow slider-arrow-prev"><i class="icon icon-short-arrow-left" aria-hidden="true"></i></a>')
                            return $this.find('.slider-arrow-prev');
                        },
                        next : function(){
                            $this.append('<a href="#" class="slider-arrow slider-arrow-next"><i class="icon icon-short-arrow-right" aria-hidden="true"></i></a>')
                            return $this.find('.slider-arrow-next');
                        }
                    });
                } else {
                    $this.find('.swiper-wrapper').carouFredSel({
                        width: '100%',
                        items: 2,
                        circular: true,
                        infinite: true,
                        responsive: true,
                        swipe: true,
                        auto: {
                            items: 2,
                            play: false,
                            timeoutDuration: 5000
                        },
                        prev : function(){
                            $this.append('<a href="#" class="slider-arrow slider-arrow-prev"><i class="icon icon-short-arrow-left" aria-hidden="true"></i></a>')
                            return $this.find('.slider-arrow-prev');
                        },
                        next : function(){
                            $this.append('<a href="#" class="slider-arrow slider-arrow-next"><i class="icon icon-short-arrow-right" aria-hidden="true"></i></a>')
                            return $this.find('.slider-arrow-next');
                        }
                    });
                }
            } else if ($this.parents('.partner').length) {
                // Slider Partner

                if (is.Desktop) {
                    $this.find('.swiper-wrapper').carouFredSel({
                        width: '100%',
                        items: 4,
                        circular: true,
                        infinite: true,
                        responsive: true,
                        swipe: true,
                        auto: {
                            items: 4,
                            play: true,
                            timeoutDuration: 5000
                        },
                        prev : function(){
                            return $this.find('.slider-btn-prev');
                        },
                        next : function(){
                            return $this.find('.slider-btn-next');
                        }
                    });
                } else if (is.Tablet) {
                    $this.find('.swiper-wrapper').carouFredSel({
                        width: '100%',
                        items: 3,
                        circular: true,
                        infinite: true,
                        responsive: true,
                        swipe: true,
                        auto: {
                            items: 3,
                            play: true,
                            timeoutDuration: 5000
                        },
                        prev : function(){
                            return $this.find('.slider-btn-prev');
                        },
                        next : function(){
                            return $this.find('.slider-btn-next');
                        }
                    });
                }
            }
        });
    }

    function initSliderTwitter() {
        if (!is.Mobile) {
            $('.slider-twitter ul').each(function(){
                // Wrap slides by couples
                var $this = $(this);
                var li = $this.find('li');

                for(var i = 0; i < li.length; i+=2) {
                  li.slice(i, i+2).wrapAll("<div class='wrap-couples'></div>");
                }
            });
        }

        if ($('.slider-twitter').length) {
            $('.slider-twitter ul').each(function(){
                if (is.Mobile) {
                    $('.slider-twitter ul').carouFredSel({
                        width: '100%',
                        circular: true,
                        infinite: true,
                        swipe: true,
                        responsive: true,
                        items: 1,
                        scroll: {
                            duration: 600,
                            onBefore: function( data ) {
                                data.items.visible.children().css( 'opacity', 0 ).delay( 200 ).fadeTo( 400, 1 );
                                data.items.old.children().fadeTo( 400, 0 );
                            }
                        },
                        auto: {
                            items: 1,
                            play: true,
                            duration: 1000,
                            timeoutDuration: 5000
                        }
                    });
                } else {
                    $('.slider-twitter ul').carouFredSel({
                        width: '100%',
                        direction: 'up',
                        items: 1,
                        scroll: {
                            duration: 600,
                            onBefore: function( data ) {
                                data.items.visible.children().css( 'opacity', 0 ).delay( 200 ).fadeTo( 400, 1 );
                                data.items.old.children().fadeTo( 400, 0 );
                            }
                        },
                        auto: {
                            items: 1,
                            play: true,
                            duration: 1000,
                            timeoutDuration: 5000
                        }
                    });
                }
            });
        }
    }

    function newsletterLabel() {
        $('.nf-main-content .nf-form-txt').each(function(){
            var $this = $(this);
            var $container = $this.closest('.nf-main-content');

            $this.on('blur', function(){
                if ($this.val() == 0) {
                    $container.removeClass('hide-label');
                } else {
                    $this.addClass('hide-label');
                }
            }).on('input', function(){
                $container.addClass('hide-label');
            });
        });

        // Checkbox
        $('.nf-form-item .optin-container .nf-form-input').click(function(){
            var $this = $(this);
            var $parent = $this.parent();
            var $input = $this.find('input');

            $input.trigger('click');

            if (!$input.is(':checked')) {
                $parent.removeClass('checked');
            } else {
                $parent.addClass('checked');
            }
        });

        $body.on('DOMSubtreeModified', '.nf-result', function() {
            if (!$('.nf-result').find('p').length) {
                $('.newsletter-form form input[type="checkbox"]').prop('checked', false).closest('.optin-container.checked').removeClass('checked');
            }
        });
    }

    function imgToSVG() {
        // CONVERTING IMG SVG TO INLINE SVG
        // Easy to manipulate with class
        // To use just add class="svg" to your image
        $('img.svg').each(function () {
         var $img = $(this);
         var imgID = $img.attr('id');
         var imgClass = $img.attr('class');
         var imgURL = $img.attr('src');
         $.get(imgURL, function (data) {
             // Get the SVG tag, ignore the rest
             var $svg = $(data).find('svg');
             // Add replaced image's ID to the new SVG
             if (typeof imgID !== 'undefined') {
                 $svg = $svg.attr('id', imgID);
             }
             // Add replaced image's classes to the new SVG
             if (typeof imgClass !== 'undefined') {
                 $svg = $svg.attr('class', imgClass + ' replaced-svg');
             }
             // Remove any invalid XML tags
             $svg = $svg.removeAttr('xmlns:a');
             // Replace image with new SVG
             $img.replaceWith($svg);
         }, 'xml');
        });
    }

    function addBaseClickEvents() {
        $('.btn-menu').click(function(e){
            e.preventDefault();

            $body.toggleClass('show-nav-main');
        }); 

        $('.site-banner .gsf-trigger').click(function(){
            $body.addClass('show-search');
            setTimeout(function() {
                $('#search').trigger("focus");
            }, 350);
        });

        $body.on('click touchstart', function(event){
            var $target = $(event.target);

            if(!$target.parents('.js .site-banner .gsf-fields').length){
                $body.removeClass('show-search');
            }
        });
    }
 
    function addDeviceResolution() {
        get.WinWidth = $win.width();

        is.Desktop = (get.WinWidth > 1200); 
        is.SmallDesktop = (get.WinWidth <= 1200 && get.WinWidth >= 1025);
        is.Tablet  = (get.WinWidth <= 1024 && get.WinWidth >= 768);
        is.Mobile  = (get.WinWidth <= 767);
    }
});
