$(document).ready( function () {

	var currentScrollTop = 0;

	// Seen
	if ( window.location.search != "" && navigator != undefined ) {
		var match = window.location.search.match(/^\??code\=(\w{5})$/);
		if ( match != undefined && match.length == 2 && match[1].length == 5 ) {
			$('.theatre-box, .theatre-box .loader').show();
			$.post('http://amyporterfield.co/tpw/xhr.php', {method: 'seen', code: match[1], navigator: navigator.userAgent}, function ( data ) {
				$('.theatre-box, .theatre-box .loader').hide();
				if ( data != undefined ) {
					$('form input[name=name]').val(data.name).attr('disabled', 'disabled');
					if ( data.mobile != undefined ) {
						$('form input[name=mobile]').val(data.mobile);
					}
				}
			});
		}
	}

	$('form label a').on('click', function ( e ) {
		e.preventDefault();
		if ( !$(this).hasClass('active') ) {
			$('form label a').removeClass('active');
			$(this).addClass('active');
		}
	});

	$('form button').on('click', function ( e ) {
		e.preventDefault();

		if ( !$(this).hasClass('err') ) {

			var post = {
				method: 'confirm',
				name: $('form input[name=name]').val(),
				mobile: $('form input[name=mobile]').val(),
				response: ''
			}

			if ( $('form label a.active').length == 1 ) {
				if ( $('form label a.active').text().match(/^Yes/) != null ) {
					post.response = 'yes';
				} else {
					post.response = 'no';
				}
			}

			if ( post.name != "" && post.mobile != "" && post.response != "" ) {
				$('.theatre-box, .theatre-box .loader').show();
				$.post('http://amyporterfield.co/tpw/xhr.php', post, function ( data ) {
					$('.theatre-box .loader').hide();
					$('.theatre-box .response, .theatre-box p.' + post.response).show();
				});
			} else {
				$(this).text('Please complete the form!');
				$('form button').addClass('err');
				setTimeout(function () {
					$('form button').removeClass('err').text('Submit');
				}, 1000);
			}

		}

	});

	$('.theatre-box .response button').on('click', function ( e ) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('.four').offset().top
		}, 1000, function () { $('.theatre-box .response, .theatre-box p, .theatre-box .loader, .theatre-box .gifts').hide(); $('.theatre-box').fadeOut() } )
	});

	$("form input[name=mobile]").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode == 67 && e.ctrlKey === true) || (e.keyCode == 88 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('.four li a').on('click', function ( e ) {
    	e.preventDefault();
    	$('.theatre-box .gifts img').attr('src', $(this).parent().find('img').attr('src'));
    	$('.theatre-box .gifts p').html( '<strong>' + $(this).parent().find('span').text() + '</strong>' + $(this).parent().find('p').text());
    	$('.theatre-box, .theatre-box .gifts').show();
    	if ( $(this).parent().find('span').text().match(/^Honey/) ) {
    		$('.theatre-box .gifts button').show();
    	}
    });

    $('.theatre-box .gifts a').on('click', function ( e ) {
    	e.preventDefault();
    	$('.theatre-box, .theatre-box .gifts').hide();
    	$('.theatre-box .gifts img').attr('src', '');
    	$('.theatre-box .gifts p').text('&nbsp;');
    	$('.theatre-box .gifts button').hide();
    });

    $('.theatre-box .gifts button').on('click', function ( e ) {
    	e.preventDefault();
    	$('.theatre-box .gifts').hide();
    	$('.theatre-box .loader').show();
    	$('input[name=cmd]').parent()[0].submit();
    })

})