// routes
appHub.config(function ($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "dashboard",
		controller: "appHubCtlr",
	});
});
