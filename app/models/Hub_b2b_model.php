<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Hub_b2b_model extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
	}

	public function getPropostas($where)
	{
		return $this->db->get_where('view_propostas_empresa', $where)->result_array();
	}

	public function getFinanceiro($where)
	{
		return $this->db->get_where('financeiro', $where)->result_array();
	}

	public function getRecomendacoes($where)
	{
		return $this->db->get_where('recomendacoes', $where)->result_array();
	}

	public function insertOrcamento($data)
	{
		return $this->db->insert('orcamentos', $data);
	}

	public function insertProposta($data)
	{
		return $this->db->insert('propostas', $data);
	}
}

/* End of file Hub_b2b_model.php */
/* Location: ./app/models/Hub_b2b_model.php */
