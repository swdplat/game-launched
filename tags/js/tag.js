// JavaScript Document
// 標籤選單：大標籤(遊戲類型)展開小標籤面板；所有標籤可點擊切換選取，每組最多 3 個
$(document).ready(function() {

	var MAX_PER_GROUP = 3;
	var MSG_MAX   = '每項標籤類別最多' + MAX_PER_GROUP + '項';
	var MSG_EMPTY = '至少需要選擇1個標籤選項';

	var $overlay = $('#tagModalOverlay');
	var $body    = $('#tagModalBody');

	/* ---------- 開啟 / 關閉彈窗 ---------- */
	$('#btnTagSelect').on('click', function(){ $overlay.addClass('open'); });
	$('.tag-modal-close').on('click', function(){ $overlay.removeClass('open'); });
	$overlay.on('click', function(e){
		if (e.target === this) $overlay.removeClass('open');
	});

	/* ---------- 初始狀態：隱藏小標籤面板與「已選取」版大標籤 ---------- */
	$('.tag-pill[data-panel]').each(function(){
		$('#' + $(this).data('panel')).hide();
	});
	$('.tag-pill-selected[data-panel]').hide().removeClass('on');

	/* ---------- 小工具 ---------- */
	function pillText($el){
		return $.trim($el.find('span').last().text());
	}

	function setError($scope, msg){
		$scope.find('.tag-category-error').first()
			.text(msg)
			.toggleClass('show', !!msg);
	}

	// 取得某個分類(產品分類 / 遊戲類型 / 故事題材 / 遊戲玩法)目前選了幾個
	function groupCount($group){
		if ($group.data('group') === 'genre') {
			return $group.find('.tag-pill-selected.on').length;   // 大標籤
		}
		return $group.find('.tag-pill.selected').length;
	}

	function updateStatus(){
		var allFilled = true;
		$('[data-group]').each(function(){
			if (groupCount($(this)) === 0) allFilled = false;
		});
		$('#tagModalStatus')
			.text(allFilled ? '已完成所有分類的標籤選擇' : '請至少為每個分類選擇1個標籤')
			.toggleClass('ok', allFilled);
	}

	// 一般切換：已選 → 取消；未選 → 若未達上限就選取，否則顯示錯誤
	function toggleLimited($pill, $scope){
		if ($pill.hasClass('selected')) {
			$pill.removeClass('selected');
			setError($scope, '');
		} else if ($scope.find('.tag-pill.selected').length >= MAX_PER_GROUP) {
			setError($scope, MSG_MAX);
		} else {
			$pill.addClass('selected');
			setError($scope, '');
		}
		updateStatus();
	}

	/* ---------- 大標籤（遊戲類型）：選取 → 展開小標籤面板 ---------- */
	$body.on('click', '.tag-pill[data-panel]', function(){
		var $white = $(this);
		var $group = $white.closest('[data-group]');
		if (groupCount($group) >= MAX_PER_GROUP) {
			setError($group, MSG_MAX);
			return;
		}
		var panel = $white.data('panel');
		$white.hide();
		$('#' + $white.attr('id') + 'r').addClass('on').show();
		$('#' + panel).show();
		setError($group, '');
		updateStatus();
	});

	/* ---------- 大標籤（已選取版）：再點 → 取消並收起面板 ---------- */
	$body.on('click', '.tag-pill-selected[data-panel]', function(){
		var $blue  = $(this);
		var $group = $blue.closest('[data-group]');
		var panel  = $blue.data('panel');
		var $panel = $('#' + panel);

		$blue.removeClass('on').hide();
		$('#' + $blue.attr('id').replace(/r$/, '')).show();

		// 收起面板時，一併清除裡面已選的小標籤，避免隱藏的選項被送出
		$panel.find('.tag-pill.selected').removeClass('selected');
		$panel.find('.tag-category-error').text('').removeClass('show');
		$panel.hide();

		setError($group, '');
		updateStatus();
	});

	/* ---------- 小標籤（small_tag）：點一下選取(藍)，再點一次取消(白)，每個小分類最多 3 個 ---------- */
	$body.on('click', '.tag-pill.small_tag', function(){
		var $pill = $(this);
		toggleLimited($pill, $pill.closest('.tag-sub-category'));
	});

	/* ---------- 其他分類的一般標籤（產品分類 / 故事題材 / 遊戲玩法）：同樣可多選、最多 3 個 ---------- */
	$body.on('click', '[data-group] .tag-pill:not([data-panel])', function(){
		var $pill = $(this);
		toggleLimited($pill, $pill.closest('[data-group]'));
	});

	/* ---------- 完成：檢查每個分類至少 1 個，並把結果寫進「遊戲標籤」欄位 ---------- */
	$('#tagModalDone').on('click', function(){
		var hasError = false;
		$('[data-group]').each(function(){
			var $g = $(this);
			if (groupCount($g) === 0) {
				setError($g, MSG_EMPTY);
				hasError = true;
			}
		});
		if (hasError) return;

		var tags = [];
		$('[data-group]').each(function(){
			var $g = $(this);
			if ($g.data('group') === 'genre') {
				$g.find('.tag-pill-selected.on').each(function(){
					var $big = $(this);
					tags.push(pillText($big));
					$('#' + $big.data('panel')).find('.tag-pill.selected').each(function(){
						tags.push(pillText($(this)));
					});
				});
			} else {
				$g.find('.tag-pill.selected').each(function(){
					tags.push(pillText($(this)));
				});
			}
		});

		var input = document.getElementById('field-tags-input');
		if (input) {
			input.value = tags.join('、');
			// 通知第 2 步的完成度檢查重新計算
			input.dispatchEvent(new Event('input', { bubbles: true }));
		}
		$overlay.removeClass('open');
	});

	/* ---------- 供「重設表單」呼叫：清空所有標籤選取 ---------- */
	window.resetTagSelections = function(){
		$('.tag-pill.selected').removeClass('selected');
		$('.tag-pill-selected[data-panel]').removeClass('on').hide();
		$('.tag-pill[data-panel]').show();
		$('.tag-pill[data-panel]').each(function(){ $('#' + $(this).data('panel')).hide(); });
		$('.tag-category-error').text('').removeClass('show');
		updateStatus();
	};

	updateStatus();
});
