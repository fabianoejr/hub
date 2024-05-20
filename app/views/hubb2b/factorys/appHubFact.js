appHub.factory("appHubFact", function ($http) {
	return {
		getDadosEmpresa: function () {
			var promise = $http.get("/hub/Hub_b2b/getDadosEmpresa/").then(
				function (response) {
					return response.data;
				},
				function (error) {
					console.error(error);
				}
			);
			return promise;
		},
		getPropostas: function () {
			var promise = $http.get("/hub/Hub_b2b/getPropostas/").then(
				function (response) {
					return response.data;
				},
				function (error) {
					console.error(error);
				}
			);
			return promise;
		},
		getFinanceiro: function () {
			var promise = $http.get("/hub/Hub_b2b/getFinanceiro/").then(
				function (response) {
					return response.data;
				},
				function (error) {
					console.error(error);
				}
			);
			return promise;
		},
		getRecomendacoes: function () {
			var promise = $http.get("/hub/Hub_b2b/getRecomendacoes/").then(
				function (response) {
					return response.data;
				},
				function (error) {
					console.error(error);
				}
			);
			return promise;
		},
		buscarListaClientes: function (busca = {}) {
			var promise = $http
				.post(
					"/portais/colaborador_novo/index.php/Propostas_Informativos/buscarListaClientes",
					{ busca: busca }
				)
				.then(
					function (response) {
						return response.data;
					},
					function (error) {
						console.error(error);
					}
				);
			return promise;
		},
	};
});
