<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('link_js')) {
	function link_js($js = "")
	{
		$CI = &get_instance();
		$base_principal = $CI->config->slash_item('base_url');

		if ($js != '') {
			return "<script src='" . $base_principal . "{$js}' language='javascript' type='text/javascript'></script>";
		}
		return "";
	}
}

function anchor_pesquisar($link = "", $titulo = "", $data = "", $opcoes = array())
{
	$campos = "";
	$opcoes += array('class' => 'gabox', 'title' => $titulo);
	if ($data != "") {
		foreach ($data as $key => $val) {
			if ($campos == "") {
				$campos = "?";
			} else {
				$campos .= "&";
			}
			$campos .= $key . "=" . $val;
		}
	}
	return anchor($link . $campos, "<button class='btn' type='button'><i class='icon-search'></i></button>", $opcoes);
}

function anchor_botao_adicionar($link = "", $descricao = "", $outros = array(), $add_class = "")
{
	$class = array_merge(array("class" => "btn btn-success {$add_class}"), $outros);
	return anchor($link, "<i class='icon-plus-sign'></i> {$descricao}", $class);
}

function anchor_botao_cancelar($link = "", $descricao = "", $outros = array(), $add_class = "")
{
	$class = array_merge(array("class" => "btn btn-danger {$add_class}"), $outros);
	return anchor($link, "<i class='icon-remove-sign'></i> {$descricao}", $class);
}

function anchor_botao($cor = "", $icone = "", $link = "", $descricao = "", $outros = array(), $add_class = "")
{
	switch ($cor) {
		case "vermelho":
			$cor = "btn-danger";
			break;

		case "verde":
			$cor = "btn-success";
			break;

		case "amarelo":
			$cor = "btn-warning";
			break;

		case "preto":
			$cor = "btn-inverse";
			break;

		case "transparente":
			$cor = "btn btn-small botao_transparente";
			break;

		default:
			$cor = "btn-primary";
	}

	if ($icone != "") {
		$icone = "<i class='{$icone}'></i> ";
	}

	if ($link == "js") {
		$link = "javascript:void(0)";
	} else {
		$link = base_url() . index_page() . "/" . $link;
	}

	$class = array_merge(array("class" => "btn {$cor} {$add_class}"), $outros);
	$atributos = "";
	foreach ($class as $key => $val) {
		$atributos .= " {$key}=\"{$val}\"";
	}
	return "<a href='{$link}' {$atributos}>{$icone}{$descricao}</a>";
}

function anchor_img($uri = '', $anchor_attributes = '', $img_src = '', $img_attributes = '', $nome = NULL)
{
	if ($uri == 'js') {
		$site_url = 'javascript:void(0);';
	} else if (!is_array($uri)) {
		$site_url = base_url() . index_page() . "/" . $uri;
	}

	if ($anchor_attributes != '') {
		$anchor_attributes = _parse_attributes($anchor_attributes);
	}

	if (strpos($img_src, '://') === FALSE) {
		$CI = &get_instance();
		$base_principal = $CI->config->slash_item('base_url');
		$img_src = $base_principal . $img_src;
	}

	if ($img_attributes != '') {
		$img_attributes = _parse_attributes($img_attributes);
	}

	if (!empty($nome)) {
		$nome = " {$nome}";
	}

	return "<a href='{$site_url}' {$anchor_attributes}><img src='{$img_src}' {$img_attributes} />{$nome}</a>";
}

function anchor_popup_img($uri = "", $img_src = "", $nome = "", $width = 800, $height = 600, $scroll = 'yes', $status = 'yes', $resize = 'yes', $screenx = 0, $screeny = 0, $class = "btn-inverse ")
{
	$popup_attributes = array(
		'width'      => $width,
		'height'     => $height,
		'scrollbars' => $scroll,
		'status'     => $status,
		'resizable'  => $resize,
		'screenx'    => $screenx,
		'screeny'    => $screeny
	);

	$popup_attributes_html = "";
	$virgula = "";

	foreach ($popup_attributes as $key => $val) {
		$popup_attributes_html = $virgula . $key . "=" . $val;
		$virgula = ",";
	}

	if ($nome != "") {
		$nome = " {$nome}";
	}

	if ($img_src != "") {
		$img_src = "<i class='{$img_src}'></i>";
	}

	$onclick = "window.open('" . base_url() . index_page() . "/{$uri}', '_blank', '{$popup_attributes_html}');";

	return "<button type='button' class=\"btn {$class} \" onclick=\"{$onclick}\">{$img_src}{$nome}</button>";
}

function alerta_aviso($texto = "")
{
	return "<div class='row-fluid'>
            <div class='span12'>
            <div class='alert alert-error' style='margin-bottom: 0;'>
            {$texto}
            </div>
            </div>
            </div>";
}

/**
 * @author Ramires Oliveira
 * Função extraída da versão 2.0.
 * FAVOR JAMAIS ALTERAR ANTES DE CONSULTAR OS ANALISTAS!
 */
if (!function_exists('_parse_attributes')) {
	function _parse_attributes($attributes, $javascript = FALSE)
	{
		if (is_string($attributes)) {
			return ($attributes != '') ? ' ' . $attributes : '';
		}

		$att = '';
		foreach ($attributes as $key => $val) {
			if ($javascript == TRUE) {
				$att .= $key . '=' . $val . ',';
			} else {
				$att .= ' ' . $key . '="' . $val . '"';
			}
		}

		if ($javascript == TRUE and $att != '') {
			$att = substr($att, 0, -1);
		}

		return $att;
	}
}

//define uma mensagem para ser exibida na próxima tela carregada
function set_msg($id = 'msgerro', $msg = NULL, $tipo = 'erro')
{
	$CI = &get_instance();
	switch ($tipo) {
		case 'erro':
			$CI->session->set_flashdata($id, '<div class="alert-box alert"><p>' . $msg . '</p></div>');
			break;
		case 'sucesso':
			$CI->session->set_flashdata($id, '<div class="alert-box sucess"><p>' . $msg . '</p></div>');
			break;
		default:
			$CI->session->set_flashdata($id, '<div class="alert-box"><p>' . $msg . '</p></div>');
			break;
	}
}

//verifica se existe uma msg pra ser exibida na tela atual
function get_msg($id, $printar = TRUE)
{
	$CI = &get_instance();
	if ($CI->session->flashdata($id)) {
		if ($printar) {
			echo $CI->session->flashdata($id);
		} else {
			return $CI->session->flashdata($id);
		}
	}
	return FALSE;
}

/**
 * Converte Objeto em Array
 * @param  stdClass $d Objeto da a ser convertido
 * @return array
 */
function objectToArray($d)
{
	if (is_object($d)) {
		$d = get_object_vars($d);
	}

	if (is_array($d)) {
		/*
        * Return array converted to object
        * Using __FUNCTION__ (Magic constant)
        * for recursive call
        */
		return array_map(__FUNCTION__, $d);
	} else {
		return $d; // Return array
	}
}

/*
function satc_botao_popup($nome_botao = "", $tipo_botao = "", $content = "", $onclick = "", $width = "600", $height="400", $outros = "", $classes = "")
{
    $attributes = array(
        'name'=>$nome_botao,
        'id'=>$nome_botao,
        'type'=>$tipo_botao,
        'content'=>$content,
        'class'=>"btn btn-default btn-sm {$classes}");

    if ($onclick!="")
    {
        $attributes = array_merge($attributes, array("onclick"=>" window.open('".site_url($onclick)."', '{$nome_botao}', 'width={$width}, height={$height}, scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');"));
    }

    if ($outros!="")
    {
        $attributes = array_merge($attributes, $outros);
    }

    echo form_button($attributes);
}
*/
function anchor_popover($obj_anchor = '', $obj_popover = '', $atributos = '', $direcao = 'top', $tag = 'a')
{
	$retorno = '';
	$atributos_html = '';

	if (is_array($atributos) > 0) {
		foreach ($atributos as $key => $val) {
			$atributos_html = $key . '=' . $val;
		}
	}


	$retorno =  "<{$tag} class='cursor_pointer'
                         data-toggle='popover'
                         data-trigger='hover'
                         data-container='body'
                         data-html='true'
                         data-placement='{$direcao}'
                         data-content='{$obj_popover}'
                         {$atributos_html}>
                         {$obj_anchor}
                 </{$tag}>";

	return $retorno;
}

function tabela_popover($cabecalho = '', $corpo = '', $titulo = '')
{
	$retorno = '';
	$limite = count($cabecalho);

	$retorno .= $titulo;
	$retorno .= '<table class="table table-condensed table-bordered"><thead><tr>';
	foreach ($cabecalho as $celula) {
		$retorno .= '<th>' . $celula . '</th>';
	}
	$retorno .= '</tr></thead>';
	foreach ($corpo as $key => $linha) {
		$cont = 1;
		$retorno .= '<tbody><tr>';
		foreach ($linha as $coluna => $value) {
			$retorno .= '<td align="center">' . $value . '</td>';
			if ($limite == $cont++) {
				break;
			}
		}
		$retorno .= '</tr></tbody>';
	}
	$retorno .= '</table>';

	return $retorno;
}

function getAcessoItem($descricao, $i_usuario)
{
	$CI = &get_instance();
	$CI->load->model('Portal_itens_acesso_model');
	return $CI->Portal_itens_acesso_model->isAccess($descricao, $i_usuario);
}

function valor_por_extenso($valor = 0, $dinheiro = 0)
{
	if ($dinheiro == 1) {
		$real = "real";
		$reais = "reais";
	} else {
		$real = "";
		$reais = "";
	}
	$singular = array("centavo", "$real", "mil", "milhão", "bilhão", "trilhão", "quatrilhão");
	$plural = array("centavos", "$reais", "mil", "milhões", "bilhões", "trilhões", "quatrilhões");

	$c = array("", "cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos");
	$d = array("", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa");
	$d10 = array("dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezesete", "dezoito", "dezenove");
	$u = array("", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove");

	$z = 0;
	$rt = null;

	$valor = number_format($valor, 2, ".", ".");
	$inteiro = explode(".", $valor);
	for ($i = 0; $i < count($inteiro); $i++)
		for ($ii = strlen($inteiro[$i]); $ii < 3; $ii++)
			$inteiro[$i] = "0" . $inteiro[$i];

	// $fim identifica onde que deve se dar junção de centenas por "e" ou por "," ;)
	$fim = count($inteiro) - ($inteiro[count($inteiro) - 1] > 0 ? 1 : 2);
	for ($i = 0; $i < count($inteiro); $i++) {
		$valor = $inteiro[$i];
		$rc = (($valor > 100) && ($valor < 200)) ? "cento" : $c[$valor[0]];
		$rd = ($valor[1] < 2) ? "" : $d[$valor[1]];
		$ru = ($valor > 0) ? (($valor[1] == 1) ? $d10[$valor[2]] : $u[$valor[2]]) : "";

		$r = $rc . (($rc && ($rd || $ru)) ? " e " : "") . $rd . (($rd && $ru) ? " e " : "") . $ru;
		$t = count($inteiro) - 1 - $i;
		$r .= $r ? " " . ($valor > 1 ? $plural[$t] : $singular[$t]) : "";
		if ($valor == "000") $z++;
		elseif ($z > 0) $z--;
		if (($t == 1) && ($z > 0) && ($inteiro[0] > 0)) $r .= (($z > 1) ? " de " : "") . $plural[$t];
		if ($r) $rt = $rt . ((($i > 0) && ($i <= $fim) && ($inteiro[0] > 0) && ($z < 1)) ? (($i < $fim) ? ", " : " e ") : " ") . $r;
	}

	return trim($rt ? $rt : "zero");
}

function consultaCBO($termo)
{
	// Caminho para o arquivo CSV
	$csvFilePath = FCPATH . 'arquivos/CBO2002 - Ocupacao.csv';

	$matchingCBOResults = [];

	// Abre o arquivo CSV para leitura
	if (($handle = fopen($csvFilePath, "r")) !== FALSE) {
		// Itera sobre as linhas do arquivo e encontra os CBOs correspondentes
		while (($row = fgetcsv($handle, 1000, ";")) !== FALSE) {
			$codigo = $row[0];
			$titulo = $row[1];
			if (strpos($codigo, $termo) === 0 || strpos(iconv('ISO-8859-1', 'UTF-8', $titulo), $termo) !== false) {
				$matchingCBOResults[] = ['codigo' => $codigo, 'titulo' => iconv('ISO-8859-1', 'UTF-8', $titulo)];
			}
		}
		fclose($handle);
	}

	return $matchingCBOResults;
}

if (!function_exists('link_ng')) {
	function link_ng($js = "")
	{
		$CI = &get_instance();
		$base_principal = $CI->config->slash_item('base_url');
		$version = hash("haval160,4", (date('YmdHis')));

		if ($js != '') {
			return "<script src='" . $base_principal . "app/views/{$js}?v={$version}' language='javascript' type='text/javascript'></script>";
		}
		return "";
	}
}

/* End of file satc_helper.php */
/* Location: ./app/helpers/satc_helper.php */
