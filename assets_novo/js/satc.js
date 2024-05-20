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

function removerAcentos( newStringComAcento ) {
  var string = newStringComAcento;
	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		e : /[\xE8-\xEB]/g,
		i : /[\xEC-\xEF]/g,
		o : /[\xF2-\xF6]/g,
		u : /[\xF9-\xFC]/g,
		c : /\xE7/g,
		n : /\xF1/g
	};

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}
	return string;
}

function alert_satc(str){

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
function NumReal(field,milSep,decSep,dec)
{
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

function valida_campos(obj)
{
	var val = 0;

	$("#"+obj.id).find('*').each(function()
	{
		if (this.id)
		{
			if ($("#"+this.id).attr('valida')=="true" || parseInt($("#"+this.id).attr('valida'),10)==1)
			{
				if (this.type=="radio")
				{
					if(!valida_radio(obj.id, this.attributes["name"].value))
					{
						val = 1;
					}
				}
				else
				{
					$("#"+this.id).removeClass("valida_campos_negativo").addClass("valida_campos_positivo");

					if ($.trim($("#"+this.id).val())=="")
					{
						val = 1;
						$("#"+this.id).removeClass("valida_campos_positivo").addClass("valida_campos_negativo");
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

function salvar_formulario(obj, caminho_salvar, caminho_retorno, msg)
{
	if (!valida_campos(obj))
	{
		return false;
	}

	var myform = $("#"+obj.id);
	var disabled = myform.find(':input:disabled').removeAttr('disabled');
	/*inicio ckeditor*/
	if (typeof CKEDITOR!='undefined')
	{

		for (instance in CKEDITOR.instances)
		{
			//if ($("#"+obj.id+" #"+instance)[0])
			if ($("#"+instance)[0])
			{
				//$("#"+obj.id+" #"+instance).val($.base64.encode(CKEDITOR.instances[instance].getData()));
				//console.log(CKEDITOR.instances[instance].getData());
				var txt = removeCharEspecial(CKEDITOR.instances[instance].getData());
				//var txt = CKEDITOR.instances[instance].getData();
				$("#"+instance).val($.base64.encode(txt));

			}
		}
		/*$('textarea').trigger('keyup');*/
	}
	/*fim ckeditor*/

	dados = $("#"+obj.id).serialize();

	disabled.attr('disabled','disabled');
    $('.btn-save').prop('disabled', true);
    setTimeout(function() {
        enviar_formulario(caminho_salvar, dados, caminho_retorno, msg)
    }, 30);
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
        else if (parseInt(msg,10)==1)
        {
        	if ($.trim(retorno)!="")
        	{
        		alert(charset_js(retorno));
        	}
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

String.prototype.replaceAll = function(token, newtoken)
{
	if (this=="")
	{
		return 0;
	}

	var str = this;
	while (str.indexOf(token) != -1)
	{
 		str = str.replace(token, newtoken);
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


function left(str, n)
{
	if (n <= 0)
	{
	    return "";
	}
	else if (n > String(str).length)
	{
	    return str;
	}
	else
	{
	    return String(str).substring(0,n);
	}
}

function right(str, n)
{
    if (n <= 0)
    {
       return "";
    }
    else if (n > String(str).length)
    {
       return str;
    }
    else
    {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function number_format(number, decimals, dec_point, thousands_sep)
{
	var n = number, prec = decimals;
    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = (typeof thousands_sep == "undefined") ? ',' : thousands_sep;
    var dec = (typeof dec_point == "undefined") ? '.' : dec_point;
    var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec);
    var abs = Math.abs(n).toFixed(prec);
    var _, i;
    if (abs >= 1000)
    {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;
        _[0] = s.slice(0,i + (n < 0)) +
 		_[0].slice(i).replace(/(\d{3})/g, sep+'$1');
        s = _.join(dec);
    }
    else
    {
        s = s.replace('.', dec);
    }
    return s;
}

/**
* Comparar datas
*
* @return: 1 = iguais, 2 = data inicio menor, 3 data inicio maior
*/
function compararDatas(data_inicio, data_fim)
{
    dt1 = data_inicio.split("/");
    dt2 = data_fim.split("/");

    var data_1 = parseInt(dt1[2].toString()+dt1[1].toString()+dt1[0].toString());
    var data_2 = parseInt(dt2[2].toString()+dt2[1].toString()+dt2[0].toString());

    if (data_1==data_2) {
        return 1;
    } else if (data_1<data_2) {
        return 2;
    } else if (data_1>data_2) {
        return 3;
    }
}
$(function(){
    $('[data-toggle="popover"]').click(function(){
        $('[data-toggle="popover"]').popover('hide');
    });
});

function verificaDigito(obj)
{
    var valor = obj.value;
    if (valor.indexOf(',')==-1 && valor!='') {
        obj.value=valor+",00";
        return true;
    } else if (valor.indexOf(',')!=-1 && valor!='') {
        var vsplit = valor.split(',');
        var valor1 = vsplit[0];
        var valor2 = vsplit[1].length;
        if (valor2==0) {
            obj.value=valor+"00";
        }
        if (valor2==1) {
            obj.value=valor+"0";
        } else if (valor2>2) {
            obj.value=valor1+","+vsplit[1].substr(0,2);
        }
        return true;
    }
}

function soNums(e)
{
    keyCodesPermitidos = new Array(8,9,37,39,46);

    for(x=48;x<=57;x++){
        keyCodesPermitidos.push(x);
    }

    for(x=96;x<=105;x++){
        keyCodesPermitidos.push(x);
    }

    keyCode = e.which;

    if ($.inArray(keyCode,keyCodesPermitidos) != -1){
        return true;
    }
    return false;
}

//Remove character especial maior que 255 do texto
function removeCharEspecial(str) {
    var ch, str, i, result = '';


    for (i = 0; i < str.length - 1; i++) {

        ch = str.charCodeAt(i);

        if (ch <= 255) {
            result += str.charAt(i);
        }
    }

    return result;
}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
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

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var getQueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();