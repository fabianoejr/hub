$(function() {
	/*icon navigation*/
	ebro_navigation.icons();
	/*text navigation*/
	ebro_navigation.text();
	/*mobile navigation*/
	ebro_navigation.mobile();
	/*accordions*/
	ebro_accordions.init();
	/*tooltips_popovers*/
	ebro_tooltips_popovers.init();
	/*main search autocomplete*/
	ebro_autocomplete.init();
	/*datepicker*/
	ebro_datepicker.init();
	/*masked inputs*/
	ebro_maskedInputs.init();
	/*valor*/
	ebro_valor.init();
	/*inteiro*/
	ebro_inteiro.init();
	/*gabox*/
	ebro_gabox.init();
	/*maxlength no textarea*/
	ebro_textarea_maxlength.init();
	/*select2*/
	ebro_select2.init();

	/*don't close dropdown on document click*/
	$('.notification_dropdown .dropdown-menu').click(function(e) {
		e.stopPropagation();
	});

	if (parent.frames['footer'])
	{
		parent.frames['footer'].location.reload();
	}
});

/*get text without DOM element from node*/
jQuery.fn.justtext=function(){return $.trim($(this).clone().children().remove().end().text())};

/*avoid 'console' errors in browsers that lack a console*/
if (!(window.console && console.log)) {
	(function() {
		var noop = function() {};
		var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
		var length = methods.length;
		var console = window.console = {};
		while (length--) {
			console[methods[length]] = noop;
		}
	}());
}

/*detect touch devices */
function is_touch_device() {
	return !!('ontouchstart' in window);
};

/*detect HiRes displays*/
function isRetina(){
	var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
			(min--moz-device-pixel-ratio: 1.5),\
			(-o-min-device-pixel-ratio: 3/2),\
			(min-resolution: 1.5dppx)";
	if (window.devicePixelRatio > 1)
		return true;
	if (window.matchMedia && window.matchMedia(mediaQuery).matches)
		return true;
	return false;
};

/*browser detect*/
jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

/*navigation*/
ebro_navigation = {
    /*icon navigation*/
    icons: function() {
        if($('#icon_nav_v').length && $('#icon_nav_v').is(':visible')) {
			/*sticky menu */
			$('#icon_nav_v').sticky('.main_section',{
				animate: false,
				useFixed: false,
				animTime: 300
			});
		}
	},
	/*text navigation*/
	text: function() {
        if($('#text_nav_v').length && $('#text_nav_v').is(':visible')) {
			/*Initialize navgoco with default options*/
			$("#text_nav_v").navgoco({
				caret: '<i class="icon-angle-down"></i>',
				accordion: false,
				openClass: 'parent_active',
				save: true,
				cookie: {
					name: 'navgoco',
					expires: false,
					path: '/'
				},
				slide: {
					duration: 400,
					easing: 'swing'
				}
			});

			$("#text_nav_v_collapse").click(function(e) {
				e.preventDefault();
				$("#text_nav_v").navgoco('toggle', false);
			});

			$("#text_nav_v_expand").click(function(e) {
				e.preventDefault();
				$("#text_nav_v").navgoco('toggle', true);
			});

			/*sticky menu */
			$('#text_nav_v').sticky('.main_section',{
				animate: false,
				useFixed: false,
				animTime: 300
			});

        }
        if($('#text_nav_h').length && $('#text_nav_h').is(':visible')) {

			/*sub-level menu*/
            $("#text_nav_h").jMenu({
				openClick : (is_touch_device()) ? true : false,
				ulWidth : 200,
				absoluteTop : 31,
				absoluteLeft : 0,
				effects : {
					effectSpeedOpen : 100,
					effectSpeedClose : 100,
					effectTypeOpen : 'show',
					effectTypeClose : 'hide',
					effectOpen : 'linear',
					effectClose : 'linear'
				},
				TimeBeforeOpening : 100,
				TimeBeforeClosing : 100,
				animatedText : false
			});
            /*add arrow to navigation parent*/
            $('#text_nav_h a.fNiv').each(function() {
                if($(this).next('ul').length) {
					$(this).addClass('isTopParent').append('<i class="icon-angle-down"></i>')
				}
            });
            $('#text_nav_h ul a.isParent').each(function() {
                $(this).append('<i class="icon-angle-right"></i>');
            });
            /*add "active" class on mouseenter*/
            $('#text_nav_h li').on('mouseenter',function() {
                $(this).addClass('active');
            }).on('mouseleave',function() {
                $(this).removeClass('active');
            });
        }
    },
	/*mobile navigation*/
	mobile: function() {
	    if($('#text_nav_v').length) {
	        $("#text_nav_v").tinyNav({
	            target: $('#mobile_navigation'),
	            active: 'link_active'
	        });
			$('#mobile_navigation select').addClass('form-control').wrap('<div class="container" />');
	    }
	    if($('#text_nav_h').length) {
	        $("#text_nav_h").tinyNav({
	            target: $('#mobile_navigation'),
				active: 'link_active'
	        });
			$('#mobile_navigation select').addClass('form-control').wrap('<div class="container" />');
	    }
	}
}

/*accordions*/
ebro_accordions = {
	init: function() {
		$('.panel-group .panel-title a').each(function() {
			var $this = $(this);
			$this.append('<span class="icon-angle-left"></span>');
		})

		$('.panel-group .panel-collapse.in').each(function() {
			var $this = $(this);
			$this.closest('.panel').addClass('sect_active').find('.panel-title [class^="icon-"]').toggleClass('icon-angle-left icon-angle-up')
		})

		/*add active class (accorion show)*/
		$('.panel-group .panel-collapse').on('show.bs.collapse',function() {
			$(this).closest('.panel').addClass('sect_active').find('.panel-title [class^="icon-"]').toggleClass('icon-angle-left icon-angle-up');
		}).on('hide.bs.collapse',function() {
			$(this).closest('.panel').removeClass('sect_active').find('.panel-title [class^="icon-"]').toggleClass('icon-angle-left icon-angle-up');
		});
	}
}

/*tooltips, popovers*/
ebro_tooltips_popovers = {
	init: function() {
		$('[data-toggle=tooltip]').tooltip();
		$('[data-toggle=popover]').popover();
	}
}

/*autocomplete*/
ebro_autocomplete = {
	init: function() {
		$('.main_search .typeahead').typeahead({
			name: 'ebro-countries',
			valueKey: 'name',
			prefetch: 'js/lib/typeahead.js/example.json',
			template: [
				'<p class="sg_main"><b>{{name}}</b> <small class="text-muted">{{tld}}</small></p>',
				'<p class="sg_desc">{{subregion}}</p>'
			].join(''),
			engine: Hogan
		});
	}
}

/*datepicker*/
ebro_datepicker = {
    init: function() {
        if($('.ebro_datepicker').length) {
            $('.ebro_datepicker').datepicker()
        }
    }
};

/*masked inputs*/
ebro_maskedInputs = {
	init: function() {
		$(".mask_date").inputmask("dd/mm/yyyy",{ "placeholder": "dd/mm/yyyy", showMaskOnHover: false });
		$(".mask_phone").inputmask("mask", {"mask": "(99) 9999-9999"});
		$(".mask_numeric").inputmask('€ 999.999,99', { numericInput: false });
		$(".mask_callback").inputmask("mm/dd/yyyy",{ "placeholder": "mm/dd/yyyy", "oncomplete": function(){ alert('Date entered: '+$(this).val()); } });
		$(".mask_unidade").inputmask("mask", {"mask": "99.99-999"});
		$(".mask_plano").inputmask("mask", {"mask": "99-999"});
		$(".mask_ano_mes").inputmask("mask", {"mask": "9999/99"});
        $(".mask_cpf").inputmask("mask", {"mask": "999.999.999-99"});
        $(".mask_cep").inputmask("mask", {"mask": "99999-999"});
		$('[data-inputmask]').inputmask();
	}
};

/*valor*/
ebro_valor = {
    init: function(){
        if($('.ebro_valor').length) {
            $(".ebro_valor").maskMoney({thousands:'.', decimal:',', allowNegative:true});
        }
    }
};

/*inteiro*/
ebro_inteiro = {
    init: function(){
        if($('.ebro_inteiro').length) {
            $(".ebro_inteiro").keyup(function(){NumReal(this,'','',0);});
        }
    }
};

/*gabox*/
ebro_gabox = {
    init: function(){
        if ($("button.gabox21").length>0)
        {
            $("button.gabox21").gabox21();
        }
    }
};

/*maxlength no textarea*/
ebro_textarea_maxlength = {
    init: function(){
		$("textarea[maxlength]").keypress(function(event){
		    var key = event.which;
		    if(key >= 33 || key == 13) {
		        var maxLength = $(this).attr("maxlength");
		        var length = this.value.length;
		        if(length >= maxLength) {
		            event.preventDefault();
		        }
		    }
		});
    }
};
/*menu em formato de arvore*/
ebro_treeview = {
	carregar: function(id, nodes, checks) {
		if ($(".ztree")[0])
		{
			if ( typeof param == 'undefined' ) {
				param = 'Valor padrão';
			}

		    var setting = {
		        view: {
		            showIcon: function(treeId, treeNode) { return !treeNode.isParent; },
		            showLine: false,
		            fontCss: function(treeId, node) { return node.font ? node.font : {}; },
		            nameIsHTML: true,
		            selectedMulti: false
		        },
		        check: {
		            enable: checks
		        },
		        data: {
		            simpleData: {
		                enable: true
		            }
		        }
		    };

			var zNodes = jQuery.parseJSON(nodes);

		    $.fn.zTree.init($("#"+id), setting, zNodes);
		    var zTree = $.fn.zTree.getZTreeObj(id);
		    type = { "Y" : "s", "N" : "s" };
		    zTree.setting.check.chkboxType = type;
		}
	}
}

/*select2*/
ebro_select2 = {
    init: function() {
        if($('.select2').length>0)
        {
            $('.select2').removeClass("form-control input-sm");
            $('.select2').select2({
                allowClear: true,
                placeholder: "- Selecionar -"
            });
        }
    }
}