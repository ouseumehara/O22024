jQuery(function ($) {
	/* スムーズスクロール */
	$('a[href^=#]').click(function () {
		var speed = 500;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('body,html').animate({ scrollTop: position }, speed, 'swing');
		return false;
	});

	/* PAGE TOP ある程度スクロールしてから出現 */
	var topBtn = $('#gototop');
	topBtn.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
	});

	/* スマホ用メニューが長い場合の処理 */
	$(window).bind("resize ready load", function () {
		if (isPc()) {
			$('.h_sp_inner').css('height', 'auto');
		}
		else {
			var wh = window.innerHeight ? window.innerHeight : $(window).height();
			$('.h_sp_inner').height(wh);
		}
	});

	/* メニュー toggle */
	$('#toggle').click(function () {
		if ($('body').hasClass('open')) {
			$('body').removeClass('open');
		}
		else {
			$('body').addClass('open');
		}
		return false;
	});

	$('#toggle_menu, .h_nav a').click(function () {
		if (!isPc()) {
			$('body').removeClass('open');
		}
	});
});

/* PC/スマホ 画像切り替え */
function switchImage() {
	var width = $(window).width();
	$('.u_switch_img').each(function (index) {
		if (!$(this).attr('src')) return;
		var src = $(this).attr('src');
		var index = src.lastIndexOf('.');
		var path = src.substring(0, index);
		var ext = src.substring(index);
		if (path.substring(index - 3) == '_sp') {
			path = path.substring(0, index - 3);
		}
		if (isPc()) {
			path = path + ext;
		}
		else {
			path = path + "_sp" + ext;
		}
		if (src != path) {
			$(this).attr("src", path);
		}
	});
}

function setView() {
	var w = $(window).width();
	if (w > 640) {
		$('html').css('font-size', "62.5%");
	}
	else {
		$('html').css('font-size', (w / 10.24) + "%");
		//$('html').css('font-size', (w / (640 / 62.5)) + "%");
	}
	switchImage();
}

function isPc() {
	return $('.u_visible_sp').css('display') == 'none';
}

$(window).bind("resize ready load", function () {
	setView();
});

setView();
