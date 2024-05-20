(function($){
	$.fn.gabox21 = function(options) {

		var defaults = { id_box:"", fechar: false, abrir_auto: false, title:"", remote:"", id_loading:"" }

		options = $.extend(defaults, options);

		$(this).click(function(){

			var $this  = $(this);
			var id 	   = $this.data('target');
			var remote = $this.data('remote');
			var title  = $this.data('title');

			exbir_box(id, title);

			$("#"+id+" .modal-body").load(remote,
				function(e){
					$('#'+id).modal('show');
				});
		});

		if (options.fechar)
		{
			remover_box(options.id_box);
		}

		if (options.abrir_auto)
		{
			exbir_box(options.id_box, options.title);

			if (options.remote!="")
			{
				$("#"+options.id_box+" .modal-body").load(options.remote,
					function(e){
						$('#'+options.id_box).modal('show');
						if (options.id_loading != '') {
							$('#'+options.id_loading).hide();
						}
					});
			}
			else
			{
				$('#'+options.id_box).modal('show');
				if (options.id_loading != '') {
					$('#'+options.id_loading).hide();
				}
			}
		}

	};

	function exbir_box(id, title)
	{
		$("body").append("<div class='modal modal_gabox' id='"+id+"'>"+
							 "<div class='modal-dialog'>"+
								"<div class='modal-content'>"+
									"<div class='modal-header'>"+
										"<button type='button' class='close' data-dismiss='modal'>&times;</button>"+
										"<h4 class='modal-title'>"+title+"</h4>"+
									"</div>"+
									"<div class='modal-body'></div>"+
									"<div class='modal-footer'>"+
										"<button type='button' class='btn btn-default btn-sm' data-dismiss='modal'>Fechar</button>"+
									"</div>"+
								"</div>"+
							"</div>"+
						"</div>");
		$('#'+id).on('hidden.bs.modal', function (e) {
			$('#'+id).remove();
		});
	}

	function remover_box(id)
	{
		$('#'+id).modal('hide');
		$('#'+id).remove();
	}

})(jQuery);