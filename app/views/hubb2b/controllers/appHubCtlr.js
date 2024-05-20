appHub.controller(
	"appHubCtlr",
	function ($scope, $rootScope, $location, $window, appHubFact, $sce, $timeout) {
		$scope.dados_empresa = {};
		$scope.propostas = {};
		$scope.financeiro = {};
		$scope.recomendacoes = {};
		$scope.orcamento_recomendacao = {};
		$scope.dados_orcamento = {};
		/**
		 *  Functions
		 */

		$scope.redirectToNew = function () {
			$scope.redirect_to("/novo");
		};

		$scope.redirect_to = function (val) {
			$location.path(val);
		};

		$scope.abrirLink = function (url) {
			window.open(url);
		}

		$scope.getDadosEmpresa = async function () {
			$rootScope.loadingAll = true;
			// $scope.dados_empresa = await appHubFact.getDadosEmpresa();
			$scope.propostas = await appHubFact.getPropostas();
			// $scope.financeiro = await appHubFact.getFinanceiro();
			$scope.recomendacoes = await appHubFact.getRecomendacoes();
			console.log($scope.recomendacoes);
			$rootScope.loadingAll = false;
			$timeout(function() {
				var swiper = new Swiper('.swiper-container', {
					slidesPerView: '4', // Define o número de slides visíveis automaticamente
					spaceBetween: 5,
					loop: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
				});
			});
		};

		$scope.trustAsHtml = function (string) {
			return $sce.trustAsHtml(string);
		};

		$scope.abrirModalOrcamento = function (recomendacao) {
			$scope.dados_orcamento.nome = 'fafa de belem';
			$scope.orcamento_recomendacao = recomendacao;
			$('#modalSolicitarOrcamento').modal('show')
		}
	}
);
