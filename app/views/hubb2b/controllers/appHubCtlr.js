appHub.controller(
	"appHubCtlr",
	function (
		$scope,
		$rootScope,
		$location,
		$window,
		appHubFact,
		$sce,
		$timeout
	) {
		$scope.dados_empresa = {};
		$scope.propostas = {};
		$scope.financeiro = {};
		$scope.recomendacoes = {};
		$scope.orcamento_recomendacao = {};
		$scope.dados_orcamento = {};
		$scope.etapa = 1;
		$scope.progresso = 25;
		/**
		 *  Functions
		 */

		$scope.gerarNumeroAleatorio = function () {
			return Math.floor(Math.random() * 3) + 1;
		};

		$scope.redirectToNew = function () {
			$scope.redirect_to("/novo");
		};

		$scope.redirect_to = function (val) {
			$location.path(val);
		};

		$scope.abrirLink = function (url) {
			window.open(url);
		};

		$scope.consultaProposta = function (proposta) {
			$scope.numero_aleatorio = $scope.gerarNumeroAleatorio();
			$("#modalAcompanharProposta").modal("show");
		};

		$scope.visualizarFinanceiro = function () {
			$("#modalVisualizarFinanceiro").modal("show");
		};

		$scope.visualizarRepresentantes = function () {
			$("#modalVisualizarRepresentantes").modal("show");
		};

		$scope.visualizarDadosEmpresa = function () {
			$("#modalVisualizarDadosEmpresa").modal("show");
		};

		$scope.getDadosEmpresa = async function () {
			$rootScope.loadingAll = true;
			$scope.dados_empresa = await appHubFact.getDadosEmpresa();
			$scope.propostas = await appHubFact.getPropostas();
			$scope.financeiro = await appHubFact.getFinanceiro();
			$scope.recomendacoes = await appHubFact.getRecomendacoes();
			console.log($scope.recomendacoes);
			$rootScope.loadingAll = false;
			$timeout(function () {
				var swiper = new Swiper(".swiper-container", {
					slidesPerView: "4", // Define o número de slides visíveis automaticamente
					spaceBetween: 5,
					loop: true,
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
					pagination: {
						el: ".swiper-pagination",
						clickable: true,
					},
				});
			});
		};

		$scope.trustAsHtml = function (string) {
			return $sce.trustAsHtml(string);
		};

		$scope.abrirModalOrcamento = function (recomendacao) {
			$scope.orcamento_recomendacao = recomendacao;
			$("#modalSolicitarOrcamento").modal("show");
		};

		$scope.solicitarOrcamento = async function () {
			if (
				!$scope.dados_orcamento.nome ||
				!$scope.dados_orcamento.nome.trim() ||
				!$scope.dados_orcamento.email ||
				!$scope.dados_orcamento.email.trim() ||
				!$scope.dados_orcamento.telefone ||
				!$scope.dados_orcamento.telefone.trim()
			) {
				swal("Atenção!", "Preencha todos os campos solicitados.", "warning");
				return;
			}
			$rootScope.loadingAll = true;
			const dados = {
				...$scope.orcamento_recomendacao,
				...$scope.dados_orcamento,
			};

			await appHubFact.postSolicitaOrcamento(dados);
			$rootScope.loadingAll = false;
			swal(
				"Sucesso!",
				"Orçamento realizado com sucesso! Aguarde o retorno de um de nossos vendedores.",
				"success"
			);
		};
	}
);
