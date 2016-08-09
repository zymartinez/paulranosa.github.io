$(document).ready( function () {

	// Seen
	if ( window.location.search != "" ) {
		var match = window.location.search.match(/^\??code\=(\w{5})$/);
		if ( match != undefined && match.length == 2 && match[1].length == 5 ) {
			$('.theatre-box, .theatre-box .loader').show();
			$.post('http://amyporterfield.co/tpw/xhr.php', {method: 'seen', code: match[1]}, function ( data ) {
				$('.theatre-box, .theatre-box .loader').hide();
				if ( data != undefined ) {
					$('form input[name=name]').val(data.name).attr('disabled', 'disabled');
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
		var post = {
			method: 'confirm',
			name: $('form input[name=name]').val(),
			mobile: $('form input[name=mobile').val(),
			response: ''
		}

		if ( $('form label a.active').length == 1 ) {
			if ( $('form label a.active').text().match(/^Yes/) != null ) {
				post.response = 'yes';
			} else {
				post.response = 'no';
			}
		}

		if ( post.name != "" && post.response != "" ) {
			$('.theatre-box, .theatre-box .loader').show();
			$.post('http://amyporterfield.co/tpw/xhr.php', post, function ( data ) {
				$('.theatre-box .loader').hide();
				$('.theatre-box .response, .theatre-box p.' + post.response).show();
			});
		}

	});

	$('.theatre-box button').on('click', function ( e ) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('.four').offset().top
		}, 1000, function () { $('.theatre-box, .theatre-box .response, .theatre-box p, .theatre-box .loader').fadeOut() } )
	});

})