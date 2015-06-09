var strSiteURL = "http://fileo.ir/"
//var strSiteURL = "http://192.168.8.100:805/"
function reLoadPages() {
    $(".ipage,.nocatchpage").height($('html').height() - 90);
    $.ajax(strSiteURL + "ping.asp", {
        timeout: 5000,
        beforeSend: function (xhr) {
            $('.ipage').html('<div class="reload"><i class="fa fa-refresh fa-spin"></i>در حال اتصال به سرور...</div>');
            $(".reload").height($('html').height() - 200);
        },
        error: function () {
            $('.ipage').html('<div class="reload" onclick="reLoadPages()"><i class="fa fa-refresh"></i>عدم دسترسی به اینترنت</div>');
            $(".reload").height($('html').height() - 200);
        },
        success: function () {
            $('.ipage').each(function () {
                $(this).find('.reload').html('<i class="fa fa-refresh fa-spin"></i>در حال دریافت اطلاعات...');
                $(this).load(strSiteURL + $(this).attr("page") + '/');
                //$(this).append('<iframe src="' + strSiteURL + 'webservice.asp?page=' + $(this).attr("page") + '" onload="$(this).show(); removeLoading();" style="display:none;"></iframe>');
                //$("iframe").height($('html').height() - 100);
            });
        }
    })
}
function removeLoading() {
    $('.reload').remove();
}

function getPage(_page) {
    $(".ipage,.nocatchpage").height($('html').height() - 90);
    $.ajax(strSiteURL + "ping.asp", {
        timeout: 5000,
        beforeSend: function (xhr) {
            _page.find('.ui-content').html('<div class="reload"><i class="fa fa-refresh fa-spin"></i>در حال اتصال به سرور...</div>');
            $(".reload").height($('html').height() - 200);
        },
        error: function () {
            _page.find('.ui-content').html('<div class="reload" onclick="reLoadPages()"><i class="fa fa-refresh"></i>عدم دسترسی به اینترنت</div>');
            $(".reload").height($('html').height() - 200);
        },
        success: function () {
            _page.find('.reload').html('<i class="fa fa-refresh fa-spin"></i>در حال دریافت اطلاعات...');
            _page.find('.ui-content').append('<iframe src="' + strSiteURL + 'webservice.asp?page=' + _page.find(".ui-content").attr("page") + '" onload="$(this).show(); removeLoading();" style="display:none;"></iframe>');
            $("iframe").height($('html').height() - 100);
        }
    })
}

$(document).ready(function () {
    reLoadPages();
    $(window).resize(function () {
        $("iframe").height($('html').height() - 100);
        $(".ipage,.nocatchpage").height($('html').height() - 90);
        $(".reload").height($('html').height() - 200);
    });
});
$(document).bind("mobileinit", function () {
    $.mobile.allowCrossDomainPages = true;
});

$(document).on("pagebeforeshow", "[data-role='page']", function () {
    _page = $('#'+$(this).attr('id'))
    if (!_page.find('.ui-content').hasClass('ipage')) {
        getPage(_page)
    } else {
        strMM = _page.find('iframe').contentWindow
        if (typeof (strMM) != "undefined") {
            strLoc = strMM.location
            strPage = _page.find('.ui-content').attr('page')
            if (strLoc.indexOf(strPage) == -1) getPage(_page)
        }
    }
});
$(document).one("pagecreate", "[data-role='page']", function () {
    $("[data-role='panel']").panel().enhanceWithin();
    $("[data-role='header'], [data-role='footer']").toolbar({ theme: "a" });
});
$(document).on("pageshow", "[data-role='page']", function () {
    var thePage = $(this),
        title = thePage.jqmData("title"),
        next = thePage.jqmData("next"),
        prev = thePage.jqmData("prev");
    $("#header").text(title);

    var current = $(this).attr("id");
    $("[data-role='navbar'] a").addClass('ui-alt-icon').removeClass("ui-btn-active");
    $("[data-role='navbar'] a").each(function () {
        if ($(this).attr("href").replace('#', '') === current) {
            $(this).addClass("ui-btn-active").removeClass('ui-alt-icon');
        }
    });
});