(function($){
	$.fn.gabox2 = function(options) {

		var defaults = { id_box:"", fechar: false }	
		
		options = $.extend(defaults, options);

		$(this).click(function(){

			var $this = $(this);
			var id = $this.data('target');
			var remote = $this.data('remote');
			var title = $this.data('title');

			exbir_box(id, title);

			$('#'+id).modal({show:true, remote:remote});
		});

		if (options.fechar)
		{
			remover_box(options.id_box);
		}

	};

	function exbir_box(id, title)
	{
		$("body").css("overflow","hidden");
		$("body").append("<div class='modal' id='"+id+"' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>"+
							"<div class='modal-dialog'>"+
								"<div class='modal-content'>"+
									"<div class='modal-header'>"+
										"<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>"+
										"<h4 class='modal-title'>"+title+"</h4>"+
									"</div>"+
									"<div class='modal-body'></div>"+
									"<div class='modal-footer'>"+
										"<button type='button' class='btn btn-default btn-xs' data-dismiss='modal'>Fechar</button>"+
									"</div>"+
								"</div>"+
							"</div>"+
						  "</div>");
		$('#'+id).on('hidden.bs.modal', function (e) {
			$("body").css("overflow","scroll");
			$('#'+id).remove();
		});
	}

	function remover_box(id)
	{
		$('#'+id).modal('hide');
		$('#'+id).remove();
	}

})(jQuery);