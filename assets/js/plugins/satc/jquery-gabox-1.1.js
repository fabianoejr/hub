$.fn.gabox = function(settings)
{
	var defaults = {
		img_carregando:"assets/img/loadingAnimation.gif",
		img_fechar:"assets/img/cross.png",
		abrir_auto: false,
		url:"",
		titulo:"", 
		fechar:false
	}	
	
	settings = $.extend(defaults, settings);
	
	$(this).on("click", function(events)
	{
		var titulo = this.title;
		var pagina = this.href;

		exibirBox(titulo,pagina,false);
		this.blur();
		return false;
	});		

	if (settings.abrir_auto)
	{
		exibirBox(settings.titulo, settings.url);
	}

	if (settings.fechar)
	{
		remover_auto_box();
	}

	function exibirBox(titulo, url)
	{
		try
		{
			//Verifica se a pagina possui fundo
			if (!$("#ga_background_body")[0])
			{
				var altura_pagina = $("html")[0].scrollHeight < $(window).height() ? $(window).height() : $("html")[0].scrollHeight;
				$("body").append("<div id='ga_background_body' style='height:"+altura_pagina+"px'></div><div id='ga_box'></div>");
				$("#ga_background_body").click(removerBox);
			}
		
			//Detecta Navegador
			if (detectaNavegador())
			{
				$("#ga_background_body").addClass("TB_overlayMacFFBGHack");
			}
			else
			{
				$("#ga_background_body").addClass("ga_background_color");
			}
			
			//Verifica titulo
			if (titulo===null)
			{
				titulo = "";
			}
			
			//Mostra a Imagem de Carregando
			$("body").append("<div id='ga_load' style='display:block'><img src='"+settings.img_carregando+"'/></div>");
		
			var queryString = url.replace(/^[^\?]+\??/,'');
			
			if (queryString=="")
			{
				var temp = "?random="+(new Date().getTime());
			}
			else
			{
				var temp = "&random="+(new Date().getTime());
			}
				
			var parametros = converteObjeto(queryString);
			
			var largura_box = parseInt(parametros['width'],10) + 30 || 630;
			var altura_box = parseInt(parametros['height'],10) + 40 || 440;
			
			var largura_conteudo = largura_box - 12;
			var altura_conteudo = altura_box - 45;
			
			//Joga conteudo para dentro do box
			if ($("#ga_box").css("display")!="block")
			{
				$("#ga_box").append("<div id='ga_topo'>"+
										"<div id='ga_titulo'>"+titulo+"</div>"+
										"<div id='ga_fechar_box'>"+
											"<a href='javascript:void(0)' id='ga_botao_fechar'>"+
												"<img src='"+settings.img_fechar+"' border='0' title='Fechar' alt='Fechar'>"+
											"</a>"+
										"</div>"+
									"</div>"+
									"<div id='ga_conteudo_tamanho' style='width:"+largura_conteudo+"px;height:"+altura_conteudo+"px'>"+
										"<div id='ga_conteudo'></div>"+
									"</div>");
			}
			$("#ga_botao_fechar").click(removerBox);
			
			//Carrega Pagina para dentro da div flutuante		
			$("#ga_conteudo").load(url+temp,
				function()
				{
					posicaoBox(largura_box, altura_box);
					$("#ga_load").remove();
					$("#ga_box").css({display:"block"});
				});

			if(!parametros['modal'])
			{
				document.onkeyup = function(e)
				{ 	
					if (e==null) // ie
					{
						keycode = event.keyCode;
					}
					else // mozilla
					{
						keycode = e.which;
					}
					if (keycode==27)
					{
						removerBox();
					}
				}
			}
		
		} catch(e) {
			//Testar outros navegadores
		}
	}

	function removerBox()
	{
		$("#ga_botao_fechar").unbind("click");
		$("#ga_box").fadeOut("fast",function()
		{
			$('#ga_box,#ga_background_body').trigger("unload").unbind().remove();
		});
		$("#ga_load").remove();
		document.onkeydown = "";
		document.onkeyup = "";
		return false;
	}
	
	function remover_auto_box()
	{
		$("#ga_conteudo").remove();
		$("#ga_conteudo_tamanho").remove();
		$("#ga_botao_fechar").remove();
		$("#ga_fechar_box").remove();
		$("#ga_titulo").remove();
		$("#ga_topo").remove();
		$("#ga_box").remove();
		$("#ga_background_body").remove();
		
		document.onkeydown = "";
		document.onkeyup = "";
		return false;
	}	

	function posicaoBox(largura_box, altura_box)
	{
		$("#ga_box").css({marginLeft: '-' + parseInt((largura_box / 2),10) + 'px', width: largura_box + 'px'});
		$("#ga_box").css({marginTop: '-' + parseInt((altura_box / 2),10) + 'px'});
	}

	//Passa para string para JSON
	function converteObjeto(valor)
	{
		var variavel = "";
		var valor_variavel = "";
		var linha = ""
		var parametros = {};

		if (!valor || valor=="")
		{
			return parametros;
		}
		
	   	var valor_split = valor.split("&");

	   	for ( var i = 0; i < valor_split.length; i++ )
	   	{
			linha = valor_split[i].split("=");
		  
			if ( !linha || linha.length!=2 )
			{
				continue;
			}
			
			variavel = unescape(linha[0]);
			valor_variavel = unescape(linha[1]);
			parametros[variavel] = valor_variavel;
	   }
	   return parametros;
	}

	// Verifica navegador
	function detectaNavegador()
	{
		var userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1)
		{
			return true;
		}
	}
	
	function isObject(obj)
	{
		for(var prop in obj)
		{
			if(obj.hasOwnProperty(prop))
			{
				return false;
			}
		}
		return true;
    }
}