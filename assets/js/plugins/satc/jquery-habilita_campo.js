jQuery.fn.habilita_campo = function(){
    return this.each(function(){
        $(this).removeAttr("readonly").removeClass("uneditable-input");
    });
};