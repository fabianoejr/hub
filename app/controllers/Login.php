<?php
if (!defined('BASEPATH')) exit('Não é permitido acesso direto ao Script (Pedidos_ordem_compras)');

class Login extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model("Empresas_model", "mEmpresas");
		$this->load->helper('tag_helper');
	}

	public function index()
	{
		$this->load->helper('form');
		$this->load->library('form_validation');

		$this->form_validation->set_rules('cnpj', 'CNPJ', 'required');
		$this->form_validation->set_rules('senha', 'Senha', 'required');

		if ($this->session->userdata('empresa')) {
			redirect('Hub_b2b/#!/');
		}

		if ($this->form_validation->run() === FALSE) {
			$this->load->view('login');
		} else {
			$cnpj = $this->input->post('cnpj');
			$senha = $this->input->post('senha');
			if (strtoupper($cnpj) == 'CNPJ' && strtoupper($senha) == '123') {
				$data['error'] = 'CNPJ ou Senha inválida!';
			}
			$empresa = $this->mEmpresas->getEmpresa(['cnpj' => $cnpj]);

			if ($empresa && ($senha === $empresa->senha)) {
				$this->session->set_userdata('empresa', $empresa);
				redirect('Hub_b2b/#!/');
			} else {
				$data['error'] = 'CNPJ ou Senha inválida!';
				$this->load->view('login', $data);
			}
		}
	}

	public function logout()
	{
		$this->session->unset_userdata('empresa');
		redirect('login');
	}
}
