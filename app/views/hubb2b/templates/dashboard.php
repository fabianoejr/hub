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
				<div class="col-md-4" ng-click="buscaPropostasFiltro('', $event,false)" style="cursor: pointer;">
					<div class="card-box tilebox-two active-shadow"> <!-- active-shadow -->
						<h6 class="text-uppercase">Meus</h6>
						<br>
						<h4><span data-plugin="counterup">Representantes</span></h4>
					</div>
				</div>

				<div class="col-md-4" ng-click="buscaPropostasFiltro('A', $event,false)" style="cursor: pointer;">
					<div class="card-box tilebox-two active-shadow" style="border-color:#f7bb05 !important;">
						<h6 class="text-aprendiz text-uppercase">Jovem</h6>
						<br>
						<h3 class="text-aprendiz"><span data-plugin="counterup">Aprendiz</span></h3>
					</div>
				</div>

				<div class="col-md-4" ng-click="buscaPropostasFiltro('F', $event,false)" style="cursor: pointer;">
					<div class="card-box tilebox-two active-shadow" style="border-color:#16a3d9 !important;">
						<h6 class="text-laboratorio text-uppercase">Sistema</h6>
						<br>
						<h3 class="text-laboratorio"><span data-plugin="counterup">Laboratório</span></h3>
					</div>
				</div>
			</div>

		</div>
		<div class="col-md-7 priceJ">
			<div class="row">
				<div class="col-md-12">
					<table class="table table-hover table-striped">
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
								<td class="text-right" style="white-space:nowrap;">{{d.valor_proposta | currency:'R$ '}}</td>
								<td class="text-center">
									<button class="btn btn-md" ng-click="consultaAutorizacao(d.autorizacao, d.interacoes)" ng-class="{
                  'btn-ganha': d.status_proposta == 'A',
                  'btn-perdida': d.status_proposta == 'I'
              		}" style="width: 100px" ng-readonly="!d.autorizacao" uib-tooltip="{{d.motivo_cancelamento}}">
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
	<!-- Modals -->
</div>
