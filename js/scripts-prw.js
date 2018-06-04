;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	var shellW = 1120;
	var $fullWidthSections = $('.section-event-banner, .section-sectors, .block.partner');
	var $fullWidthSectionsAlt = $('.article-navigation, .social-sharing');

	var animatedElements = '.en-1-clic, .newsletter-form, .section-event-banner, .list-articles.alaune, .business-meetings, .blog-head, .list-articles.blog, .section-sectors, .section-playlist, .partner, .section-twitter, .block-pub';

	// Scroll down animation
	function animateElement(winST) {
		var $animate = $(animatedElements);

		$animate.each(function(){
			var $this = $(this);
			var offset = $this.offset().top;

			if (winST + ($win.outerHeight() * .8) > offset) {
				$this.addClass('animated');
			}
		});

		if (winST + $win.outerHeight() > $('.site-footer').offset().top) {
			$animate.addClass('animated');
		}
	}

	/**
	 * Resizes a DOM element based on its immediate children's height
	 * 
	 * @param  {Object} $element DOM element
	 * 
	 * @return {Void}
	 */
	function resizeElement($element) {	
		var heights = $element.children().map(function() {
			return $(this).height();
		});

		$element.parent().add($element).height(Math.max.apply(null, heights));
	};

	$doc.ready(function() {
		// Focus search field
		$('.gsf-trigger').on('click', function() {
			setTimeout(function() {
				$('.site-banner .gsf-fields .gsf-input').trigger('focus');
			}, 100);
		});

		if (animatedElements != '') {
			$(animatedElements).addClass('animate');
		}

		$win.off('scroll mousewheel DOMMouseScroll MozMousePixelScroll');

		var offset = $('.main-navigation').offset().top;

		if ($('html').attr('lang') == 'fr') {
			$('#comexposium_newsletter_email').attr('placeholder', 'Indiquez votre email');
		} else {
			$('#comexposium_newsletter_email').attr('placeholder', 'Please enter you email');
		}

		

		$win.on('load', function() {
			$('body').addClass('page-loaded');
			
			if( $('.article-wrapper .article-content h3, .article-wrapper .article-content h4').length ) {
				$('.article-wrapper .article-content h3, .article-wrapper .article-content h4').each(function() {
					$(this).wrapInner('<span></span>');
				});
			}

			if ($('.cc-cookies').length) {
				$('.cc-cookies').css({
					'display': 'block'
				})
			}

			$('.front .list-articles').eq(0).addClass('slider-main');

			// Init Main Slider
			if( $('.front .la-slider').length ) {
				var $sliderMain =  $('.front .la-slider').clone();

				$('.front .la-slider').detach();
				
				$sliderMain.prependTo('.front .slider-main');
				
				$sliderMain.find('.la-item-content').each(function() {
					var $sliderPrev = $('<div class="slider-prev"><i class="ico-arrow-left"></i></div>');
					var $sliderNext = $('<div class="slider-next"><i class="ico-arrow-right"></i></div>');

					$(this).append($sliderPrev);
					$(this).append($sliderNext);
				});

				$sliderMain.add( $sliderMain.find('*') ).removeAttr('style');

				$sliderMain.find('.slider-content').carouFredSel({
					width: '100%',
					height: 'variable',
					responsive: true,
					swipe: {
						onTouch: true
					},
					auto: {
						play: true,
						delay: 1200,
						timeoutDuration: 4000
					},
					scroll: {
						fx: 'fade',
						duration: 2000,
						onBefore: function() {
							$('.slider-main .slider-item').eq(0).removeClass('animate-in');
						},
						onAfter: function() {
							$('.slider-main .slider-item').eq(0).addClass('animate-in');
						}
					},
					items: {
						height: 'variable'
					},
					prev: '.slider-main .slider-prev',
					next: '.slider-main .slider-next',
					onCreate: function() {
						var top = $('.slider-main .la-item-img').height() - $('.slider-main .la-item-tag').height();

						$('.slider-main .la-item-tag').css('top', top);	
						$('.slider-main .slider-item').eq(0).addClass('animate-in');

						setTimeout(function() {
							$('.slider-main').addClass('loaded');
							$('.slider-main .la-slider').addClass('loaded');
						}, 1500);

						setTimeout(function() {
							$('.block-side').addClass('load');
						}, 2000);

						resizeElement($sliderMain.find('.slider-content'));

						$win.on('resize', function() {
							resizeElement($sliderMain.find('.slider-content'));
						});
					}
				});
			}

			// Init Partner slider
			if( $('.front .partner-gallery').length ) {
				$('.front .partner-gallery').each(function() {
					var $parent = $(this).parent();
					var $sliderPartner =  $(this).clone();
					$(this).detach();
					$sliderPartner.prependTo( $parent );

					$sliderPartner.find('.slider-content').carouFredSel({
						auto: {
							play: true,
							timeoutDuration: 0
						},
						scroll: {
							fx: 'slide',
							easing: 'linear',
							duration: 25000
						},
						items: {
							visible: 10
						}
					});
				});
			}

			if( $('.slider-sectors').length ) {
				$('.slider-sectors .slides').carouFredSel({
					width: '100%',
					responsive: true,
					swipe: {
						onTouch: true
					},
					auto:{
						play: false
					},
					items: {
						visible: 4,
					},
					prev: '.slider-sectors .slider-prev',
					next: '.slider-sectors .slider-next'
				});
			}
		});

		// Set Active Tab
		if( $('.block.partner .tabs-nav ul').length ) {
			$('.block.partner .tabs-nav ul li').eq(0).find('a').addClass('is-active');
		}

		if( $('#youmax').length ) {
			// Init Youtube Videos Playlist
			$('#youmax').youmax({
				apiKey:"AIzaSyChjku-aHuIjmbKQlb1vH9bdIa1gLgNST0",
				vimeoAccessToken: '',
				clientId:"601782563022-e3dt0u9scaa2s23n30ue44fsp7qe6pip.apps.googleusercontent.com", 
				channel:"", 
				youtube_playlist_videos: [{ 
			    	name:"Videos", 
			    	url:"https://www.youtube.com/playlist?list=PLDgs1EdmYgRYo07QcmJYzhNKmNW_zrkA_", 
			    	selected:true
			    }],
			    skin:"grey",
				hideHeader: true,
				hideNavigation: true,
				hideComments: true, 
				hideLoadMore:true, 
				videoProtocol:"https:", 
				maxResults:3, 
				maxResultsToLoad:3,
				fourColumnContainerWidth:"1120", 
				fourColumnThumbnailWidth:"29.5%", 
				fourColumnThumbnailLeftRightMargin:"2.875%"
			});

			$('div#youmax-header').remove();	
		}

		$win.on('load scroll', function() {
			var winST = $win.scrollTop();

			$('header.site-banner').removeClass('is-stuck');

			if( $win.scrollTop() >= offset ) {
				$('header.site-banner').addClass('sticky');

				setTimeout(function() {
					$('header.site-banner').addClass('header-show');
				}, 10);
			} else {
				$('header.site-banner').removeClass('sticky header-show');
			}

			animateElement(winST);

			var winO = $win.scrollTop();
			var offset1 = winO / 3;
			var offset2 = winO / 2;

			// Parallax elements
			if( $('.parallax-item').length ) {
				$('.parallax-item').each(function() {
					if( $(this).find('img').length > 1 ) {
						$(this).find('img').eq(0).css({
							'-webkit-transform' : 'translate3d(0,' + offset1 + 'px, 0)',
							'-moz-transform'    : 'translate3d(0,' + offset1 + 'px, 0)',
							'-ms-transform'     : 'translate3d(0,' + offset1 + 'px, 0)',
							'-o-transform'      : 'translate3d(0,' + offset1 + 'px, 0)',
							'transform'         : 'translate3d(0,' + offset1 + 'px, 0)'
						});

						$(this).find('img').eq(1).css({
							'-webkit-transform' : 'translate3d(0,' + offset2 + 'px, 0)',
							'-moz-transform'    : 'translate3d(0,' + offset2 + 'px, 0)',
							'-ms-transform'     : 'translate3d(0,' + offset2 + 'px, 0)',
							'-o-transform'      : 'translate3d(0,' + offset2 + 'px, 0)',
							'transform'         : 'translate3d(0,' + offset2 + 'px, 0)'
						});
					} else {						
						$(this).find('img').eq(0).css({
							'-webkit-transform' : 'translate3d(0,' + offset1 + 'px, 0)',
							'-moz-transform'    : 'translate3d(0,' + offset1 + 'px, 0)',
							'-ms-transform'     : 'translate3d(0,' + offset1 + 'px, 0)',
							'-o-transform'      : 'translate3d(0,' + offset1 + 'px, 0)',
							'transform'         : 'translate3d(0,' + offset1 + 'px, 0)'
						});
					}
				});
			}
		});

		$win.on('load resize', function() {
			if( $fullWidthSections.length ) {
				$fullWidthSections.each(function() {
					var margin = ( $win.width() - shellW ) / 2;

					$(this).css({
						'margin-left': -margin,
						'margin-right': -margin
					});
				});
			}

			if( $fullWidthSectionsAlt.length ) {
				$fullWidthSectionsAlt.each(function() {
					var $this = $(this);
					var leftM = $this.offset().left - 10;
					var rightM = $win.width() - leftM - $this.width() - 20;

					$this.css({
						'margin-left': - leftM,
						'margin-right': -rightM
					});
				});
			}

			if( $('.parallax-tower').length ) {
				var right = $win.width() - $('.parallax-tower').parent().offset().left - $('.parallax-tower').parent().outerWidth();

				$('.parallax-tower').css('right', -right);
			}
		});

		$win.on('load', function() {
			if( $('.parallax-tower').length ) {
				$('.parallax-tower').addClass('show');
			}

			$('body.article .site-banner .parallax-item, body.article_list .site-banner .parallax-item').prependTo('#main').addClass('show');

			if( $('#feeds').length ) {
				// Twitter feeds
				twitterFetcher.fetch({
					profile: {
						screenName: 'PRWOfficial'
					},
					id: '516403679',
					domId: 'feeds',
					maxTweets: 3,
					enableLinks: true, 
					showUser: false,
					showTime: false,
					showImages: true,
					lang: 'fr',
					showInteraction: false,
					customCallback: handleFeeds
				});

				function handleFeeds(feeds) {
					var slides = '';

					for (var i = 0; i < feeds.length; i++) {
						slides += '<div class="feed">' + feeds[i] + '</div>'
					}

					$('#feeds').append(slides);

					var $sliderPrev = $('<div class="slider-prev"><i class="ico-arrow-left"></i></div>');
					var $sliderNext = $('<div class="slider-next"><i class="ico-arrow-right"></i></div>');

					$sliderPrev.appendTo( $('.section-twitter') );
					$sliderNext.appendTo( $('.section-twitter') );

					setTimeout(function() {
						$('.feeds').carouFredSel({
							swipe: {
								onTouch: true
							},
							auto: false,
							scroll: {
								fx: 'crossfade',
								duration: 1000
							},
							prev: '.section-twitter .slider-prev',
							next: '.section-twitter .slider-next'
						}).parent().css('margin', '0 auto');
					}, 1000);
				}			
			}

			if( $('.feeds').length ) {
				
			}
		});

		if( $('.article-intro').length ) {
			$('.article-intro').insertAfter('.article-wrapper .at-main-title');
		}

		if( ('.article-wrapper .at-illust').length ) {
			$('.article-wrapper .at-illust').wrap('<div class="at-illust-outer"></div>');
		}

		if( $('.article-navigation .an-item').length ) {
			var imgWrapper = '<div class="img-wrapper"></div>';

			$('.article-navigation .an-item').each(function() {
				if( $(this).find('.an-item-illust').length ) {
					$(this).find('.an-item-illust').wrap('<div class="img-wrapper"></div>');
				} else {
					if( $(this).hasClass('an-item-previous') ) {
						$(imgWrapper).prependTo( $(this).children('a') );
					} else {
						$(imgWrapper).appendTo( $(this).children('a') );
					}					
				}
			});
		}

		$('.section-twitter .link-more').off('click.scroll');
	});

})(jQuery, window, document);
