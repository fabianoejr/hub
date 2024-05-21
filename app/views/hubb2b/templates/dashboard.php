<style type="text/css">
	.table-hover tbody tr:hover {
		background-color: #f0f2f3;
	}

	.swal-modal .swal-text {
		text-align: left;
		padding: 0 15px;
		display: flex;
	}

	.active-shadow {
		border: 2px solid !important;
		background-color: #fdfdfd;
	}

	.card-box {
		border: 1px solid transparent;
		position: relative;
	}

	.tilebox-two i {
		font-size: 35px;
		position: absolute;
		right: 15%;
		bottom: 15%;
	}

	.priceJ h3 {
		font-size: 1.5rem;
		font-weight: 700;
	}

	.priceJ table tbody tr td span {
		font-weight: 500;
		text-transform: uppercase;
	}

	.ajuste-tr {
		width: 300px;
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.card {
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 15px;
		text-align: left;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		max-width: 300px;
		/* Definindo o tamanho máximo dos cards */
		margin: 0 auto;
		/* Centralizando os cards */
		height: 400px;
		/* Definindo uma altura fixa para os cards */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.card img {
		width: 100%;
		height: 200px;
		/* Definindo uma altura fixa para as imagens */
		object-fit: cover;
		/* Garantindo que as imagens mantenham a proporção */
		border-radius: 8px 8px 8px 8px;
		align-self: center;
		/* Centralizando a imagem verticalmente */
		object-position: center top;
		/* Ajustando a posição da imagem para começar do centro para cima */
	}

	.swiper-container {
		width: 100%;
		/* Ajustando a largura do container */
		overflow: hidden;
	}

	.swiper-button-next,
	.swiper-button-prev {
		position: absolute;
		top: 50%;
		transform: translateY(500%);
	}

	.swiper-button-next {
		right: 0;
	}

	.swiper-button-prev {
		left: 0;
	}

	@media (min-width: 768px) {
		.col-md-2 {
			flex: 0 0 12%;
		}

		.card-box {
			min-height: 114px;
		}
	}
</style>

<!-- Page-Title -->
<div style="padding: 15px;" ng-controller="appHubCtlr" ng-init="getDadosEmpresa()" ng-cloak>
	<div class="row">
		<div class="col-md-8">
			<h4 class="page-title p-3">Seja bem-vindo, <?php echo $this->session->userdata('empresa')->nome; ?></h4>
		</div>
		<div class="col-md-4 d-flex justify-content-end align-items-center">
			<button type="button" class="btn btn-danger-outline waves-effect waves-light" onclick="window.location.href='<?php echo base_url('Login/logout'); ?>'">
				<span class="fa fa-sign-out"></span> Sair
			</button>
		</div>
	</div>

	<div class="row">
		<div class="col-md-5 priceJ">
			<div class="row">
				<div class="col-md-4" ng-click="visualizarRepresentantes()" style="cursor: pointer;">
					<div class="card-box tilebox-two active-shadow"> <!-- active-shadow -->
						<h6 class="text-uppercase">Meus</h6>
						<br>
						<h4><span data-plugin="counterup">Representantes</span></h4>
					</div>
				</div>

				<div class="col-md-4" ng-click="abrirLink('https://jovemaprendiz.satc.edu.br/')" style="cursor: pointer;">
					<div class="card-box tilebox-two active-shadow" style="border-color:#f7bb05 !important;">
						<h6 class="text-aprendiz text-uppercase">Jovem</h6>
						<br>
						<h3 class="text-aprendiz"><span data-plugin="counterup">Aprendiz</span></h3>
					</div>
				</div>

				<div class="col-md-4" ng-click="abrirLink('https://www1.satc.edu.br/laboratorio/')" style="cursor: pointer;">
					<div class="card-box tilebox-two active-shadow" style="border-color:#16a3d9 !important;">
						<h6 class="text-laboratorio text-uppercase">Sistema</h6>
						<br>
						<h3 class="text-laboratorio"><span data-plugin="counterup">Laboratório</span></h3>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4" ng-click="visualizarFinanceiro()" style="cursor: pointer;">
					<div class="card-box tilebox-two active-shadow" style="border-color:#7239ea !important;">
						<h6 class="text-lancar text-uppercase">Visualizar</h6>
						<br>
						<h3 class="text-lancar"><span data-plugin="counterup">Financeiro</span></h3>
					</div>
				</div>
				<div class="col-md-4" ng-click="visualizarDadosEmpresa()" style="cursor: pointer;">
					<div class="card-box tilebox-two active-shadow" style="border-color:#7db235 !important;">
						<h6 class="text-ganha text-uppercase">Dados</h6>
						<br>
						<h3 class="text-ganha"><span data-plugin="counterup">Empresa</span></h3>
					</div>
				</div>
				<div class="col-md-4" ng-click="abrirLink('https://api.whatsapp.com/send?phone=554834317677')" style="cursor: pointer;">
					<div class="card-box tilebox-two active-shadow" style="border-color:#b3b3b3 !important;">
						<h6 class="text-cancelada text-uppercase">Tenho</h6>
						<br>
						<h3 class="text-cancelada"><span data-plugin="counterup">Dúvidas</span></h3>
					</div>
				</div>
			</div>

		</div>
		<div class="col-md-7 priceJ">
			<div class="row">
				<div class="col-md-12">
					<table class="table table-hover table-striped">
						<h4>Negociações</h4>
						<thead class="thead-default">
							<tr>
								<th class="text-center">Código</th>
								<th>Descrição</th>
								<th class="text-center">Segmento</th>
								<th class="text-right" style="white-space:nowrap;">Valor (R$)</th>
								<th class="text-center">Status</th>
							</tr>
						</thead>
						<tbody>
							<tr dir-paginate="(key, d) in propostas|itemsPerPage:5">
								<td class="text-center">{{d.id_proposta}}</td>
								<td>
									<span class="ajuste-tr">{{d.descricao_proposta}}</span>
								</td>
								<td class="text-center">{{d.descricao_segmento}}</td>
								<td class="text-right" style="white-space:nowrap;" ng-if="d.orcamento === 'N'">{{d.valor_proposta | currency:'R$ '}}</td>
								<td class="text-right" style="white-space:nowrap;" ng-if="d.orcamento === 'S'">Orçamento</td>
								<td class="text-center">
									<button class="btn btn-md" ng-click="consultaProposta(d)" ng-class="{
                					  'btn-ganha': d.status_proposta == 'A',
                					  'btn-perdida': d.status_proposta == 'I',
                					  'btn-aberta': d.status_proposta == 'P'
              							}" style="width: 100px">
										{{d.status_proposta_descricao}}
									</button>
								</td>
								<td class="text-center">{{d.emissor}}</td>
							</tr>
						</tbody>
					</table>
					<div class="col-md-12 col-sm-12 pb-5 mb-5">
						<dir-pagination-controls></dir-pagination-controls>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-8">
			<h4 class="page-title p-3">Escolhidos para <b>sua empresa</b></h4>
		</div>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" ng-repeat="recomendacao in recomendacoes">
					<div class="card">
						<img ng-src="{{recomendacao.imagem}}" alt="{{recomendacao.descricao}}">
						<h5>{{recomendacao.descricao}}</h5>
						<p ng-bind-html="recomendacao.detalhes"></p>
						<p class="text-left" style="padding-left:2px;" ng-show="recomendacao.valor != 0"><strong>{{(recomendacao.valor | currency:'R$ ') + (recomendacao.id_segmento == 1 ? ' / vaga' : '')}}
								<button type="button" style="float:right;" ng-click="abrirLink(recomendacao.url)" class="btn btn-info">Comprar</button></strong>
						</p>
						<p class="btn btn-success" ng-click="abrirModalOrcamento(recomendacao)" ng-show="recomendacao.valor == 0"><strong>Fazer um Orçamento</strong></p>
					</div>
				</div>
			</div>
			<!-- Add Pagination -->
			<div style="display:none" class="swiper-pagination"></div>
			<!-- Add Navigation -->
			<div class="swiper-button-next"></div>
			<div class="swiper-button-prev"></div>
		</div>
	</div>
	<!-- Modals -->
	<?php $this->load->view('hubb2b/modals/modalSolicitarOrcamento'); ?>
	<?php $this->load->view('hubb2b/modals/modalAcompanharProposta'); ?>
	<?php $this->load->view('hubb2b/modals/modalVisualizarFinanceiro'); ?>
	<?php $this->load->view('hubb2b/modals/modalVisualizarRepresentantes'); ?>
	<?php $this->load->view('hubb2b/modals/modalVisualizarDadosEmpresa'); ?>
</div>