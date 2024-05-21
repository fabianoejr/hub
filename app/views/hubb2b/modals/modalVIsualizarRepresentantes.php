<div id="modalVisualizarRepresentantes" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalVisualizarRepresentantesLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="modalVisualizarRepresentantesLabel">Meus Representantes</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">

				<body style=" font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            padding: 10px;
            box-sizing: border-box;">
					<div class="representatives-container">
						<div class="representative">
							<img src="https://via.placeholder.com/60" alt="Foto do Representante">
							<div class="representative-info">
								<div class="name">João Silva</div>
								<div class="email">joao.silva@exemplo.com</div>
								<div class="birthdate">Data de Nascimento: 15/03/1980</div>
							</div>
						</div>
						<div class="representative">
							<img src="https://via.placeholder.com/60" alt="Foto do Representante">
							<div class="representative-info">
								<div class="name">Maria Oliveira</div>
								<div class="email">maria.oliveira@exemplo.com</div>
								<div class="birthdate">Data de Nascimento: 22/07/1985</div>
							</div>
						</div>
						<div class="representative">
							<img src="https://via.placeholder.com/60" alt="Foto do Representante">
							<div class="representative-info">
								<div class="name">Carlos Souza</div>
								<div class="email">carlos.souza@exemplo.com</div>
								<div class="birthdate">Data de Nascimento: 30/09/1990</div>
							</div>
						</div>
						<div class="representative">
							<img src="https://via.placeholder.com/60" alt="Foto do Representante">
							<div class="representative-info">
								<div class="name">Ana Pereira</div>
								<div class="email">ana.pereira@exemplo.com</div>
								<div class="birthdate">Data de Nascimento: 11/11/1975</div>
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
	.representatives-container {
		width: 100%;
		max-width: 800px;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 20px;
	}

	.representative {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		padding: 10px 0;
	}

	.representative:last-child {
		border-bottom: none;
	}

	.representative img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin-right: 20px;
		object-fit: cover;
	}

	.representative-info {
		display: flex;
		flex-direction: column;
	}

	.representative-info .name {
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.representative-info .email {
		font-size: 14px;
		color: #666;
		margin: 5px 0;
	}

	.representative-info .birthdate {
		font-size: 14px;
		color: #666;
	}
</style>