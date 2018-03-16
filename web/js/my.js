function showMobileNavFloatLayer(elem) {
    var iCurNum = $('#MobileNav').attr('navnum') || 1;
    if (iCurNum == 1 || iCurNum == 5) {
        $("#pagebody").css({"-ms-transition": "0.5s","-webkit-transition": "0.5s","-khtml-transition": "0.5","-o-transition": "0.5s","-moz-transition": "0.5s","transition": "0.5s"});
        var iTranslateX = 0;
        // if (!$('#pagebody').hasClass('showFloatNav')) {
        //     if (iCurNum == 1) iTranslateX = 17 + 'rem';
        //     if (iCurNum == 5) iTranslateX = 6 + 'rem';
        // }
        $('#pagebody').css('left', iTranslateX);
    } else {
        $("#pagebody").css({"-ms-transition": "","-webkit-transition": "","-khtml-transition": "","-o-transition": "","-moz-transition": "","transition": ""});
    }
    $('#MobileNav').toggleClass('showFloatNav');
    $('#MobileNavRenderElem').toggleClass('showFloatNav');
    $('#MobileNavFloatLayer').toggleClass('showFloatNav');
    $('#pagebody').toggleClass('showFloatNav');
    $('#MobileFootNav').toggleClass('showFloatNav');
    $('#MobileNavMask').toggleClass('showFloatNav');
}

function setMobileNav() {
    if ($('#MobileNav').length > 0) {
        var iCurNum = $('#MobileNav').attr('navnum') || 1;
        var iCurColor = $('#MobileNav').attr('navcolor') || 'black';
        var iItemType = $('#MobileNav').attr('navitemtype') || 0;
        var iEnable = $('#MobileNav').attr('enable') || 0;

        $('#MobileNav').attr('class', 'mobileNav mobileNav_' + iCurNum + ' ' + iCurColor);
        $('#MobileNavRenderElem').attr('class', 'mobileNavRenderElem mobileNavRenderElem_' + iCurNum + ' ' + iCurColor);
        $('#MobileNavFloatLayer').attr('class', 'mobileNavFloatLayer mobileNavFloatLayer_' + iCurNum + ' ' + iCurColor + ' itemType' + iItemType);
        $('#pagebody').attr('class', $('#pagebody').attr('class').replace(/(pagebody_nav(_\d+)?)|(showFloatNav)/ig, '') + ' pagebody_nav pagebody_nav_' + iCurNum);

        if ($('#MobileFootNav').length > 0) {
            $('#MobileFootNav').attr('class', $('#MobileFootNav').attr('class').replace(/(mobileFootNav(_\d+)?)|(showFloatNav)/ig, '') + ' mobileFootNav_' + iCurNum);
        }
        $('#MobileNavMask').attr('class', 'mobileNavMask mobileNavMask_' + iCurNum).off('click').on('click', function () {
            showMobileNavFloatLayer();
        }).off('touchstart').on('touchstart', function () {
            evt = window.event || evt;
            evt.preventDefault();
            showMobileNavFloatLayer();
            return false;
        })

        $('#MobileNavFloatLayer').off('click'); $('#MobileNavFloatLayer').off('touchstart'); $('#MobileNavFloatLayer').off('touchmove');

        // 分开写是因为pagebody scale后，会影响pagebody同级的100%高度的元素的高度
        if ($.inArray(iCurNum, ["1", "2", "5", "8"]) > -1) {
            $('#MobileNavFloatLayer').off().on('touchstart', function (evt) {
                evt = window.event || evt;
                iStartPosY = evt.targetTouches[0].pageY;
                var top = $(this).children('.itemList').css('top');
                if(top == 'auto' || top == '') top = 0;
                iMobileNavItemListStartTop = parseInt(top);
            }).on('touchmove', function (evt) {
                if ($(window).height() > $(this).children('.itemList').outerHeight()) {
                    evt.preventDefault();
                    return false;
                }
                evt = window.event || evt;
                evt.preventDefault();
                iEndPosY = evt.targetTouches[0].pageY;
                iSlideDistance = iEndPosY - iStartPosY;
                var iTop = iMobileNavItemListStartTop + iSlideDistance;
                if (iTop > 0) iTop = 0;
                var iHiddenHeight = $(window).height() - $(this).children('.itemList').outerHeight() - $('#MobileNavFloatLayer').position().top - parseInt($(this).children('.itemList').css('margin-top'));
                if (iTop < iHiddenHeight) iTop = iHiddenHeight;
                if(typeof(window.top.frames['pageframe']) == 'undefined') $('#MobileNavFloatLayer .itemList').css('top', iTop + "px");
                return false;
            });
        }

        if($.inArray(iCurNum, ["2", "3", "8"]) > -1){
            $('#MobileNavFloatLayer').css("top",$(".mobileNav").height())
        }
        if($.inArray(iCurNum, ["1", "5"]) > -1){
            try{
                if(typeof(window.top.frames['pageframe']) != 'undefined') $('#MobileNavFloatLayer').css("top",'0');
            }catch(ex){
            }
        }
        if(iEnable != 1 || $.inArray(iCurNum, ["4", "6", "7"]) > -1){
            $('#MobileNavRenderElem').hide();
        }else{
            //$('#MobileNavRenderElem').show();
        }
        if ($.inArray(iCurNum, ["4"]) > -1) {
            $('#MobileNavFloatLayer').off().on('touchstart', function (evt) {
                evt = window.event || evt;
                iStartPosY = evt.targetTouches[0].pageY;
                iMobileNavItemListStartTop = parseInt($(this).children('.itemList').css('top'));
            }).on('touchmove', function (evt) {
                if ($(this).height() > $(this).children('.itemList').outerHeight()) {
                    evt.preventDefault();
                    return false;
                }
                evt = window.event || evt;
                evt.preventDefault();
                iEndPosY = evt.targetTouches[0].pageY;
                iSlideDistance = iEndPosY - iStartPosY;
                var iTop = iMobileNavItemListStartTop + iSlideDistance;
                if (iTop > 0) iTop = 0;
                var iHiddenHeight = $(this).height() - $(this).children('.itemList').outerHeight();
                if (iTop < iHiddenHeight) iTop = iHiddenHeight;
                $('#MobileNavFloatLayer .itemList').css('top', iTop + "px");
                return false;
            });
        }

        if (iCurNum == 6) {
            if (typeof isDesignMode != 'undefined' && isDesignMode === true) {
                $('#MobileNavFloatLayer').on('click', function () {
                    showMobileNavFloatLayer();
                })
            }

            $('#MobileNavFloatLayer').on('touchstart', function (evt) {
                evt = window.event || evt;
                var curTarget = $(evt.targetTouches[0].target);
                if (curTarget.is('.itemLink') || curTarget.is('.icon') || curTarget.is('.menuName')) {
                    return true;
                }
                evt.preventDefault();
                showMobileNavFloatLayer();
                return false;
            });
        }

        if (iCurNum == 7) {
            $('#MobileNavFloatLayer').on('touchstart', function (evt) {
                evt = window.event || evt;
                iStartPosX = evt.targetTouches[0].pageX;
                iMobileNavFloatLayerItemListStartPosX = parseInt($(this).children('.itemList').css('left'));
            });

            $('#MobileNavFloatLayer').on('touchmove', function (evt) {
                evt = window.event || evt;
                if ($(this).width() > $(this).children('.itemList').outerWidth()) {
                    evt.preventDefault();
                    return false;
                }
                evt.preventDefault();
                iEndPosX = evt.targetTouches[0].pageX;
                iSlideDistance = iEndPosX - iStartPosX;
                var iItemListLeft = iMobileNavFloatLayerItemListStartPosX + iSlideDistance;
                if (iItemListLeft > 0) iItemListLeft = 0;
                var iHiddenWidth = $(this).width() - $(this).children('.itemList').outerWidth();
                if (iItemListLeft < iHiddenWidth) iItemListLeft = iHiddenWidth;
                $('#MobileNavFloatLayer .itemList').css('left', iItemListLeft + "px");
                return false;
            });
        } else {
            $('#MobileNavFloatLayer .itemList').css({
                width: ''
            });
        }
    }
}