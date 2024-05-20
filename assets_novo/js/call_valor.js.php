<?php
    header("Content-type: text/javascript");
    $base  = $_GET["base"];
?>
function call_valor(caminho, dados)
{
    retorno = '';
    $.ajax({
        type:"POST"
        , cache:false
        , async:false
        , global:false
        , datatype:"html"
        , data:dados
        , url:'<?php echo $base; ?>/'+caminho
        , success:
            function(txt) {
                retorno = $.trim(txt);
            }
        , statusCode: {
            404: function() {
              alert('Pagina nao encontrada');
            },
            500: function() {
                alert('N\u00e3o foi poss\u00edvel completar a a\u00e7\u00e3o.');
            }
          }
    });
    return retorno;
}

function redirect(pagina)
{
    if (parent.frames['footer'])
    {
        parent.frames['footer'].location.reload();
    }
    location.href = '<?php echo $base; ?>/'+pagina;
}

function redirect_paginacao(link, parametros_tabela_pesquisa)
{
    var pagina = "";
    var search = "";
    if (parametros_tabela_pesquisa=="")
    {
        if ($('#tabela_basica')[0])
        {
            var oTable = $('#tabela_basica').dataTable();
            pagina = oTable.fnPagingInfo().iPage;
            search = oTable.fnSettings().oPreviousSearch.sSearch;
        }
    }
    else
    {
        var data = new Object();
        data = parametros_tabela_pesquisa;
        pagina = data.nr_pagina;
        search = data.search;
    }
    if (link.indexOf("?")>-1)
    {
        redirect(link+"&nr_pagina="+pagina+"&search="+search);
    }
    else
    {
        redirect(link+"?nr_pagina="+pagina+"&search="+search);
    }
}

function abrirRelatorio(caminho)
{
    window.open(
        '<?php echo $base; ?>/relatorios/abre_relatorio?url='+caminho,
        '_blank',
        'height='+screen.availHeight+',width='+screen.width+',top=0,left=0,status=yes,scrollbars=yes,resizable=yes'
    );
}