<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Empresas_model extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
	}

	public function getEmpresa($where)
	{
		return $this->db->get_where('empresas', $where)->row();
	}
}

/* End of file Empresas_model.php */
/* Location: ./app/models/Empresas_model.php */
