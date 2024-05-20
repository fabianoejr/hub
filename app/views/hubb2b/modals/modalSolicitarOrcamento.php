<div id="modalSolicitarOrcamento" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalSolicitarOrcamentoLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalSolicitarOrcamentoLabel">Solicitar Orçamento</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <p>Se interessou? Solicite um orçamento com nossos vendedores!</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <img ng-src="{{orcamento_recomendacao.imagem}}" alt="{{orcamento_recomendacao.descricao}}">
                            <h5>{{orcamento_recomendacao.descricao}}</h5>
                            <p ng-bind-html="orcamento_recomendacao.detalhes"></p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div>
                            <label>Nome do Representante: <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" ng-model="dados_orcamento.nome">
                        </div>
                        <div>
                            <label>Email: <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" ng-model="dados_orcamento.email">
                        </div>
                        <div>
                            <label>Telefone: <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" ng-model="dados_orcamento.telefone">
                        </div>
                        <div>
                            <label>Informe os detalhes: </label>
                            <textarea class="form-control" ng-model="dados_orcamento.detalhes"></textarea>
                        </div>
                        <div>
                            <button  style="float: right; padding-top:10px;" type="button" class="btn btn-success waves-effect" data-dismiss="modal">Solicitar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Fechar</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->