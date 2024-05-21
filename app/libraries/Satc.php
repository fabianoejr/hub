<?php if (!defined('BASEPATH')) exit('Não é permitido acesso direto ao Script (Satc)');

class Satc
{

	private $CI;

	public function __construct()
	{
		$this->CI = &get_instance();
	}

	public function get($campo = '')
	{
		return $this->CI->input->get($campo);
	}

	public function post($campo = '')
	{
		return $this->CI->input->post($campo);
	}

	public function decodificar($valor, $parametro = '')
	{
		if (trim($valor) != '') {
			if (empty($parametro)) {
				if ($this->get($valor) != '') {
					$retorno = $this->CI->encrypt->decode(base64_decode($this->get($valor)));

					if ($retorno == '' || empty($retorno)) {
						echo '1. Parametro Inválido';
						exit(1);
					}
					return $retorno;
				}
			} elseif ($parametro == '1') {
				$retorno = $this->CI->encrypt->decode(base64_decode($valor));
				if ($retorno == '' || empty($retorno)) {
					echo '2. Parametro Inválido';
					exit(1);
				}
				return $retorno;
			}
		}
		return '';
	}

	public function codificar($valor)
	{
		if (!empty($valor)) {
			return base64_encode($this->CI->encrypt->encode($valor));
		}
		return '';
	}

	public function formatar_moeda($valor = "", $tipo = "br")
	{
		if ($tipo == "br") {
			$valor = $valor == '' ? 0 : $valor;
			return number_format($valor, 2, ',', '.');
		}
		return $valor;
	}

	public function remover_moeda($valor)
	{
		return str_replace(",", ".", str_replace(".", "", $valor));
	}

	public function executa_cache($classe = '', $metodo = '', $sql = '', $data = '')
	{
		$nome_sessao = "{$classe}_{$metodo}";

		$nome = implode(",", $data);

		$retorno = array();

		if ($this->CI->session->userdata($nome_sessao) == "") {
			$query = $this->CI->db->query($sql);
			if ($query->num_rows() > 0) {
				$retorno = $query->row_array();
				$sessao  = array($nome_sessao => array($nome => $retorno));
				$this->CI->session->set_userdata($sessao);
			}
		} else {
			$sessao = $this->CI->session->userdata($nome_sessao);

			if (array_key_exists($nome, $sessao)) {
				$retorno = $sessao[$nome];
			} else {
				$query = $this->CI->db->query($sql);
				$retorno = $query->row_array();

				$novo1 = array($nome => $retorno);
				$novo2 = $novo1 + $sessao;

				$t3 = array($nome_sessao => $novo2);
				$this->CI->session->set_userdata($t3);
			}
		}
		return $retorno;
	}

	public function executa_cache_result($classe = '', $metodo = '', $sql = '', $data = '')
	{
		$nome_sessao = "{$classe}_{$metodo}";

		$nome = implode(",", $data);

		$retorno = array();

		if ($this->CI->session->userdata($nome_sessao) == "") {
			$query = $this->CI->db->query($sql);
			if ($query->num_rows() > 0) {
				$retorno = $query->result_array();
				$sessao  = array($nome_sessao => array($nome => $retorno));
				$this->CI->session->set_userdata($sessao);
			}
		} else {
			$sessao = $this->CI->session->userdata($nome_sessao);

			if (array_key_exists($nome, $sessao)) {
				$retorno = $sessao[$nome];
			} else {
				$query = $this->CI->db->query($sql);
				$retorno = $query->result_array();

				$novo1 = array($nome => $retorno);
				$novo2 = $novo1 + $sessao;

				$t3 = array($nome_sessao => $novo2);
				$this->CI->session->set_userdata($t3);
			}
		}
		return $retorno;
	}

	/**
	 * @author Ramires Oliveira
	 * tipo 1 - aaaa-mm-dd -> dd/mm/aaaa
	 * tipo 2 - dd/mm/aaaa -> aaaa-mm-dd
	 * tipo 3 - dd/mm/aaaa hh:mm:ss -> aaaa-mm-dd hh:mm:ss
	 * tipo 4 - aaaa-mm-dd hh:mm:ss -> dd/mm/aaaa hh:mm:ss
	 * tipo 5 - dd/mm/aaaa -> aaaamm
	 * tipo 6 - dd/mm/aaaa -> mm/dd/aaaa
	 * tipo 7 - dd/mm/aaaa hh:mm:ss -> dd/mm/aaaa hh:mm:ss
	 * tipo 8 - aaaa-mm-dd hh:mm:ss -> hh:mm
	 * tipo 9 - aaaa-mm-dd hh:mm -> aaaamm
	 * tipo 10 - aaaa-mm-dd hh:mm -> aaaa-mm-dd
	 * mostra_hora - 1 sim 0 nao
	 */
	public function formata_data($data, $tipo, $mostra_hora = 0)
	{
		if (!empty($data)) {
			if ($tipo == 1) {
				$p_dt = explode('-', $data);
				return $p_dt[2] . '/' . $p_dt[1] . '/' . $p_dt[0];
			} elseif ($tipo == 2) {
				$p_dt = explode('/', $data);
				$new_data = $p_dt[2] . '-' . $p_dt[1] . '-' . $p_dt[0];
				if ($mostra_hora) {
					$hr = '00:00';
					$new_data .= ' ' . $hr;
				}
				return $new_data;
			} elseif ($tipo == 3) {
				$dt = explode(' ', $data);
				$data = $dt[0];
				$p_dt = explode('/', $data);
				$new_data = $p_dt[2] . '-' . $p_dt[1] . '-' . $p_dt[0];
				if ($mostra_hora) {
					$hr = $dt[1];
					$new_data .= ' ' . $hr;
				}
				return $new_data;
			} elseif ($tipo == 4) {
				$dt = explode(' ', $data);
				$data = $dt[0];
				$p_dt = explode('-', $data);
				$new_data = $p_dt[2] . '/' . $p_dt[1] . '/' . $p_dt[0];
				if ($mostra_hora) {
					$hr = $dt[1];
					$new_data .= ' ' . $hr;
				}
				return $new_data;
			} elseif ($tipo == 5) {
				$p_dt = explode('/', $data);
				return $p_dt[2] . $p_dt[1];
			} elseif ($tipo == 6) {
				$p_dt = explode('/', $data);
				return $p_dt[1] . '/' . $p_dt[0] . '/' . $p_dt[2];
			} elseif ($tipo == 7) {
				$dt = explode(' ', $data);
				$data = $dt[0];
				$p_dt = explode('-', $data);
				$hr = explode('.', $dt[1]);
				$new_data = $p_dt[2] . '/' . $p_dt[1] . '/' . $p_dt[0] . ' ' . $hr[0];
				return $new_data;
			} elseif ($tipo == 8) {
				$dt = explode(' ', $data);
				$data = $dt[0];
				$p_dt = explode('-', $data);
				$hr = explode(':', $dt[1]);
				$new_data = $hr[0] . ':' . $hr[1];
				return $new_data;
			} elseif ($tipo == 9) {
				$dt = explode(' ', $data);
				$data = $dt[0];
				$p_dt = explode('-', $data);
				$new_data = $p_dt[0] . '' . $p_dt[1];
				return $new_data;
			} elseif ($tipo == 10) {
				$dt = explode(' ', $data);
				$new_data = $dt[0];
				return $new_data;
			} elseif ($tipo == 11) {
				$p_dt = explode('-', $data);
				return $p_dt[0] . '/' . $p_dt[1] . '/' . $p_dt[2];
			}
		}
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function data_atual()
	{
		date_default_timezone_set('America/Sao_Paulo');
		$padrao = $this->CI->config->item('log_date_format');
		return date($padrao);
	}

	/**
	 * @author	Mateus Gamba
	 */
	function formata_cnpj_cpf($valor = "", $opcao = 1)
	{
		if ($valor != "") {
			if ($opcao == 1) /*Formata*/ {
				$output = preg_replace("[' '-./ t]", '', $valor);
				$size = (strlen($output) - 2);
				if ($size != 9 && $size != 12) {
					return false;
				}
				$mask = ($size == 9) ? '###.###.###-##' : '##.###.###/####-##';
				$index = -1;
				for ($i = 0; $i < strlen($mask); $i++) {
					if ($mask[$i] == '#') {
						$mask[$i] = $output[++$index];
					}
				}
				return $mask;
			} elseif ($opcao == 2) /*Limpa Formatacao*/ {
				return $this->limpa_caracteres_especiais($valor);
			}
		}
		return "";
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function limpa_caracteres_especiais($valor = "")
	{
		if ($valor != "") {
			return preg_replace("/[^0-9\s]/", "", $valor);
		}
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function somar_data($data = "", $dias = 0, $meses = 0, $anos = 0)
	{
		if ($data == "") {
			$data = date("d/m/Y");
		}
		$data_explode = explode("/", $data);
		$dia = $data_explode[0];
		$mes = $data_explode[1];
		$ano = $data_explode[2];

		if ($dia == $this->ultimo_dia_mes($data) && $dias == 0 && $meses > 0) {
			$dia = $this->ultimo_dia_mes("1/" . ($mes + $meses) . "/" . ($ano + $anos));
		}
		return date("d/m/Y", mktime(0, 0, 0, $mes + $meses, $dia + $dias, $ano + $anos));
	}

	/**
	 * @author	Mateus Gamba
	 */
	function ultimo_dia_mes($data = "")
	{
		if ($data == "") {
			$mes = date("m");
			$ano = date("Y");
		} else {
			$data_explode = explode("/", $data);
			$mes = $data_explode[1];
			$ano = $data_explode[2];
		}
		return date("t", mktime(0, 0, 0, $mes, '01', $ano));
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function enviar_email($para, $assunto, $texto, $cc = '', $cco = array())
	{
		$this->CI->load->library('My_phpmailer');
		$destino_nome = explode('@', $para);
		$destino_nome = $destino_nome[0];
		$this->CI->my_phpmailer->enviarEmail(
			$destino_nome,
			$para,
			$assunto,
			$texto,
			$this->CI->session->userdata('suporte'),
			'',
			$cc,
			$cco
		);
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function quebra_linha($texto = "")
	{
		if ($texto != "") {
			return nl2br($texto);
		}
		return $texto;
	}

	/**
	 * @author	Mateus Gamba
	 */
	/**
	 * @author	Mateus Gamba
	 */
	public function primeira_maiuscula($texto = '')
	{
		return ucfirst(mb_strtolower($texto, 'ISO-8859-1'));
	}
	/*
	public function primeira_maiuscula($s, $e = array('da', 'das', 'de', 'do', 'dos', 'e', 'ç'))
	{
	  	$s = str_replace("Ç", "ç", $s);
	  	$s = str_replace("Ã", "ã", $s);
		$s = str_replace("Á", "á", $s);
		$s = str_replace("É", "é", $s);
		$s = str_replace("Ê", "ê", $s);
		$s = str_replace("Í", "í", $s);
		$s = str_replace("Ó", "ó", $s);
		$s = str_replace("Õ", "õ", $s);
	    return join(' ',
	                array_map(
	                    create_function(
	                        '$s',
	                        'return (!in_array($s, ' . var_export($e, true) . ')) ? ucfirst($s) : $s;'
	                    ),
	                    explode(
	                        ' ',
	                        strtolower($s)
	                    )
	                )
	            );
	}
	*/
	/**
	 * @author	Mateus Gamba
	 */
	public function mes_extenso($mes)
	{
		switch ((int)$mes) {
			case 1:
				$mes_extenso = "Janeiro";
				break;
			case 2:
				$mes_extenso = "Fevereiro";
				break;
			case 3:
				$mes_extenso = "Mar&ccedil;o";
				break;
			case 4:
				$mes_extenso = "Abril";
				break;
			case 5:
				$mes_extenso = "Maio";
				break;
			case 6:
				$mes_extenso = "Junho";
				break;
			case 7:
				$mes_extenso = "Julho";
				break;
			case 8:
				$mes_extenso = "Agosto";
				break;
			case 9:
				$mes_extenso = "Setembro";
				break;
			case 10:
				$mes_extenso = "Outubro";
				break;
			case 11:
				$mes_extenso = "Novembro";
				break;
			case 12:
				$mes_extenso = "Dezembro";
				break;
		}
		return $mes_extenso;
	}

	public function mes_extenso_novo($mes)
	{
		switch ((int)$mes) {
			case 1:
				$mes_extenso = "Janeiro";
				break;
			case 2:
				$mes_extenso = "Fevereiro";
				break;
			case 3:
				$mes_extenso = "Março";
				break;
			case 4:
				$mes_extenso = "Abril";
				break;
			case 5:
				$mes_extenso = "Maio";
				break;
			case 6:
				$mes_extenso = "Junho";
				break;
			case 7:
				$mes_extenso = "Julho";
				break;
			case 8:
				$mes_extenso = "Agosto";
				break;
			case 9:
				$mes_extenso = "Setembro";
				break;
			case 10:
				$mes_extenso = "Outubro";
				break;
			case 11:
				$mes_extenso = "Novembro";
				break;
			case 12:
				$mes_extenso = "Dezembro";
				break;
		}
		return $mes_extenso;
	}

	public function dia_semana_extenso($dia)
	{
		switch ((int)$dia) {
			case 1:
				$dia_extenso = 'DOMINGO';
				break;
			case 2:
				$dia_extenso = 'SEGUNDA-FEIRA';
				break;
			case 3:
				$dia_extenso = 'TERÇA-FEIRA';
				break;
			case 4:
				$dia_extenso = 'QUARTA-FEIRA';
				break;
			case 5:
				$dia_extenso = 'QUINTA-FEIRA';
				break;
			case 6:
				$dia_extenso = 'SEXTA-FEIRA';
				break;
			case 7:
				$dia_extenso = 'SÁBADO';
				break;
		}
		return $dia_extenso;
	}

	public function dia_semana_abrev($dia)
	{
		switch ((int)$dia) {
			case 1:
				$dia_extenso = 'DOM';
				break;
			case 2:
				$dia_extenso = 'SEG';
				break;
			case 3:
				$dia_extenso = 'TER';
				break;
			case 4:
				$dia_extenso = 'QUA';
				break;
			case 5:
				$dia_extenso = 'QUI';
				break;
			case 6:
				$dia_extenso = 'SEX';
				break;
			case 7:
				$dia_extenso = 'SÁB';
				break;
		}
		return $dia_extenso;
	}

	/**
	 * @author	Mateus Gamba
	 *
	 *	Completa uma String com quantidade de caracteres que precisar
	 *
	 *	@parametros: tipo 	  -> 1 - Esquerda para Direita
	 *						  	 2 - Direita para Esquerda
	 *				 palavra  -> string que deseja preencher os caracteres
	 *				 caracter -> caracter que deseja incrementar
	 *				 qtde	  -> qtde de caracteres que deseja inserir
	 *
	 *	@retorno: Retorna palavra
	 **/
	public function completa_string($tipo = 0, $palavra = "", $caracter = "", $qtde = 0)
	{
		if ($tipo == 1) {
			for ($i = 0; $i < $qtde - strlen($palavra); $i++) {
				$palavra = $caracter . $palavra;
			}
		} elseif ($tipo == 2) {
			for ($i = 0; $i < $qtde - strlen($palavra); $i++) {
				$palavra = $palavra . $caracter;
			}
		}

		return $palavra;
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function json_encode_satc($data)
	{
		$novo = array();
		foreach ($data as $key => $val) {
			$novo += array($key => base64_encode(utf8_encode($val)));
		}
		return json_encode($novo);
	}

	/**
	 * @author Alexandre
	 */
	public function json_encode_satc_noutf($data)
	{
		$novo = array();
		foreach ($data as $key => $val) {
			$novo += array($key => base64_encode($val));
		}
		return json_encode($novo);
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function remover_var_querystring($url, $key)
	{
		$url = preg_replace('/(.*)(?|&)' . $key . '=[^&]+?(&)(.*)/i', '$1$2$4', $url . '&');
		$url = substr($url, 0, -1);
		return $url;
	}

	/**
	 * Função que converte caracteres ISO-8859-1 para UTF-8, mantendo os caracteres UTF-8 intactos.
	 * @param string $texto
	 * @return string
	 */
	public function sanitizar_utf8($texto)
	{
		$saida = '';

		$i = 0;
		$len = strlen($texto);
		while ($i < $len) {
			$char = $texto[$i++];
			$ord  = ord($char);

			// Primeiro byte 0xxxxxxx: simbolo ascii possui 1 byte
			if (($ord & 0x80) == 0x00) {

				// Se e' um caractere de controle
				if (($ord >= 0 && $ord <= 31) || $ord == 127) {

					// Incluir se for: tab, retorno de carro ou quebra de linha
					if ($ord == 9 || $ord == 10 || $ord == 13) {
						$saida .= $char;
					}

					// Simbolo ASCII
				} else {
					$saida .= $char;
				}

				// Primeiro byte 110xxxxx ou 1110xxxx ou 11110xxx: simbolo possui 2, 3 ou 4 bytes
			} else {

				// Determinar quantidade de bytes analisando os bits da esquerda para direita
				$bytes = 0;
				for ($b = 7; $b >= 0; $b--) {
					$bit = $ord & (1 << $b);
					if ($bit) {
						$bytes += 1;
					} else {
						break;
					}
				}

				switch ($bytes) {
					case 2: // 110xxxxx 10xxxxxx
					case 3: // 1110xxxx 10xxxxxx 10xxxxxx
					case 4: // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
						$valido = true;
						$saida_padrao = $char;
						$i_inicial = $i;
						for ($b = 1; $b < $bytes; $b++) {
							if (!isset($texto[$i])) {
								$valido = false;
								break;
							}
							$char_extra = $texto[$i++];
							$ord_extra  = ord($char_extra);

							if (($ord_extra & 0xC0) == 0x80) {
								$saida_padrao .= $char_extra;
							} else {
								$valido = false;
								break;
							}
						}
						if ($valido) {
							$saida .= $saida_padrao;
						} else {
							$saida .= ($ord < 0x7F || $ord > 0x9F) ? utf8_encode($char) : '';
							$i = $i_inicial;
						}
						break;
					case 1:  // 10xxxxxx: ISO-8859-1
					default: // 11111xxx: ISO-8859-1
						$saida .= ($ord < 0x7F || $ord > 0x9F) ? utf8_encode($char) : '';
						break;
				}
			}
		}
		return $saida;
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function right($texto = "", $qtde = 0)
	{
		return substr($texto, ($qtde * -1));
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function left($texto = "", $qtde = 0)
	{
		return substr($texto, 0, $qtde);
	}

	public function get_mascara_conta($mascara = '')
	{
		if ($mascara == '') {
			return '';
		} else {
			$total = strlen(trim($mascara));
			$i = 0;
			for ($j = 0; $j < $total; $j++) {
				if ($j == 0) {
					$masc = $mascara[$j] . '.';
				} else {
					if (++$i == 3) {
						$masc .= '.';
						$i = 1;
					}
					$masc .= $mascara[$j];
				}
			}
			return $masc;
		}
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function utf8_encode($valor = "")
	{
		return utf8_encode($valor);
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function utf8_decode($valor = "")
	{
		return utf8_decode($valor);
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function current_pagina_tabela($pagina = 0, $search = "", $id = "tabela_basica")
	{
		if ($pagina != "" || $search != "") {
			echo "<script type='text/javascript'>";
			echo "$(function() {";
			echo "var oTable = $('#{$id}').dataTable();";
			if ($search != "") {
				echo "oTable.fnFilter('" . $search . "');";
			}
			if ($pagina != "") {
				echo "oTable.fnPageChange(" . $pagina . ");";
			}
			echo "});";
			echo "</script>";
		}
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function controller_pagina_tabela()
	{
		$nr_pagina = $this->get("nr_pagina");
		$search = $this->get("search");

		$search_tabela = array("nr_pagina" => "{$nr_pagina}", "search" => "{$search}");

		$json_tabela = json_encode($search_tabela);
		return str_replace("\"", "'", $json_tabela);
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function get_objeto_json($valor = "")
	{
		return json_decode(str_replace("'", "\"", $valor));
	}

	/**
	 * @author	Mateus Gamba
	 */
	public function converter_caracteres_js($valor)
	{
		$a1 = array("á", "à", "â", "ã", "ä", "Á", "À", "Â", "Ã", "Ä", "é", "è", "ê", "ê", "É", "È", "Ê", "Ë", "í", "ì", "î", "ï", "Í", "Ì", "Î", "Ï", "ó", "ò", "ô", "õ", "ö", "Ó", "Ò", "Ô", "Õ", "Ö", "ú", "ù", "û", "ü", "Ú", "Ù", "Û", "ç", "Ç", "'", "\"");
		$a2 = array("\u00e1", "\u00e0", "\u00e2", "\u00e3", "\u00e4", "\u00c1", "\u00c0", "\u00c2", "\u00c3", "\u00c4", "\u00e9", "\u00e8", "\u00ea", "\u00ea", "\u00c9", "\u00c8", "\u00ca", "\u00cb", "\u00ed", "\u00ec", "\u00ee", "\u00ef", "\u00cd", "\u00cc", "\u00ce", "\u00cf", "\u00f3", "\u00f2", "\u00f4", "\u00f5", "\u00f6", "\u00d3", "\u00d2", "\u00d4", "\u00d5", "\u00d6", "\u00fa", "\u00f9", "\u00fb", "\u00fc", "\u00da", "\u00d9", "\u00db", "\u00e7", "\u00c7", "", "");
		return str_replace($a1, $a2, $valor);
	}

	public function get_dia_semana($num)
	{
		switch ((int)$num) {
			case 0:
				return "Domingo";
				break;
			case 1:
				return "Segunda-feira";
				break;
			case 2:
				return "Terça-feira";
				break;
			case 3:
				return "Quarta-feira";
				break;
			case 4:
				return "Quinta-feira";
				break;
			case 5:
				return "Sexta-feira";
				break;
			case 6:
				return "Sábado";
				break;
		}
	}

	/**
	 * @author Alexandre
	 * $codifica => TRUE : utf8_encode
	 * $codifica => FALSE :
	 */
	public function jsonEncodeSatc($result, $codifica = TRUE)
	{
		$json = array();
		if (COUNT($result) > 0) {
			foreach ($result as $key_inicial => $array_valores) {
				$json[$key_inicial] = array();
				foreach ($array_valores as $key => $val) {
					if ($codifica) {
						$json[$key_inicial] += array($key => base64_encode(utf8_encode($val)));
					} else {
						$json[$key_inicial] += array($key => utf8_encode($val));
					}
				}
			}
		}
		return json_encode($json);
	}

	public function ordenaTabela($campo)
	{

		$img1 = img(
			array(
				'src' => 'assets_novo/img/sort_both.png',
				'class' => 'hidden-print',
				'ng-if' => "ordenar != '{$campo}'"
			)
		);

		$img2 = img(
			array(
				'src' => 'assets_novo/img/sort_asc.png',
				'class' => 'hidden-print',
				'ng-if' => "!ordem && ordenar == '{$campo}'"
			)
		);

		$img3 = img(
			array(
				'src' => 'assets_novo/img/sort_desc.png',
				'class' => 'hidden-print',
				'ng-if' => "ordem && ordenar == '{$campo}'"
			)
		);
		$retorno = $img1 . $img2 . $img3;
		return $retorno;
	}

	public function remove_alfanumericos_especiais($str)
	{
		$utf8_lower_accents = array(
			'à' => 'a', 'ô' => 'o', 'ď' => 'd', 'ḟ' => 'f', 'ë' => 'e', 'š' => 's', 'ơ' => 'o',
			'ß' => 'ss', 'ă' => 'a', 'ř' => 'r', 'ț' => 't', 'ň' => 'n', 'ā' => 'a', 'ķ' => 'k',
			'ŝ' => 's', 'ỳ' => 'y', 'ņ' => 'n', 'ĺ' => 'l', 'ħ' => 'h', 'ṗ' => 'p', 'ó' => 'o',
			'ú' => 'u', 'ě' => 'e', 'é' => 'e', 'ç' => 'c', 'ẁ' => 'w', 'ċ' => 'c', 'õ' => 'o',
			'ṡ' => 's', 'ø' => 'o', 'ģ' => 'g', 'ŧ' => 't', 'ș' => 's', 'ė' => 'e', 'ĉ' => 'c',
			'ś' => 's', 'î' => 'i', 'ű' => 'u', 'ć' => 'c', 'ę' => 'e', 'ŵ' => 'w', 'ṫ' => 't',
			'ū' => 'u', 'č' => 'c', 'ö' => 'oe', 'è' => 'e', 'ŷ' => 'y', 'ą' => 'a', 'ł' => 'l',
			'ų' => 'u', 'ů' => 'u', 'ş' => 's', 'ğ' => 'g', 'ļ' => 'l', 'ƒ' => 'f', 'ž' => 'z',
			'ẃ' => 'w', 'ḃ' => 'b', 'å' => 'a', 'ì' => 'i', 'ï' => 'i', 'ḋ' => 'd', 'ť' => 't',
			'ŗ' => 'r', 'ä' => 'ae', 'í' => 'i', 'ŕ' => 'r', 'ê' => 'e', 'ü' => 'ue', 'ò' => 'o',
			'ē' => 'e', 'ñ' => 'n', 'ń' => 'n', 'ĥ' => 'h', 'ĝ' => 'g', 'đ' => 'd', 'ĵ' => 'j',
			'ÿ' => 'y', 'ũ' => 'u', 'ŭ' => 'u', 'ư' => 'u', 'ţ' => 't', 'ý' => 'y', 'ő' => 'o',
			'â' => 'a', 'ľ' => 'l', 'ẅ' => 'w', 'ż' => 'z', 'ī' => 'i', 'ã' => 'a', 'ġ' => 'g',
			'ṁ' => 'm', 'ō' => 'o', 'ĩ' => 'i', 'ù' => 'u', 'į' => 'i', 'ź' => 'z', 'á' => 'a',
			'û' => 'u', 'þ' => 'th', 'ð' => 'dh', 'æ' => 'ae', 'µ' => 'u', 'ĕ' => 'e', 'ª' => 'a',
			'º' => 'o', ',' => ''
		);

		$str = str_replace(
			array_keys($utf8_lower_accents),
			array_values($utf8_lower_accents),
			$str
		);

		$utf8_upper_accents = array(
			'À' => 'A', 'Ô' => 'O', 'Ď' => 'D', 'Ḟ' => 'F', 'Ë' => 'E', 'Š' => 'S', 'Ơ' => 'O',
			'Ă' => 'A', 'Ř' => 'R', 'Ț' => 'T', 'Ň' => 'N', 'Ā' => 'A', 'Ķ' => 'K',
			'Ŝ' => 'S', 'Ỳ' => 'Y', 'Ņ' => 'N', 'Ĺ' => 'L', 'Ħ' => 'H', 'Ṗ' => 'P', 'Ó' => 'O',
			'Ú' => 'U', 'Ě' => 'E', 'É' => 'E', 'Ç' => 'C', 'Ẁ' => 'W', 'Ċ' => 'C', 'Õ' => 'O',
			'Ṡ' => 'S', 'Ø' => 'O', 'Ģ' => 'G', 'Ŧ' => 'T', 'Ș' => 'S', 'Ė' => 'E', 'Ĉ' => 'C',
			'Ś' => 'S', 'Î' => 'I', 'Ű' => 'U', 'Ć' => 'C', 'Ę' => 'E', 'Ŵ' => 'W', 'Ṫ' => 'T',
			'Ū' => 'U', 'Č' => 'C', 'Ö' => 'Oe', 'È' => 'E', 'Ŷ' => 'Y', 'Ą' => 'A', 'Ł' => 'L',
			'Ų' => 'U', 'Ů' => 'U', 'Ş' => 'S', 'Ğ' => 'G', 'Ļ' => 'L', 'Ƒ' => 'F', 'Ž' => 'Z',
			'Ẃ' => 'W', 'Ḃ' => 'B', 'Å' => 'A', 'Ì' => 'I', 'Ï' => 'I', 'Ḋ' => 'D', 'Ť' => 'T',
			'Ŗ' => 'R', 'Ä' => 'Ae', 'Í' => 'I', 'Ŕ' => 'R', 'Ê' => 'E', 'Ü' => 'Ue', 'Ò' => 'O',
			'Ē' => 'E', 'Ñ' => 'N', 'Ń' => 'N', 'Ĥ' => 'H', 'Ĝ' => 'G', 'Đ' => 'D', 'Ĵ' => 'J',
			'Ÿ' => 'Y', 'Ũ' => 'U', 'Ŭ' => 'U', 'Ư' => 'U', 'Ţ' => 'T', 'Ý' => 'Y', 'Ő' => 'O',
			'Â' => 'A', 'Ľ' => 'L', 'Ẅ' => 'W', 'Ż' => 'Z', 'Ī' => 'I', 'Ã' => 'A', 'Ġ' => 'G',
			'Ṁ' => 'M', 'Ō' => 'O', 'Ĩ' => 'I', 'Ù' => 'U', 'Į' => 'I', 'Ź' => 'Z', 'Á' => 'A',
			'Û' => 'U', 'Þ' => 'Th', 'Ð' => 'Dh', 'Æ' => 'Ae', 'Ĕ' => 'E', ' ' => '_', '‰' => '',
			'%' => ''
		);

		$str = str_replace(
			array_keys($utf8_upper_accents),
			array_values($utf8_upper_accents),
			$str
		);

		return $str;
	}

	public function setIconeAnexo($arquivo)
	{
		$extencao = strtolower(pathinfo($arquivo, PATHINFO_EXTENSION));

		switch ($extencao) {
			case 'png':
			case 'jpg':
			case 'gif':
			case 'bmp':
			case 'bitmap':
			case 'tiff':
			case 'raw':
			case 'svg':
				$icone = 'icon icon_item i-img';
				break;
			case '3gp':
			case 'avi':
			case 'flv':
			case 'mkv':
			case 'mov':
			case 'mpg':
			case 'mp4':
			case 'rmvb':
			case 'wmv':
				$icone = 'icon icon_item icon-film';
				break;
			case 'mp3':
			case 'wma':
			case 'acc':
				$icone = 'icon icon_item icon-music';
				break;
			case 'zip':
			case 'rar':
			case '7z ':
				$icone = 'icon icon_item icon-tasks';
				break;
			case 'doc':
			case 'txt':
				$icone = 'icon icon_item icon-file-text';
				break;
			case 'xls':
			case 'xlsx':
				$icone = 'icon icon_item icon-xing-sign';
				break;
			case 'pdf':
				$icone = 'icon icon_item icon-print';
				break;
			case 'ppt':
			case 'pptx':
				$icone = 'icon icon_item icon-stackexchange';
				break;
			default:
				$icone = 'icon icon_item i-anexo';
				break;
		}
		return $icone;
	}

	public function abreviaNomeCompleto($string)
	{
		$ignore = 'áàâãäÁÀÂÃÄéèêêÉÈÊËíìîïÍÌÎÏóòôõöÓÒÔÕÖúùûüÚÙÛçÇ';
		$string = utf8_encode(mb_strtolower($string, 'ISO-8859-1'));
		$array_string = str_word_count($string, 1, $ignore);
		$new_string = reset($array_string) . ' ' . end($array_string);

		return ucwords($new_string);
	}

	public function remover_acentos($string)
	{
		return preg_replace('/[`^~\'"]/', null, iconv('ISO-8859-1', 'ASCII//TRANSLIT', $string));
	}

	public function codificarPernambuco($texto)
	{
		$novo = str_replace('7', 'p', $texto);
		$novo = str_replace('4', 'e', $novo);
		$novo = str_replace('8', 'r', $novo);
		$novo = str_replace('1', 'n', $novo);
		$novo = str_replace('5', 'a', $novo);
		$novo = str_replace('9', 'm', $novo);
		$novo = str_replace('2', 'b', $novo);
		$novo = str_replace('6', 'u', $novo);
		$novo = str_replace('3', 'c', $novo);
		$novo = str_replace('0', 'o', $novo);
		return $novo;
	}

	public function gerarImagemBase64($url_arquivo, $extensao)
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($ch, CURLOPT_URL, $url_arquivo);
		$data_img = curl_exec($ch);
		curl_close($ch);
		$imageData = base64_encode($data_img);
		if ($extensao == 'pdf') {
			$img_base64 = $imageData;
		} else {
			$img_base64 = 'data: image/' . $extensao . ';base64,' . $imageData;
		}
		return $img_base64;
	}

	/**
	 * 	Retorna mascara
	 *
	 * @param: $mask = mascara
	 *         $str = valor
	 */
	public function getMascara($mask, $str)
	{
		$str = str_replace(' ', '', $str);
		for ($i = 0; $i < strlen($str); $i++) {
			$mask[strpos($mask, '#')] = $str[$i];
		}
		return $mask;
	}

	public function getInputAngular()
	{
		$postdata = file_get_contents("php://input");
		$request = objectToArray(json_decode($postdata));
		foreach ($request as $key => $value) {
			$request[$key] = str_replace("'", '', $value);
		}
		return $request;
	}

	public function serializeDados($dados = array())
	{
		$rows = array();
		foreach ($dados as $d) {
			$rows[] = array_map('utf8_encode', $d);
		}
		return $rows;
	}

	public function jsonEncodeSatcUtf8($data)
	{
		$novo = array();
		foreach ($data as $key => $val) {
			$novo += array($key => utf8_encode($val));
		}
		return json_encode($novo);
	}

	public function utf8_converter($array)
	{
		array_walk_recursive($array, function (&$item, $key) {
			if (!mb_detect_encoding($item, 'utf-8', true)) {
				$item = utf8_encode($item);
			}
		});

		return $array;
	}

	/**
	 * @author  Mateus Gamba
	 */
	public function get_formata_unidade($i_unidade)
	{
		if ($i_unidade != '') {
			if ($this->CI->session->userdata('i_empresa') == 1) {
				return substr($i_unidade, 0, 2) . '.' . substr($i_unidade, 2, 2) . '-' . substr($i_unidade, -3, 3);
			} else {
				return $i_unidade;
			}
		}
		return '';
	}

	public function get_formata_plano($i_plano)
	{
		if ($i_plano != '') {
			return substr($i_plano, 0, 2) . '-' . substr($i_plano, -3, 3);
		}
		return '';
	}

	public function primeiraMaiusculaPalavras($texto = '')
	{
		/*return ucwords(mb_strtolower($texto, 'ISO-8859-1'));*/
		return ucwords(mb_strtolower($texto));
	}

	public function getMesesArray()
	{
		return [
			1 => "Janeiro",
			2 => "Fevereiro",
			3 => "Março",
			4 => "Abril",
			5 => "Maio",
			6 => "Junho",
			7 => "Julho",
			8 => "Agosto",
			9 => "Setembro",
			10 => "Outubro",
			11 => "Novembro",
			12 => "Dezembro",
		];
	}

	/*
     * Retorna o semestre anterior(20121) = 20112 | semestre(20122) = 20121
     * @parametros: valor ->  variável do semestre
     * @retorno: retorna proximo semestre
     **/
	public function semestre_anterior($valor = "")
	{
		if ($valor != "") {
			$semestres_planos = "";
			$semestre_aux     = "";
			$semestres        = $valor;
			$semestres_split  = explode(",", $semestres);

			foreach ($semestres_split as $semestre) {
				$final = substr($semestre, -1);

				if ((int)$final == 0) {
					$semestre_aux = $semestre - 10;
				} elseif ((int)$final == 1) {
					$semestre_aux = $semestre - 9;
				} elseif ((int)$final == 2) {
					$semestre_aux = $semestre - 1;
				}

				if ($semestres_planos == "") {
					$semestres_planos = $semestre_aux;
				} else {
					$semestres_planos .= "," . $semestre_aux;
				}
			}
			$valor = $semestres_planos;
		}
		return $valor;
	}

	public function proximo_semestre($valor = '')
	{
		if ($valor != '') {

			$semestres_planos = '';
			$semestre_aux     = '';
			$semestres_split  = explode(",", $valor);

			foreach ($semestres_split as $semestre) {
				$final = substr($semestre, -1);

				if ((int)$final == 0) {
					$semestre_aux = $semestre + 10;
				} elseif ((int)$final == 1) {
					$semestre_aux = $semestre + 1;
				} elseif ((int)$final == 2) {
					$semestre_aux = $semestre + 9;
				}

				if ($semestres_planos == '') {
					$semestres_planos = $semestre_aux;
				} else {
					$semestres_planos .= "," . $semestre_aux;
				}
			}
			$valor = $semestres_planos;
		}
		return $valor;
	}

	function geraTokenAleatorio($tamanho = 8, $maiusculas = true, $numeros = true, $simbolos = false, $somente_numeros = false)
	{
		$lmin = 'abcdefghijklmnopqrstuvwxyz';
		$lmai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$num = '1234567890';
		$simb = '!@#$%*-';
		$retorno = '';
		$caracteres = '';
		if ($somente_numeros == true) {
			if ($numeros) $caracteres .= $num;
		} else {
			$caracteres .= $lmin;
			if ($maiusculas) $caracteres .= $lmai;
			if ($numeros) $caracteres .= $num;
			if ($simbolos) $caracteres .= $simb;
		}
		$len = strlen($caracteres);
		for ($n = 1; $n <= $tamanho; $n++) {
			$rand = mt_rand(1, $len);
			$retorno .= $caracteres[$rand - 1];
		}
		return $retorno;
	}
	/**
	 *@author Otavio Walter
	 */
	public function dataAtual()
	{
		date_default_timezone_set('America/Sao_Paulo');
		$padrao = $this->CI->config->item('log_date_format');
		return date($padrao);
	}

	public function getAnoMesAnt($anomes)
	{
		$mes = substr($anomes, -2);
		$ano = substr($anomes, 0, 4);

		if ($mes == '01') {
			$mes = '12';
			$ano = (int) $ano - 1;
		} else {
			$mes = str_pad((int) $mes - 1, 2, "0", STR_PAD_LEFT);
		}

		return $ano . $mes;
	}
	public function adicionarSessao($nome_sessao = "", $data = array())
	{
		$data_sessao = $this->CI->session->userdata($nome_sessao);
		$data_sessao[] = $data;
		$this->CI->session->set_userdata(array($nome_sessao => $data_sessao));
	}

	public function listarSessao($nome_sessao = "")
	{
		$valor = array();
		if ($this->CI->session->userdata($nome_sessao) != "") {
			foreach ($this->CI->session->userdata($nome_sessao) as $key => $val) {
				$valor[] = $val;
			}
		}
		return $valor;
	}

	public function apagarSessao($nome_sessao = "")
	{
		$this->CI->session->unset_userdata($nome_sessao);
	}

	function formata_telefone($valor = "")
	{
		$size = strlen($valor);
		if ($valor != "" && ($size == 11 || $size == 10)) {
			$formatedPhone = preg_replace('/[^0-9]/', '', $valor);
			$matches = [];
			preg_match('/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/', $formatedPhone, $matches);
			if ($matches) {
				return '(' . $matches[1] . ') ' . $matches[2] . '-' . $matches[3];
			}
		}
		return $valor;
	}

	public function formataTelefone($fone)
	{
		$foneFormatado = preg_replace('/[^0-9]/', '', $fone);
		$array = [];
		preg_match('/^([0-9]{2})([0-9]{4,5})([0-9]{4})$/', $foneFormatado, $array);
		if ($array) {
			return '(' . $array[1] . ') ' . $array[2] . '-' . $array[3];
		}
		return $fone;
	}

	public function email_dovolucao_pedido($i_pedido, $sequencia, $justificativa)
	{
		$CI = &get_instance();
		$CI->load->model('Pedidos_itens_model');
		$CI->load->model('Pedidos_model');
		$CI->load->model('Usuarios_model');

		$item = $CI->Pedidos_itens_model->get_pedido_item($i_pedido, $sequencia);
		$pedido = $CI->Pedidos_model->get_pedido($i_pedido);
		$usuario = $CI->Usuarios_model->get_Usuario($pedido->i_usuario);

		$texto =
			"<strong>Pedido:</strong> {$i_pedido} / {$sequencia} ({$item['descricao']})<br><br>
				<strong>Devolvido por:</strong><br> {$this->CI->session->userdata('nome_usuario')}<br/><br/>
				<b>Motivo:</b><br>{$justificativa}<br/><br/><br/><br/>
				<div style='color:#009'>
					<b>ORIENTA&Ccedil;&Atilde;O SOBRE PEDIDOS DEVOLVIDOS</b></div><br><br>
					<div>
						Caros Colaboradores<br><br>
						Informamos que os pedidos realizados no portal do colaborador para compra de materiais e/ou servi&ccedil;os, ser&atilde;o CANCELADOS automaticamente quando apresentarem o status \"DEVOLVIDO\" e permanecerem sem intera&ccedil;&atilde;o por um per&iacute;odo igual ou superior a 30 dias corridos. Este procedimento se faz necess&aacute;rio, uma vez que a grande maioria dos Fornecedores da SATC n&atilde;o podem manter a cota&ccedil;&atilde;o informada por um per&iacute;odo superior a 15 dias.<br><br>
						Qualquer d&uacute;vida, entrar em contato com o setor de compras  no ramal: 7670.<br><br><br>
						Atenciosamente.<br>
						Almoxarifado.
					</div>
				</div>";
		$this->enviar_email($usuario->e_mail, "Pedido Devolvido: {$i_pedido} / {$sequencia}", $texto);
	}

	public function somarHoras($tempo_1, $tempo_2)
	{
		$minutos1 = substr($tempo_1, 3, 2);
		$minutos2 = substr($tempo_2, 3, 2);
		$soma_min = (int)$minutos2 + (int)$minutos1;
		if ($soma_min > 60) {
			$hora_mais = 1;
			$soma_min = $soma_min - 60;
		} else {
			$hora_mais = 0;
		}
		if ($soma_min < 10) {
			$soma_min = $soma_min . "0";
		}
		$hora1 = substr($tempo_1, 0, 2);
		$hora2 = substr($tempo_2, 0, 2);

		$hora_somada = (int)$hora2 + (int)$hora1 + $hora_mais;
		if ($hora_somada < 10) {
			$hora_somada = $hora_somada . "0";
		}
		$tudo_junto = $hora_somada . ":" . $soma_min;
		return $tudo_junto;
	}

	public function getAssinaturasGED($cpf)
	{
		$url = URL_GED . 'api/getAssinaturasCPF/' . $this->formata_cnpj_cpf($cpf, 1);

		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => $url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_SSL_VERIFYPEER => 0,
			CURLOPT_SSL_VERIFYHOST => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
			CURLOPT_HTTPHEADER => array(
				'Authorization: Bearer JATeoSC7CcZCDjG77zKU7sNbSa1dToQvEnzgec0Byn2IPBqyg1Nvk57gjw8t'
			),
		));

		$response = curl_exec($curl);
		curl_close($curl);

		return json_decode($response);
	}

	public function downloadArquivoGED($arquivo_id)
	{
		$url = URL_GED . 'api/downloadDocumento/' . $arquivo_id;

		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => $url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_SSL_VERIFYPEER => 0,
			CURLOPT_SSL_VERIFYHOST => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
			CURLOPT_HTTPHEADER => array(
				'Authorization: Bearer JATeoSC7CcZCDjG77zKU7sNbSa1dToQvEnzgec0Byn2IPBqyg1Nvk57gjw8t'
			),
		));

		$response = curl_exec($curl);
		curl_close($curl);

		echo base64_encode($response);
	}

	//161371 - Resultado de Bolsa 2024
	function somar_dias_uteis($str_data, $int_qtd_dias_somar)
	{
		$feriados = array("01-01", "04-21", "05-01", "09-07", "10-12", "11-02", "11-15", "12-25");
		$data_completa = explode(' ', $str_data);
		$array_data = explode('-', $data_completa[0]);

		if (count($array_data) != 3) return $str_data;
		if (!checkdate($array_data[1], $array_data[2], $array_data[0])) return $str_data;

		$count_days = 0;
		$int_qtd_dias_uteis = 0;
		while ($int_qtd_dias_uteis < $int_qtd_dias_somar) {
			$count_days++;
			$day = date('m-d', strtotime('+' . $count_days . 'day', strtotime($str_data)));
			$dias_da_semana = gmdate('w', strtotime('+' . $count_days . 'day', gmmktime(0, 0, 0, $array_data[1], $array_data[2], $array_data[0])));
			if ($dias_da_semana != '0' && $dias_da_semana != '6' && !in_array($day, $feriados)) {
				$int_qtd_dias_uteis++;
			}
		}
		return gmdate('Y-m-d', strtotime('+' . $count_days . 'day', strtotime($str_data))) . (isset($data_completa[1]) ? ' ' . $data_completa[1] : '');
	}

	public function remove_acentuacao($string)
	{
		return preg_replace(array("/(á|à|ã|â|ä)/", "/(Á|À|Ã|Â|Ä)/", "/(é|è|ê|ë)/", "/(É|È|Ê|Ë)/", "/(í|ì|î|ï)/", "/(Í|Ì|Î|Ï)/", "/(ó|ò|õ|ô|ö)/", "/(Ó|Ò|Õ|Ô|Ö)/", "/(ú|ù|û|ü)/", "/(Ú|Ù|Û|Ü)/", "/(ñ)/", "/(Ñ)/"), explode(" ", "a A e E i I o O u U n N"), $string);
	}

	public function getIdade($data, $tipo = 'EN')
	{
		if ($tipo == 'EN') {
			list($ano, $mes, $dia) = explode('-', $data);
		} elseif ($tipo == 'BR') {
			list($dia, $mes, $ano) = explode('/', $data);
		}

		$hoje = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
		$nascimento = mktime(0, 0, 0, $mes, $dia, $ano);
		$idade = floor((((($hoje - $nascimento) / 60) / 60) / 24) / 365.25);
		return $idade;
	}
}

/* End of file Satc.php */
/* Location: ./app/libraries/Satc.php */
