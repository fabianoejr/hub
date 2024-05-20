function charset_js(str){
	str = str.replace(/à/g,"\u00E0");
	str = str.replace(/á/g,"\u00E1");
	str = str.replace(/â/g,"\u00E2");
	str = str.replace(/ã/g,"\u00E3");
	str = str.replace(/ä/g,"\u00E4");
	str = str.replace(/è/g,"\u00E8");
	str = str.replace(/é/g,"\u00E9");
	str = str.replace(/ê/g,"\u00EA");
	str = str.replace(/ë/g,"\u00EB");
	str = str.replace(/ì/g,"\u00EC");
	str = str.replace(/í/g,"\u00ED");
	str = str.replace(/î/g,"\u00EE");
	str = str.replace(/ï/g,"\u00EF");
	str = str.replace(/ò/g,"\u00F2");
	str = str.replace(/ó/g,"\u00F3");
	str = str.replace(/ô/g,"\u00F4");
	str = str.replace(/õ/g,"\u00F5");
	str = str.replace(/ö/g,"\u00F6");
	str = str.replace(/ù/g,"\u00F9");
	str = str.replace(/ú/g,"\u00FA");
	str = str.replace(/û/g,"\u00FB");
	str = str.replace(/ü/g,"\u00FC");
	str = str.replace(/ç/g,"\u00E7");
	
	str = str.replace(/À/g,"\u00C0");
	str = str.replace(/Á/g,"\u00C1");
	str = str.replace(/Â/g,"\u00C2");
	str = str.replace(/Ã/g,"\u00C3");
	str = str.replace(/Ä/g,"\u00C4");
	str = str.replace(/Ç/g,"\u00C7");
	str = str.replace(/È/g,"\u00C8");
	str = str.replace(/É/g,"\u00C9");
	str = str.replace(/Ê/g,"\u00CA");
	str = str.replace(/Ë/g,"\u00CB");
	str = str.replace(/Ì/g,"\u00CC");
	str = str.replace(/Í/g,"\u00CD");
	str = str.replace(/Î/g,"\u00CE");
	str = str.replace(/Ï/g,"\u00CF");
	str = str.replace(/Ò/g,"\u00D2");
	str = str.replace(/Ó/g,"\u00D3");
	str = str.replace(/Ô/g,"\u00D4");
	str = str.replace(/Õ/g,"\u00D5");
	str = str.replace(/Ö/g,"\u00D6");
	str = str.replace(/Ù/g,"\u00D9");
	str = str.replace(/Ú/g,"\u00DA");
	str = str.replace(/Û/g,"\u00DB");
	str = str.replace(/Ü/g,"\u00DC");
	return str;
}
function satc_alert(str){
	
	str = charset_js(str);
	alert(str);
}
function satc_confirm(str){
	str = charset_js(str);
	if(confirm(str)){
		return true;
	}
	return false;
}
function valida_js(campos){
	var val = 0;
	if (campos!=""){
		campos = campos.split(",");
		
		var tam = campos.length;
		for (var i = 0 ; i <=tam-1; i++) {
			$("#"+campos[i]).css("border","1px solid #CCC");
			$("#"+campos[i]).css("background-color","#fff");
			if ($.trim($("#"+campos[i]).val())=="")
			{
				val = 1;
				$("#"+campos[i]).css("border","1px solid #f00");
				$("#"+campos[i]).css("background-color","#ffefef");
			}
		};

	}
	if (val==1)
	{
		alert("Preencha os campos em destaque.");
		return false;
	}
	else
	{
		return true;
	}
}
function valida_campos(obj)
{	
	var val = 0;

	$("#"+obj.id).find('*').each(function()
	{
		if (this.id)
		{
			if ($("#"+this.id).attr('valida'))
			{
				if (this.type=="radio")
				{
					if(!valida_radio(obj.id,this.attributes["name"].value))
					{
					
						val=1;
					}
				}
				else
				{
					$("#"+this.id).css("border","1px solid #CCC");
					$("#"+this.id).css("background-color","#fff");
					if ($.trim($("#"+this.id).val())=="")
					{
						val = 1;
						$("#"+this.id).css("border","1px solid #f00");
						$("#"+this.id).css("background-color","#ffefef");
					}
				}
			}
		}
	});

	if (val==1)
	{
		alert("Preencha os campos em destaque.");
		return false;
	}
	else
	{
		return true;
	}
}

function valida_radio1(a)
{
	alert(a);
}
function valida_radio(id,campo)
{
	var aux = "", checado = "", seq = 0, seq_inicio = "", seq_fim = "", seq = "", retorno = true;
	
	
	$("#"+id+" input:radio[name^='"+campo+"']").each(function(i, j){
	
		if (aux!=j.name)
		{
			checado = 0;
			aux = j.name;
	
			$("#"+id+" input:radio[name^='"+j.name+"']").each(function(i, j) {
				if (j.checked==true)
				{
					checado = 1;
				}
			});
			
				
			if (checado==0)
			{	
				$(".radio_group").css("border","1px #F00 solid");
				$(".radio_group").css("background-color","#ffefef");
				retorno = false;
			}
			else
			{
				$(".radio_group").css("border","0px");	
				$(".radio_group").css("background-color","#ffffff");
			}				
		}
	});
	return retorno;
}

function salvaFormulario(obj, caminhoSalvar, caminhoRetorno, tipo, msg)
{
	if (!valida_campos(obj))
	{
		return false;
	}

	if (typeof tipo !== 'undefined' || tipo=="")
	{
		tipo='ajax';
	}

	if (tipo=='ajax')
	{
		var myform = $("#"+obj.id);
		var disabled = myform.find(':input:disabled').removeAttr('disabled');
		/*inicio ckeditor*/
		if (typeof CKEDITOR!='undefined')
		{
			for (instance in CKEDITOR.instances)
			{
				if ($("#"+obj.id+" #"+instance)[0])
				{
					$("#"+obj.id+" #"+instance).val($.base64.encode(CKEDITOR.instances[instance].getData()));
				}
			}
			/*$('textarea').trigger('keyup');*/
		}
		/*fim ckeditor*/		
		
		dados = $("#"+obj.id).serialize();
		
		disabled.attr('disabled','disabled');

		var retorno = envia_formulario(caminhoSalvar, dados, caminhoRetorno, msg);
		if (retorno!="")
		{
			return retorno;
		}
	}
	else if(tipo=='submit')
	{
		var form_name = obj.name;
		document.forms[form_name].submit();
	}
	return false;
}

function salvar_formulario(obj, caminho_salvar, caminho_retorno, msg)
{
	if (!valida_campos(obj))
	{
		return false;
	}

	var myform = $("#"+obj.id);
	var disabled = myform.find(':input:disabled').removeAttr('disabled');		

	dados = $("#"+obj.id).serialize();

	disabled.attr('disabled','disabled');
	
	enviar_formulario(caminho_salvar, dados, caminho_retorno, msg);
	return false;
}

function enviar_formulario(caminho_salvar, dados, caminho_retorno, msg)
{
    var retorno = "", confere=0, erro="";

    $.ajax({ 
            type:"POST"
            , cache:false
            , async:false
            , datatype:"html"
            , data:dados
            , global:false
            , url:caminho_salvar
            , success:function(data) { 
                        confere = 1;
                        retorno = data;
                      }
             ,error: function(XMLHttpRequest) {
                         erro = XMLHttpRequest.responseText;
                      }
    });

    if (confere==1)
    {
		if (parseInt(msg,10)==0)
        {
        	alert("Salvo com Sucesso!");
        }
        else if (parseInt(msg)==1)
        {
        	alert(retorno);
        }

        if (caminho_retorno!="")
        {
	        var js = caminho_retorno.indexOf("javascript");
	        if (parseInt(js,10)>-1)
	        {
	            var total_string = caminho_retorno.length;
	            executa_js = caminho_retorno.substr(js, total_string-js);
	            eval(executa_js);
	        }
	        else
	        {
	            location.href = caminho_retorno;
	        }
        }
    }   
    else if (confere==0 && erro!="")
    {
        alert("Houve erro ao Salvar!\n------------------------------------\n: "+erro);
    }
}

/* Valida CNPJ */
function validarcnpj(cnpj)
{
	cnpj = cnpj.replace('.','');
	cnpj = cnpj.replace('.','');
	cnpj = cnpj.replace('.','');
	cnpj = cnpj.replace('-','');
	cnpj = cnpj.replace('/','');
	var numeros, digitos, soma = 0, i, resultado, pos, tamanho, digitos_iguais=1;
	if (cnpj.length!=14)
	{
		return false;
	}
	for(i=0;i<cnpj.length-1;i++)
	{
		if (cnpj.charAt(i)!=cnpj.charAt(i+1))
		{
			digitos_iguais = 0;
			break;
		}
	}
	if (!digitos_iguais)
	{
		tamanho = cnpj.length-2;
		numeros = cnpj.substring(0,tamanho);
		digitos = cnpj.substring(tamanho);
		pos = tamanho-7;
		for(i=tamanho;i>=1;i--)
		{
			soma += numeros.charAt(tamanho-i)*pos--;
			if(pos<2)
			{
				pos = 9;
			}
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado!=digitos.charAt(0))
		{
			return false;
		}
		tamanho = tamanho+1;
		numeros = cnpj.substring(0,tamanho);
		soma = 0;
		pos = tamanho-7;
		for(i=tamanho;i>=1;i--)
		{
			soma += numeros.charAt(tamanho-i)*pos--;
			if(pos<2)
			{
				pos = 9;
			}
		}
		resultado = soma%11<2?0:11-soma%11;
		if (resultado!=digitos.charAt(1))
		{
			return false;
		}
		return true;
	}
	return false;
}

/* Valida CPF */
function validar_cpf(cpf)
{
	cpf = cpf.replace('.','');
	cpf = cpf.replace('.','');
	cpf = cpf.replace('-','');
	var numeros, digitos, soma = 0, i, resultado, digitos_iguais = 1;
	if (cpf.length!=11)
	{
		return false;
	}
	for (i=0;i<cpf.length-1;i++)
	{
		if (cpf.charAt(i)!=cpf.charAt(i + 1))
		{
			digitos_iguais = 0;
			break;
		}
	}
	if (!digitos_iguais)
	{
		numeros = cpf.substring(0,9);
		digitos = cpf.substring(9);
		for (i=10;i>1;i--)
		{
			soma += numeros.charAt(10-i)*i;
		}
		resultado = soma%11<2?0:11-soma%11;
		if (resultado!=digitos.charAt(0))
		{
			return false;
		}
		numeros = cpf.substring(0,10);
		soma = 0;
		for (i=11;i>1;i--)
		{
			soma += numeros.charAt(11-i)*i;
		}
		resultado = soma%11<2?0:11-soma%11;
		if (resultado != digitos.charAt(1))
		{
			return false;
		}
		return true;
	}
	return false;
}

String.prototype.replaceAll = function(token, newtoken)
{
	if (this=="")
	{
		return 0;
	}

	var str = this;
	if(str.search(token)!=-1){
		while (str.indexOf(token) != -1)
		{
	 		str = str.replace(token, newtoken);
		}
	}
	return str;
}

/****************************************************************
*	Formata valor para salvar no banco de dados
*
*	@parametros: tipo	1 - transforma de 1.000,00 p/ 1000.00
*				 
****************************************************************/
String.prototype.formatar_moeda = function(tipo)
{
	if (this=="")
	{
		return 0;
	}

	if (tipo==1)
	{
		var valor = this.replaceAll(".","");
		return valor.replace(",",".");
	}
	else if (tipo==2)
	{
		var valor = this;

		if (valor.indexOf(".")==-1)
		{
			return valor+",00";
		}
		else if (valor.indexOf(".")!=-1)
		{
			var vsplit = valor.split(".");
			var valor1 = vsplit[0];
			var valor2 = vsplit[1];
			var valor2_tam = vsplit[1].length;

			if (valor2_tam==0)
			{
				return valor1+","+"00";
			}
			else if (valor2_tam==1)
			{
				return valor1+","+valor2+"0";
			}
			else
			{
				return valor1+","+valor2.substr(0,2);
			}
		}
	}
}

function number_format(number, decimals, dec_point, thousands_sep)
{
    // %     nota 1: Para 1000.55 retorna com precisão 1 no FF/Opera é 1,000.5, mas no IE é 1,000.6
    // *     exemplo 1: number_format(1234.56);
    // *     retorno 1: '1,235'
    // *     exemplo 2: number_format(1234.56, 2, ',', ' ');
    // *     retorno 2: '1 234,56'
    // *     exemplo 3: number_format(1234.5678, 2, '.', '');
    // *     retorno 3: '1234.57'
    // *     exemplo 4: number_format(67, 2, ',', '.');
    // *     retorno 4: '67,00'
    // *     exemplo 5: number_format(1000);
    // *     retorno 5: '1,000'
    // *     exemplo 6: number_format(67.311, 2);
    // *     retorno 6: '67.31'
 
    var n = number, prec = decimals;
    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = (typeof thousands_sep == "undefined") ? ',' : thousands_sep;
    var dec = (typeof dec_point == "undefined") ? '.' : dec_point;
 
    var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;
 
    var abs = Math.abs(n).toFixed(prec);
    var _, i;
 
    if (abs >= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;
 
        _[0] = s.slice(0,i + (n < 0)) +
              _[0].slice(i).replace(/(\d{3})/g, sep+'$1');
 
        s = _.join(dec);
    } else {
        s = s.replace('.', dec);
    }
 
    return s;
}
function NumReal(field,milSep,decSep,dec) { 
	var numCaract = 0;
	var newNum = '';
	var jn = /[^[0-9]]*/gi;
	var num = field.value.replace(jn,'').replace(/^0/,'');
	if(num.length <= dec)
		for(var cont = 0; num.length <= dec; cont++)
			num = '0' + num;
	for(cont = num.length - 1; cont >= 0; cont--) {
		newNum = num.substr(cont,1) + newNum;
		if(dec > 0 && numCaract == dec - 1)
			newNum = decSep + newNum;
		else if(((numCaract - dec) % 3 == 2) && (numCaract < num.length-1))
			newNum = milSep + newNum;
		numCaract++;
	}
	if(newNum.substr(0,1) == ',')
		newNum = '0' + newNum;
	field.value = newNum;
}

Date.isLeapYear = function (year) { 
	return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
}

Date.getDaysInMonth = function (year, month) {
	return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

Date.prototype.isLeapYear = function () { 
	var y = this.getFullYear(); 
	return (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0)); 
}

Date.prototype.getDaysInMonth = function () { 
	return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
}

Date.prototype.addMonths = function (value) {
	var n = this.getDate();
	this.setDate(1);
	this.setMonth(this.getMonth() + value);
	this.setDate(Math.min(n, this.getDaysInMonth()));

	var curr_date = this.getDate();
	var curr_month = this.getMonth()+1;
	var curr_year = this.getFullYear();

	curr_date = curr_date<10?"0"+curr_date:curr_date;
	curr_month = curr_month<10?"0"+curr_month:curr_month;

	return curr_date+"/"+curr_month+"/"+curr_year;
}

	var DF = {

		inDays: function(d1, d2) {
			var t2 = d2.getTime();
			var t1 = d1.getTime();

			//return parseInt((t2-t1)/(24*3600*1000));
			return Math.round((t2-t1)/(24*3600*1000)); // POR RAMIRES OLIVEIRA 03/09/2013
		},

		inWeeks: function(d1, d2) {
			var t2 = d2.getTime();
			var t1 = d1.getTime();

			//return parseInt((t2-t1)/(24*3600*1000*7));
			return Math.round((t2-t1)/(24*3600*1000*7));
		},

		inMonths: function(d1, d2) {
			var d1Y = d1.getFullYear();
			var d2Y = d2.getFullYear();
			var d1M = d1.getMonth();
			var d2M = d2.getMonth();

			return (d2M+12*d2Y)-(d1M+12*d1Y);
		},

		inYears: function(d1, d2) {
			return d2.getFullYear()-d1.getFullYear();
		}
	}
	function DateDiff(data,op){
		var dt  = data.split("/");
		var d = new Date();
		d.setFullYear(dt[2],dt[1]-1,dt[0]);
		
		var d1 = new Date(d);
		var d2 = new Date();
		if (op==1)
		{
			return DF.inDays(d1, d2);
		}
		if (op==2)
		{
			return DF.inWeeks(d1, d2);
		}
		if (op==3)
		{
			return DF.inMonths(d1, d2);
		}
		if (op==4)
		{
			return DF.inMonths(d1, d2);
		}
	}
$(function(){
	/* masked input - Campo Data*/
	if($('input.campo_data').length > 0)
	{
		$("input.campo_data").mask("99/99/9999");
	}

	/* masked input - Campo Data*/
	if($('input.campoData').length > 0)
	{
		$("input.campoData").mask("99/99/9999");
	}

	/* datepicker - Campo Data*/
	if($('input.campo_data').length > 0)
	{
		$("input.campo_data").datepicker(
		{
			buttonImage: "../../assets/img/calendario.png"
		});
	}

	/* masked input - Campo CNPJ*/
	if($('input.campo_cnpj').length > 0){
		$("input.campo_cnpj").mask("99.999.999/9999-99");
	}

	/* masked input - Campo CPF*/
	if($('input.campo_cpf').length > 0){
		$("input.campo_cpf").mask("999.999.999-99");
	}

	/* masked input - Campo Unidade*/
	if($('input.campo_unidade').length > 0){
		$("input.campo_unidade").mask("99.99-999");
	}

	/* masked input - Campo Plano*/
	if($('input.campo_plano').length > 0){
		$("input.campo_plano").mask("99-999");
	}

	if ($(".gabox2").length > 0)
	{
		$("a.gabox2").gabox2();
	}

	if($('.campo_valor').length > 0)
	{
		$(".campo_valor").keydown(function(){NumReal(this,'.',',',2);});
	}

	if($('.campo_moeda').length > 0)
	{
		$(".campo_moeda").maskMoney({thousands:'.', decimal:',', allowNegative:true});
	}	
});

function valida_horas(tempo)
{
	horario = tempo.value.split(":");
	var horas = horario[0];
	var minutos = horario[1];
	var segundos = horario[2];
	if(horas > 23){ 
		alert("Hora inv\u00e1lida");
		tempo.value = "";
		return false;
	}
	if(minutos > 59){
		alert("Hora inv\u00e1lida");
		tempo.value = "";
		return false;
	}
	if(segundos > 59){
		alert("Hora inv\u00e1lida");
		tempo.value = "";
		return false;
	}
}

function criaModal (view, parametros) {
	$.post("modal", {body: view, parametros: parametros}, function(data) {
		$("body").append(data);
		$("#modal-lanches").modal('show');
	});
}

