<div id="modalVisualizarFinanceiro" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalVisualizarFinanceiroLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="modalVisualizarFinanceiroLabel">Visualizar Financeiro</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-sm-12">
						<table class="table table-hover table-striped">
							<thead class="thead-default">
								<tr>
									<th class="text-center">Nº NF</th>
									<th>Descrição</th>
									<th class="text-right" style="white-space:nowrap;">Valor (R$)</th>
									<th class="text-center">Imprimir NF</th>
									<th class="text-center">Visualizar Boleto</th>
								</tr>
							</thead>
							<tbody>
								<tr ng-repeat="d in financeiro">
									<td class="text-center">{{d.id}}</td>
									<td>
										<span class="ajuste-tr">{{d.descricao}}</span>
									</td>
									<td class="text-right" style="white-space:nowrap;">{{d.valor | currency:'R$ '}}</td>
									<td class="text-center">
										<i class="fa fa-file-pdf-o"></i>
									</td>
									<td class="text-center">
										<i class="fa fa-print"></i>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Fechar</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<style>
	.progress-container {
		width: 100%;
		max-width: 600px;
		text-align: center;
	}

	.step {
		padding-left: 20px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 20px;
		position: relative;
	}

	.step:last-child {
		margin-bottom: 0;
	}

	.step:not(:last-child):before {
		content: '';
		position: absolute;
		left: 20px;
		top: 40px;
		bottom: -10px;
		width: 2px;
		background-color: #ccc;
		z-index: -1;
	}

	.step-icon {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		margin-right: 10px;
		flex-shrink: 0;
		z-index: 1;
		position: relative;
	}

	.step-header {
		display: flex;
		align-items: center;
	}

	.step.completed .step-icon {
		background-color: #4caf50;
	}

	.step.pending .step-icon {
		background-color: #ff9800;
	}

	.step-text {
		flex-grow: 1;
		text-align: left;
	}

	.more-info {
		display: none;
		margin-top: 10px;
		text-align: left;
		font-size: 14px;
		padding-left: 10px;
		color: #666;
	}

	.show-more {
		margin-top: 10px;
		cursor: pointer;
		color: #007BFF;
		text-decoration: underline;
		font-size: 14px;
		display: flex;
		align-items: center;
	}

	.show-more i {
		margin-left: 5px;
	}
</style>