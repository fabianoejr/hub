<div id="modalAcompanharProposta" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalAcompanharPropostaLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="modalAcompanharPropostaLabel">Acompanhar Proposta</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-sm-12">
						<div class="container123">
							<div class="progress mt-3">
								<span></span>
								<div class="progress-bar" role="progressbar" ng-style="{'width': ((progresso * numero_aleatorio + '%'))};" aria-valuenow="{{((progresso * numero_aleatorio))}}" aria-valuemin="0" aria-valuemax="100">
									{{(progresso *numero_aleatorio).toFixed(0)+'%'}}
								</div>
							</div>
						</div>


					</div>

					<body style="font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f5f5f5;
            padding: 0 20px;
            box-sizing: border-box;">
						<div class="progress-container">
							<div class="step completed">
								<div class="step-header" onclick="toggleMoreInfo(1)">
									<div class="step-icon">1</div>
									<div class="step-text">Proposta realizada</div>
									&nbsp;<i class="fa fa-chevron-down"></i>
								</div>
								<div class="more-info" id="moreInfo1">
									<p>Proposta emitida com sucesso em 11/08/2023! Aguarde o encaminhamento.</p>
								</div>
							</div>
							<div class="step completed">
								<div class="step-header" onclick="toggleMoreInfo(2)">
									<div class="step-icon">2</div>
									<div class="step-text">Proposta encaminhada</div>
									&nbsp;<i class="fa fa-chevron-down"></i>
								</div>
								<div class="more-info" id="moreInfo2">
									<p>Proposta encaminhada para aceite do cliente em 15/08/2023. Aguarde o aceite.</p>
								</div>
							</div>
							<div class="step completed">
								<div class="step-header" onclick="toggleMoreInfo(3)">
									<div class="step-icon">3</div>
									<div class="step-text">Proposta aceita</div>
									&nbsp;<i class="fa fa-chevron-down"></i>
								</div>
								<div class="more-info" id="moreInfo3">
									<p>Proposta aceite pelo cliente em 30/08/2023! Aguarde o retorno da SATC.</p>
								</div>
							</div>
							<div class="step completed">
								<div class="step-header" onclick="toggleMoreInfo(4)">
									<div class="step-icon">4</div>
									<div class="step-text">Proposta pendente com a SATC</div>
									&nbsp;<i class="fa fa-chevron-down"></i>
								</div>
								<div class="more-info" id="moreInfo4">
									<p>Últimos detalhes da proposta preenchidos pela SATC em 04/09/2023! Aguarde a finalização da proposta.</p>
								</div>
							</div>
							<div class="step pending">
								<div class="step-header" onclick="toggleMoreInfo(5)">
									<div class="step-icon">5</div>
									<div class="step-text">Proposta finalizada</div>
									&nbsp;<i class="fa fa-chevron-down"></i>
								</div>
								<div class="more-info" id="moreInfo5">
									<p>Aguarde a finalização da proposta.</p>
								</div>
							</div>
						</div>

						<script>
							function toggleMoreInfo(step) {
								const moreInfo = document.getElementById(`moreInfo${step}`);
								const icon = moreInfo.previousElementSibling.querySelector('i');
								if (moreInfo.style.display === 'block') {
									moreInfo.style.display = 'none';
									icon.classList.remove('fa-chevron-up');
									icon.classList.add('fa-chevron-down');
								} else {
									moreInfo.style.display = 'block';
									icon.classList.remove('fa-chevron-down');
									icon.classList.add('fa-chevron-up');
								}
							}
						</script>
					</body>
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