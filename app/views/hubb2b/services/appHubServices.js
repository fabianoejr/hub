appHub.service("modeloSelecionado", function () {
	var modelo_id = "2";
	return {
		getModeloId: function () {
			return modelo_id;
		},
		setModeloId: function (value) {
			modelo_id = value;
		},
	};
});
