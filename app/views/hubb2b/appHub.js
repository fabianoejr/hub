var appHub = angular.module("appHub", [
	"ngRoute",
	"angularUtils.directives.dirPagination",
]);

appHub.filter("telefone", function () {
	return function (phoneNumber) {
		if (!phoneNumber) return "";

		phoneNumber = phoneNumber.replace(/\D/g, "");

		// Formata o número no padrão (xx) xxxx-xxxx
		phoneNumber = phoneNumber.replace(/^(\d{2})(\d)/g, "($1) $2");
		phoneNumber = phoneNumber.replace(/(\d)(\d{4})$/, "$1-$2");

		return phoneNumber;
	};
});

appHub.directive("tooltip", function () {
	return {
		restrict: "A",
		link: function (scope, element) {
			element.hover(
				function () {
					element.tooltip("show");
				},
				function () {
					element.tooltip("hide");
				}
			);
		},
	};
});

appHub.config(function (paginationTemplateProvider) {
	paginationTemplateProvider.setPath(
		"/hub/assets_novo/js/dirPaginationUplon.tpl.html"
	);
});

appHub.run(function ($rootScope) {
	$rootScope.$on("$routeChangeStart", function () {
		$("[tooltip]").tooltip("hide");
	});
});

$("#myTabaltSubmeterExt a").click(function (e) {
	e.preventDefault();
	$(this).tab("show");
});
