function initProductListGiant(moduleId, layout, options) {
    if ($.inArray(parseInt(layout), [104, 105, 106, 107, 108, 109 ,110,111, 112, 113, 114, 115,116,117]) > -1) {
		addScripts(['/skinp/common/mobile/js/jquery.sideSwitch.js','/skinp/common/mobile/js/screeRow.js','/skinp/common/mobile/collection/js/jq.toch.js'],function(){
			//Ipad和手机版初始化过滤
			$(window).on('resize.filterControll', function () {
				//初始化使用为固定定位
				if (window.innerWidth < 992) {
					$('#module_' + moduleId + ' .silder-filter').sideSwitch({
						myPosition: 'fixed',
						extra: '-20',
						offsetTop: '35px',
						contentLeft: '20px',
						initTop: '0',
						sideWidth: '0',
						contentWidth: (window.innerWidth >= 768 && window.innerWidth < 1199) ? window.innerWidth * .43 : window.innerWidth * .8,
						contentHeight: $(window).height(),
						btn: $('#module_' + moduleId + ' .btn-filter'),
						callback: function (_this) {
							ScrollFix(_this.find('.ss_content').get(0));
							setlineCent($('.FilterMobile'),_this);
							$('#module_' + moduleId + ' .shier').show().off('click').on('click',function(){
								$('#module_' + moduleId + ' .btn-filter').click();
								$('body').removeClass('bodyfixd');
								$('body').removeClass('bodyabstre');
								$(this).hide()
							});
						}
					});
				}else{
					$('#module_' + moduleId + ' .silder-filter').hide()
				}

				if (window.innerWidth >= 992) {
					$('#module_' + moduleId + ' .pred-filter').screeRow({
						btnClasses: {btn: 'btn', btn_event: 'btn-event', 'btn-more': 'btn-more'},
						roomClasses: {text_center: 'text-center', more: 'more', giantroom: 'giantroom'},
						callback: function () {
						}
					});
				}

				$('#module_' + moduleId + ' .shier').hide();
			})
			var setlineCent = function(dom,room){
				if(room.data('isfinish'))return
				dom.each(function(){
					var _this = $(this);
					_this.children().each(function(){
						if(($(this).find('span').height())<=30)$(this).find('span').addClass('transform-center');
						else $(this).find('span').css('height','33px');
					})
				})
				room.data('isfinish',true);
			}
			var ScrollFix = function(elem) {
				var u = navigator.userAgent;
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
				var startY, startTopScroll;
				elem.addEventListener('touchstart', function(event){
					if(isiOS){if(!$('body').hasClass('bodyabstre')) $('body').addClass('bodyabstre');}
					else{if(!$('body').hasClass('bodyfixd')) $('body').addClass('bodyfixd');}
					startY = event.touches[0].pageY;
					startTopScroll = elem.scrollTop;
					//当滚动条在最顶部的时候
					if(startTopScroll <= 0)
						elem.scrollTop = 1;
					//当滚动条在最底部的时候
					if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
						elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
				}, false);
			};
			var collapse = function (dom, kind) {
				var flag = $(dom).attr('attr-flag');
				if (kind == 'pc') {
					if (flag == 'true') {
						$(dom).parents('.setting-pred-warp').eq(0).find('.pred-items').height('auto');
						$(dom).find('.filter-fold').show();
						$(dom).find('.filter-more').hide();
						$(dom).attr('attr-flag', false)
					}
					else if (flag == 'false') {
						$(dom).parents('.setting-pred-warp').eq(0).find('.pred-items').height(35);
						$(dom).find('.filter-more').show();
						$(dom).find('.filter-fold').hide();
						$(dom).attr('attr-flag', true);
					};

				} else if (kind == 'mobile') {
					if (flag == 'true') {
						$(dom).parents('.filter-items').eq(0).find('ul').height('auto');
						$(dom).find('.filter-fold').show();
						$(dom).find('.filter-all').hide();
						$(dom).attr('attr-flag', false);
					}
					else if (flag == 'false') {
						$(dom).parents('.filter-items').eq(0).find('ul').height('40px');
						$(dom).find('.filter-all').show();
						$(dom).find('.filter-fold').hide();
						$(dom).attr('attr-flag', true);
					}
				}

			}
			$('#module_' + moduleId + ' .setting-cut' + ',#module_' + moduleId + ' .mobile-cut').click(function () {
				if ($(this).hasClass('setting-cut')) collapse(this, 'pc');
				else if ($(this).hasClass('mobile-cut')) collapse(this, 'mobile');
			})
			var touchOn = new jQtochfn({
				'objID':  '#module_' + moduleId + ' .silder-filter',//需要绑定tochs事件的元素
				tochStart: function (e, x, y, oSelf, positions) {
				},//tochStart的回调函数
				tochMove: function (e, direction, oSelf, positions) {

				},///tochMove的回调函数
				tochEnd: function (e, direction, oSelf, positions) {
					if (direction.x > $('body').width()*.3) {
						$('body').removeClass('bodyfixd');
						$('body').removeClass('bodyabstre');
						$('#module_' + moduleId + ' .btn-filter').click();
						$('#module_' + moduleId + ' .shier').hide();
					}

				},//tochStart的回调函数
				'objthis': {}//支持传入一个对象，方便在回调中调用传入对象的方法(创建容器对象)
			});
			$('#module_' + moduleId + ' .silder-filter').sideSwitch({
				myPosition: 'fixed',
				extra: '-20',
				offsetTop: '35px',
				contentLeft: '20px',
				initTop: '0',
				sideWidth: '0',
				contentWidth: (window.innerWidth >= 768 && window.innerWidth < 1199) ? window.innerWidth * .43 : window.innerWidth * .8,
				contentHeight: $(window).height(),
				btn: $('#module_' + moduleId + ' .btn-filter'),
				callback: function (_this) {
					ScrollFix(_this.find('.ss_content').get(0));
					setlineCent($('.FilterMobile'),_this);
					$('#module_' + moduleId + ' .shier').show().off('click').on('click',function(){
						$('#module_' + moduleId + ' .btn-filter').click();
						$('body').removeClass('bodyfixd');
						$('body').removeClass('bodyabstre');
						$(this).hide()
					});
			   }
			});
			$('#module_' + moduleId + ' .pred-filter').screeRow({
				btnClasses: {btn: 'btn', btn_event: 'btn-event', 'btn-more': 'btn-more'},
				roomClasses: {text_center: 'text-center', more: 'more', giantroom: 'giantroom'},
				callback: function () {
				}
			});
			$('#module_' + moduleId + ' .filter-items').each(function () {
				if ($(this).children('ul.FilterMobile').children().length <= 0) {
					$(this).hide()
				}
				;
				if ($(this).children('ul.FilterMobile').children().length <= 3) {
					$(this).find('.mobile-cut').eq(0).hide()
				}
				;
			});
			$('#module_' + moduleId + ' .filter-items ul li').click(function () {
				if ($(this).hasClass('items-active')) {
					$(this).parent().find('li').removeClass('items-active');
				} else {
					$(this).parent().find('li').siblings(".items-active").removeClass('items-active');
					$(this).addClass('items-active');
				}
			})
			$('#module_' + moduleId + ' .bean-reset').click(function () {
				$('.items-active').removeClass('items-active');
			})
			//PC产品筛选JS
			$('#module_' + moduleId + ' .FilterPc>li').off('touchend.orderCtrl click.orderCtrl').on('touchend.orderCtrl click.orderCtrl', function (e) {
				var filterProductPanel = $('#module_' + moduleId + ' .setting-tab-bar');
				filterProductList_Pc(filterProductPanel, this, moduleId, options.PageLink);
			});

			$('#module_' + moduleId + ' .setting-tab-bar .icon-cuowu').off('touchend.orderCtrl click.orderCtrl').on('touchend.orderCtrl click.orderCtrl', function (e) {
				var filterProductPanel = $('#module_' + moduleId + ' .setting-tab-bar');
				var filterItem = $(this).parent();
				filterProductList_Pc(filterProductPanel, filterItem, moduleId, options.PageLink);
			});

			//移动产品筛选JS
			$('#module_' + moduleId + ' .bean-finish').off('touchend.orderCtrl click.orderCtrl').on('touchend.orderCtrl click.orderCtrl', function (e) {
				var filterProductPanel = $('#module_' + moduleId + ' .FilterMobile');
				$('body').removeClass('bodyfixd');
				$('body').removeClass('bodyabstre');
				filterProductList_Mobile(filterProductPanel, moduleId, options.PageLink);

			});
		});
    }
	//处理有排序功能的
	$('#module_' + moduleId + ' .orderCtrlPanel>li').off('touchend.orderCtrl click.orderCtrl').on('touchend.orderCtrl click.orderCtrl', function (e) {
        if ($(this).hasClass('btn-filter')) {
            $('.selected').removeClass('selected');
            $(this).addClass('selected');
            return
        }
        sortProductList(this, moduleId, options['PageLink']);
    });
	window["initFunc" + moduleId] = function(){
		//统一处理只显示N行的
		if(options['MultiEllipsis']){
			addScript('/scripts/MultiEllipsis.js',function(){
				//标签页 或者 加载更多
				for(var i = 0; i < options['MultiEllipsis'].length;i++){
					new MultiEllipsis(options['MultiEllipsis'][i]);
				}
			});
		}

		//多列显示的风格处理统一行高
		if(options['LiHeight']){
			addScript('/scripts/LiHeight.js',function(){
				for(var i = 0; i < options['LiHeight'].length;i++){
					new LiHeight(options['LiHeight'][i]);
				}
			});
		}
	};
	window["initFunc" + moduleId]();
	$(window).off('resize.module'+moduleId).on('resize.module'+moduleId, function() {
		window["initFunc" + moduleId]();
	});
}