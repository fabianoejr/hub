<div id="modalUnidadeProj" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalUnidadeProjLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalUnidadeProjLabel">Vincular Cliente</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <p>Busque por um cliente para vincular:</p>
                        <input type="text" 
                            class="form-control" 
                            placeholder="Buscar (Digite min 3 caracteres)" 
                            ng-model="searchMuni" 
                            ng-model-options="{ debounce: 500 }" 
                            ng-change="buscaListaClientes(searchMuni)"
                        >
                        <hr>

                        <div ng-show="loading" style="text-align: center;">
                            <?php echo img(array('src'=>'assets_novo/img/load_satc.gif')); ?>
                        </div>

                        <table class="table" ng-show="loading == false && listaClientes.length > 0">
                            <thead class="thead-default">
                            <tr>
                                <th style="text-align: center; vertical-align: middle;">Cód.</th>
                                <th style="vertical-align: middle;">Nome</th>
                                <th style="text-align: center; vertical-align: middle;">Ação</th>
                            </tr>
                            </thead>
                            <tbody>

                                <tr dir-paginate="(key, value) in listaClientes|itemsPerPage:5" pagination-id="dir_unidades">
                                    <th scope="row" style="text-align: center; vertical-align: middle;">{{value.cnpj}}</th>
                                    <td style="vertical-align: middle;">{{value.nome}}</td>
                                    <td style="text-align: center; vertical-align: middle;">
                                        <button class="btn btn-success-outline waves-effect waves-light btn-sm" ng-click="vincularCliente(value)"><i class="fa fa-plus"></i></button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div class="col-md-12 col-sm-12" ng-show="listaClientes && listaClientes.length == 0">
                        <p style="text-align: center;">Nenhum unidade encontrada.</p>
                    </div>

                    <div class="col-md-12 col-sm-12">
                        <dir-pagination-controls pagination-id="dir_unidades"></dir-pagination-controls>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Fechar</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
