
$(".add-bitacora").on("click", function(e) {
    e.preventDefault();
    $(".fec-bitacora").text(moment(new Date()).format("DD-MM-YYYY HH:mm:ss"));
    GetListCat(0, "Area", $(".SelectArea"));
    GetListCat(0, "LMed", $("#SelectMedicamento"));
    GetListCat(0, "Emp", $("#SelectEmpleado"));
    GetListCat(0, "Supervisor", $("#SelectSupervisor"));
    GetListCat(0, "ClasifBit", $("#SelectClasificacion"));
    GetPersonalMedico(0, false, true);
    $('#modal-add-bitacora').modal({backdrop: 'static', keyboard: false});
});

//add-supervisor
$(".add-supervisor").on("click", function(e) {
    e.preventDefault();
    $("#modal-add-bitacora").hide();
    alertify.prompt( 'Agregar un Supervisor', 'Supervisor', 'Supervisor', function(evt, value) {
        if(value !== 'Supervisor'){
            
            var obj = {
                'val':value,
                'cat':'Supervisor'
            }

            AddCatalog(obj, $("#modal-add-bitacora"));

        }else{
            alertify.error("Debe de capturar un valor diferente al de default..");
        }
        $("#modal-add-bitacora").show();    
    }, function() { 
        alertify.error('Cancel');
        $("#modal-add-bitacora").show();
    });
});

$(".add-clasif").on("click", function(e) {
    e.preventDefault();
    $("#modal-add-bitacora").hide();
    alertify.prompt( 'Agregar una Clasificacion', 'Clasificacion', 'Clasificacion', function(evt, value) {
        if(value !== 'Clasificacion'){
            
            var obj = {
                'val':value,
                'cat':'ClasifBit'
            }

            AddCatalog(obj, $("#modal-add-bitacora"));

        }else{
            alertify.error("Debe de capturar un valor diferente al de default..");
        }
        $("#modal-add-bitacora").show();    
    }, function() { 
        alertify.error('Cancel');
        $("#modal-add-bitacora").show();
    });
});




