(function($){

    $.plupload_anexo = function (parameters) {

        var parametersDefaults = {
            'condicao'      : 0,
            'obrigatorio'   : 0,
            'tam'           : '10mb',
            'li_class'      : '',
            'input_class'   : '',
            'input_type'    : 'text',
            'id_span'       : 'removerArquivos',
            'span_class'    : '',
            'readonly'      : 'true',
            'extensions'    : '*'
        };
        parameters = $.extend (parametersDefaults, parameters);

        if (parameters.condicao == 1) {
            var multi = false;
        } else {
            var multi = true;
        }

        var codigo = {
            runtimes : 'html5,html4',
            browse_button : parameters.browser,
            drop_element : parameters.container,
            container : document.getElementById(parameters.container),
            url : parameters.url,
            rename : false,
            dragdrop : true,
            multi_selection: multi,
            filters : {
                max_file_size : parameters.tam,
                mime_types: [
                    {title : "Arquivos", extensions : parametersDefaults.extensions}
                ]
            },
            init : {
                PostInit : function(up, file) {
                    $('#'+parameters.uploader).html();
                    $('#'+parameters.btn_salva).click(function() {
                        var ul_itens = $('#'+parameters.uploader)[0].childElementCount;
                        if (parameters.obrigatorio == 1) {
                            if(ul_itens>0) {
                                window["nome_plupload_"+parameters.nome_plupload].start();
                            } else {
                                valida_campos(parameters.e);
                                alert('Anexo obrigat\u00f3rio!');
                            }
                        } else {
                            if(ul_itens>0) {
                                window["nome_plupload_"+parameters.nome_plupload].start();
                            } else {
                                parameters.salvar();
                            }
                        }
                    });
                },

                FilesAdded : function(up, files) {
                    var files_arquivos = '';
                    plupload.each(files, function(file, index) {
                        var cond = parameters.condicao;
                        var obg = parameters.obrigatorio;
                        if (cond == 1) {
                            $('#'+parameters.uploader).html(
                                '<li class="'+parameters.removefiles+' '+parameters.li_class+'" id="'+parameters.id_li+file.id+'">'+
                                    '<input type="'+parameters.input_type+'" value="'+ file.name +' (' + plupload.formatSize(file.size) + ')" class="'+parameters.input_class+'" readonly="'+parameters.readonly+'" />'+
                                    '<a id="'+parameters.id_span+'" data-index="'+$('.'+parameters.removefiles).length+'" class="'+parameters.span_class+' btn_remove_group" onclick="removerArquivos(\''+parameters.nome_plupload+'\', \''+parameters.id_li+'\', \''+file.id+'\', \''+parameters.id_span+'\', \''+up.files.length+'\')">'+
                                        '<span class="icon-remove"></span>'+
                                    '</a><b id="b_'+file.id+'"></b>'+
                                '</li>'
                            );
                        } else {
                           $('#'+parameters.uploader).append(
                                '<li class="'+parameters.removefiles+' '+parameters.li_class+'" id="'+parameters.id_li+file.id+'">'+
                                        '<input type="'+parameters.input_type+'" value="'+ file.name +' (' + plupload.formatSize(file.size) + ')" class="'+parameters.input_class+'" readonly="'+parameters.readonly+'" />'+
                                        '<a id="'+parameters.id_span+'_'+file.id+'" data-index="'+$('.'+parameters.removefiles).length+'" class="'+parameters.span_class+' btn_remove_group" onclick="removerArquivos(\''+parameters.nome_plupload+'\', \''+parameters.id_li+'\', \''+file.id+'\', \''+parameters.id_span+'\', \''+up.files.length+'\')">'+
                                            '<span class="icon-remove"></span>'+
                                        '</a><b id="b_'+file.id+'"></b>'+
                                '</li>'
                            );
                        }
                        if (obg == 1) {
                            $('#'+parameters.browser).attr('disabled', 'enabled');
                            $('#'+parameters.btn_salva).removeAttr('disabled');
                            up.disableBrowse(true);
                        }
                    });
                },

                UploadProgress : function(up, file) {
                    $('#b_'+file.id).html('<span>' + file.percent + '%</span>');
                },
                UploadComplete : function(up, file) {

                    var cond = parameters.condicao;
                    window["nome_plupload_"+parameters.nome_plupload].files.splice(0, file.length);
                    parameters.salvar();
                },
                Error : function(up, err) {
                    if (err.code==-601) {
                        alert("Tipo de arquivo n\u00e3o permitido.");
                    } else if (err.code==-600) {
                        alert("Seu arquivo excedeu o limite permitido de 10 mb.\nFavor reduzir a um tamanho m\u00e1ximo de 10 mb.");
                    } else {
                        alert(err.code+" : "+err.message);
                    }
                    /*document.getElementById('console').appendChild(document.createTextNode('\nError #' + err.code + ': ' + err.message));*/
                },
                FileUploaded: function(Up, File, Response) {
                    var cond = parameters.condicao;
                    if (cond == 1) {
                        var a = $('#'+parameters.adicionar).val();
                        if (a=="") {
                            a = a + Response['response'];
                            $('#'+parameters.adicionar).val(a);
                        }
                    } else {
                        var a = $('#'+parameters.adicionar).val();
                        if (a=="") {
                            a = a + Response['response'];
                            $('#'+parameters.adicionar).val(a);
                        } else {
                            a = a +','+ Response['response'];
                            $('#'+parameters.adicionar).val(a);
                        }
                    }
                }
            }
        };

        eval("nome_plupload_"+parameters.nome_plupload+" = new plupload.Uploader(codigo);");
        window["nome_plupload_"+parameters.nome_plupload].init();

        removerArquivos = function(params, id_li, id, spanid, length) {
            var cond = parameters.condicao;
            var obg = parameters.obrigatorio;
            if (cond == 1) {
                window["nome_plupload_"+params].files.splice(0, length);
                $('#'+id_li+id).remove();
            } else {
                var var_aux = $('#'+spanid+'_'+id).data('index');

                window["nome_plupload_"+params].files.splice(var_aux, 1);

                $('#'+id_li+id).remove();

                $("[id*='"+spanid+"_']").each(function(i, j) {
                    $('#'+j.id).data('index', i);
                });
            }
            if (obg == 1) {
                $('#'+parameters.browser).removeAttr('disabled');
                $('#'+parameters.btn_salva).attr('disabled', 'disabled');
                window["nome_plupload_"+params].disableBrowse(false);
            }
        }
    };

})(jQuery);