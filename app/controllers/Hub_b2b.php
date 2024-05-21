<?php
if (!defined('BASEPATH')) exit('Não é permitido acesso direto ao Script (Pedidos_ordem_compras)');

class Hub_b2b extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model("Hub_b2b_model", "mHub");
		$this->load->model("Empresas_model", "mEmpresas");
		$this->load->helper('tag_helper');
		$this->load->helper('satc_helper');
		$this->load->library('session');
		$this->load->library('satc');

		if (!$this->session->userdata('empresa')) {
			redirect('login');
		}
	}

	public function index()
	{
		add_js(array(
			'assets_novo/js/ng-file-upload/ng-file-upload-shim.min.js',
			'assets_novo/js/ng-file-upload/ng-file-upload.min.js',
			'assets_novo/js/ui-bootstrap-tpls-1.3.3.min.js',
			'app/views/hubb2b/appHub.js',
			'app/views/hubb2b/factorys/appHubFact.js?v=1.1',
			'app/views/hubb2b/controllers/appHubCtlr.js',
			'app/views/hubb2b/services/appHubServices.js',
			'app/views/hubb2b/routes/routes.js',
			'node_modules/sweetalert/dist/sweetalert.min.js',
			'assets_novo\js\angular-input-masks-standalone.min.js'
		));
		$data['ngApp'] = "appHub";

		$this->load->view('hubb2b/interface', $data);
	}

	public function dashboard()
	{
		$this->load->view('hubb2b/templates/dashboard');
	}

	public function getDadosEmpresa()
	{
		echo json_encode($this->mEmpresas->getEmpresa(['id' => $this->session->userdata('empresa')->id]));
	}

	public function getPropostas()
	{
		echo json_encode($this->mHub->getPropostas(['id_empresa' => $this->session->userdata('empresa')->id]));
	}

	public function getFinanceiro()
	{
		echo json_encode($this->mHub->getFinanceiro(['id_empresa' => $this->session->userdata('empresa')->id]));
	}

	public function getRecomendacoes()
	{
		echo json_encode($this->mHub->getRecomendacoes(['id_empresa' => $this->session->userdata('empresa')->id]));
	}

	public function postSolicitaOrcamento()
	{
		$inputs = $this->satc->getInputAngular();

		$dados_orcamento = [
			'id_empresa' => $inputs['dados']['id_empresa'],
			'id_segmento' => $inputs['dados']['id_segmento'],
			'descricao' => $inputs['dados']['descricao'],
			'detalhes' => $inputs['dados']['detalhes'],
			'nome' => $inputs['dados']['nome'],
			'email' => $inputs['dados']['email'],
			'telefone' => $inputs['dados']['telefone'],
		];

		$this->mHub->insertOrcamento($dados_orcamento);

		$dados_proposta = [
			'id_empresa' => $inputs['dados']['id_empresa'],
			'id_segmento' => $inputs['dados']['id_segmento'],
			'descricao' => $inputs['dados']['descricao'],
			'status' => 'P',
			'orcamento' => 'S'
		];

		$this->mHub->insertProposta($dados_proposta);

		echo json_encode(['success' => true, 'message' => 'Orçamento criado com sucesso!']);
	}
}
