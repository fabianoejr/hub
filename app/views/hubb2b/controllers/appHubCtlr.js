appHub.controller(
	"appHubCtlr",
	function ($scope, $rootScope, $location, $window, appHubFact) {
		$scope.dadosEmpresa = {};
		$scope.propostas = {};
		$scope.financeiro = {};
		$scope.recomendacoes = {};
		/**
		 *  Functions
		 */

		$scope.redirectToNew = function () {
			$scope.redirect_to("/novo");
		};

		$scope.redirect_to = function (val) {
			$location.path(val);
		};

		$scope.getDadosEmpresa = async function () {
			$rootScope.loadingAll = true;
			// $scope.dadosEmpresa = await appHubFact.getDadosEmpresa();
			$scope.propostas = await appHubFact.getPropostas();
			// $scope.financeiro = await appHubFact.getFinanceiro();
			// $scope.recomendacoes = await appHubFact.getRecomendacoes();
			$rootScope.loadingAll = false;
			$scope.$apply();
		};
	}
);
