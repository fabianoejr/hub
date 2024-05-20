jQuery.fn.desabilita_campo = function(){
    return this.each(function(){
        $(this).attr("readonly","true").addClass("uneditable-input");
    });
};