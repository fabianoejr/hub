<?php
    header("Content-type: text/javascript");
    $base  = $_GET["base"];
?>
function call_valor(caminho, dados)
{
/*, contentType: 'application/x-www-form-urlencoded; charset=ISO-8859-1'*/
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
                alert('Erro: tente novamente.');
            }
          }
    });
    return retorno;
}

function envia_formulario(caminhoSalvar, dados, caminhoRetorno, msg)
{
    var retorno="";
    var confere=0;
    var erro="";

    $.ajax({ 
            type:"POST"
            , cache:false
            , async:false
            , datatype:"html"
            , data:dados
            , global:false
            , url:'<?php echo $base; ?>/'+caminhoSalvar
            , success:function(data) { 
                        confere=1;
                        retorno=data;
                      }
             ,error: function(XMLHttpRequest) {
                         erro = XMLHttpRequest.responseText;
                      }
    });

    if (confere==1 && msg==1)
    {
        alert("Salvo com Sucesso!");
    }   
    else if (confere==0 && erro!="")
    {
        alert("Houve erro ao Salvar!\n------------------------------------\n: "+erro);
    }
    
    if (caminhoRetorno!="" && caminhoRetorno!="undefined" && confere==1)
    {
        var js = caminhoRetorno.indexOf("javascript");
        if (js>-1)
        {
            eval(caminhoRetorno);
        }
        else
        {
            location.href = '<?php echo $base; ?>/'+caminhoRetorno;
        }

    }
    return retorno;
}

function redirect(pagina)
{
    location.href = '<?php echo $base; ?>/'+pagina;
}