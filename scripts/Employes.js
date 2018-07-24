$("#empleados").on("click", function(e) {
    e.preventDefault();
    GetEmpleados(0, false, false);
    GetListCat(0, "Area", $(".SelectArea"));
    GetListCat(0, "depto", $("#sel_dpto"));

    $('#antiguedad').datepicker({
        uiLibrary: 'bootstrap4'
    });
    
    $('#modal-add-empleados').modal({backdrop: 'static', keyboard: false});
});

$(".add-area").on("click", function(e) {
    e.preventDefault();
    console.log('e', e);
    $("#modal-add-empleados").hide();
    alertify.prompt( 'Agregar un Area de Trabajo', 'Area de Trabajo', 'Area de Trabajo', function(evt, value) {
        if(value !== 'Area de Trabajo'){
            
            var obj = {
                'area':value
            }

            AddArea(obj, $("#modal-add-empleados"));

        }else{
            alertify.error("Debe de capturar un valor diferente al de default..");
        }
        $("#modal-add-empleados").show();    
    }, function() { 
        alertify.error('Cancel');
        $("#modal-add-empleados").show();
    });
});

$(".add-emp-dpto").on("click", function(e) {
    e.preventDefault();
    console.log('e', e);
    $("#modal-add-empleados").hide();
    alertify.prompt( 'Agregar un Depto de Trabajo', 'Depto. de Trabajo', 'Depto. de Trabajo', function(evt, value) {
        if(value !== 'Depto. de Trabajo'){
            
            var obj = {
                'val':value,
                'cat':'depto'
            }

            AddCatalog(obj, $("#modal-add-empleados"));

        }else{
            alertify.error("Debe de capturar un valor diferente al de default..");
        }
        $("#modal-add-empleados").show();    
    }, function() { 
        alertify.error('Cancel');
        $("#modal-add-empleados").show();
    });
});

$("#save-emp").on("click", function(e) {
    e.preventDefault();
    
    var num_emp = $("#num_emp").val();
    var nombre = $("#nomb_emp").val();
    var ape_pat = $("#ape_pat_emp").val();
    var ape_mat = $("#ape_mat_emp").val();
    var sel_area = $("#sel_area option:selected").val();
    var sexo = $("#sexo option:selected").val();
    var sel_dpto = $("#sel_dpto option:selected").val();
    var actividad = $("#actividad").val();
    var antiguedad = $("#antiguedad").val();

    if(_.isEmpty(num_emp)){
        alertify.error("El campo 'Numero de Empleado' es obligatorio");
        return false;
    }
    
    if(_.isEmpty(nombre)){
        alertify.error("El campo 'Nombre' es obligatorio");
        return false;
    }

    if(_.isEmpty(ape_pat)){
        alertify.error("El campo 'Apellido Paterno' es obligatorio");
        return false;
    }

    if(_.isEmpty(ape_mat)){
        alertify.error("El campo 'Apellido Materno' es obligatorio");
        return false;
    }

    if(_.isEmpty(sel_area)){
        alertify.error("El campo 'Area' es obligatorio");
        return false;
    }

    if(_.isEmpty(sexo)){
        alertify.error("El campo 'Sexo' es obligatorio");
        return false;
    }

    if( parseInt(sel_dpto) === 0 ){
        alertify.error("El campo 'Departamento' es obligatorio");
        return false;
    }

    if(_.isEmpty(actividad)){
        alertify.error("El campo 'Actividad' es obligatorio");
        return false;
    }

    if(_.isEmpty(antiguedad)){
        alertify.error("El campo 'Antiguedad' es obligatorio");
        return false;
    }


    var obj = {
        'num_emp':num_emp,
        'nombre':nombre,
        'apellido_pat':ape_pat,
        'apellido_mat':ape_mat,
        'area':sel_area,
        'sexo':sexo,
        'depto':sel_dpto,
        'actividad':actividad,
        'antiguedad':antiguedad
    }
    
    $.ajax({
        method: "POST",
        url: "CallsWeb/Empleados/InsEmpleados.php",
        dataType: "JSON",
        data: {obj},
        success: function (data) {
            if(parseInt(data.code) == 200){
                alertify.success(data.response);
                CleanModalAddEmpleados();
                GetEmpleados(0, false, false);
            }else{
                alertify.error(data.response);
            }
        }
    });

});

$("#upd-emp").on("click", function(e) {
    e.preventDefault();

    var num_emp = $("#num_emp").val();
    var nomb_emp = $("#nomb_emp").val();
    var ape_pat_emp = $("#ape_pat_emp").val();
    var ape_mat_emp = $("#ape_mat_emp").val();
    var sel_area = $("#sel_area option:selected").val();
    var sexo = $("#sexo option:selected").val();
    var sel_dpto = $("#sel_dpto option:selected").val();
    var actividad = $("#actividad").val();
    var antiguedad = $("#antiguedad").val();

    if(_.isEmpty(num_emp)){
        alertify.error("El campo 'Num. de Empleado' es obligatorio");
        return false;
    }

    if(_.isEmpty(nomb_emp)){
        alertify.error("El campo 'Nombre' es obligatorio");
        return false;
    }

    if(_.isEmpty(ape_pat_emp)){
        alertify.error("El campo 'Apellido Paterno' es obligatorio");
        return false;
    }

    if(_.isEmpty(ape_mat_emp)){
        alertify.error("El campo 'Apellido Materno' es obligatorio");
        return false;
    }

    if(_.isEmpty(sel_area)){
        alertify.error("El campo 'Area' es obligatorio");
        return false;
    }

    if(_.isEmpty(sexo)){
        alertify.error("El campo 'Sexo' es obligatorio");
        return false;
    }

    if( parseInt(sel_dpto) === 0 ){
        alertify.error("El campo 'Departamento' es obligatorio");
        return false;
    }

    if(_.isEmpty(actividad)){
        alertify.error("El campo 'Actividad' es obligatorio");
        return false;
    }

    if(_.isEmpty(antiguedad)){
        alertify.error("El campo 'Antiguedad' es obligatorio");
        return false;
    }


    var obj = {
        'num_emp':num_emp,
        'nombre':nomb_emp,
        'apellido_pat':ape_pat_emp,
        'apellido_mat':ape_mat_emp,
        'area':sel_area,
        'sexo':sexo,
        'depto':sel_dpto,
        'actividad':actividad,
        'antiguedad':antiguedad,
        'IdEmp': IEmp
    }

    $.ajax({
        method: "POST",
        url: "CallsWeb/Empleados/UpdateEmpleados.php",
        dataType: "JSON",
        data: {obj},
        success: function (data) {
            if(parseInt(data.code) == 200){
                IDoc = 0;
                alertify.success(data.response);
                CleanModalAddEmpleados();
                GetEmpleados(0, false, false);
            }else{
                alertify.error(data.response);
            }
        }
    });
});

$(".add-emp-area").on("click", function(e) {
    e.preventDefault();
    console.log('e', e);
    $("#modal-add-empleados").hide();
    alertify.prompt( 'Agregar un Area de Trabajo', 'Area de Trabajo', 'Area de Trabajo', function(evt, value) {
        if(value !== 'Area de Trabajo'){
            
            var obj = {
                'area':value,
            }

            AddArea(obj, $("#modal-add-empleados"));

        }else{
            alertify.error("Debe de capturar un valor diferente al de default..");
        }
        $("#modal-add-empleados").show();    
    }, function() { 
        alertify.error('Cancel');
        $("#modal-add-empleados").show();
    });
});

$("#tbl_emp").on("click", ".btn-update-emp", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    GetEmpleados(id, true, false);
});

$("#tbl_emp").on("click", ".btn-del-emp", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    alertify.confirm('Eliminar Registros', 'Desea Eliminar este Registro', function(){ 
        DelEmpleados(id, true);
    }, function(){ 
        alertify.error('Se cancelo la accion..')
    });
});

$("#clean-emp").on("click", function(e) {
    e.preventDefault();
    CleanModalAddEmpleados();
    GetEmpleados(0, false, false);
    GetListCat(0, "Area", $(".SelectArea"));
});

$(".close-mod-emp").on("click", function(e) {
    e.preventDefault();
    CleanModalAddEmpleados();
});

//upload csv
$('#UploadCSV').change(function(evt){
    var input = this;
    var url = $(this).val();
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    var types_img = ["csv"];
    var btn = $(this);    
    btn.prop('disabled', true);

    if (input.files && input.files[0] && (types_img.indexOf(ext) >= 0)){
        //procedemos a procesar el csv

        var file = input.files[0], data = [];
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                data = results.data;
                SendData(data, btn);
            }
        });

    }else{
        alertify.error("Formato de archivo seleccionado es incorrecto..");
        btn.prop('disabled', false);
    }
});