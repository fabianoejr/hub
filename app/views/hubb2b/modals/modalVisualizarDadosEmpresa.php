<div id="modalVisualizarDadosEmpresa" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalVisualizarDadosEmpresaLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="modalVisualizarDadosEmpresaLabel">Empresa</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body" style="display: flex;
    				flex-direction: row;
    				align-items: center;">

				<body style="font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            margin: 0;">
					<div style="display: flex; justify-content: center;" class="col-sm-6">
						<img src="https://via.placeholder.com/140" alt="Foto da Empresa">
					</div>
					<div class="col-sm-6">
						<div style="float:right;" class="company-details-container">
							<h2>Dados da Empresa</h2>
							<div class="company-detail">
								<div class="label">ID:</div>
								<div class="value">1</div>
							</div>
							<div class="company-detail">
								<div class="label">Nome:</div>
								<div class="value">SATC</div>
							</div>
							<div class="company-detail">
								<div class="label">CNPJ:</div>
								<div class="value">000</div>
							</div>
						</div>
					</div>
				</body>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Fechar</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<style>
	.company-details-container {
		background-color: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 400px;
	}

	.company-details-container h2 {
		text-align: center;
		margin-bottom: 20px;
		color: #333;
	}

	.company-detail {
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
		border-bottom: 1px solid #eee;
	}

	.company-detail:last-child {
		border-bottom: none;
	}

	.label {
		font-weight: bold;
		color: #555;
	}

	.value {
		color: #777;
	}
</style>