$("#personal-med").on("click", function(e) {
    //obtenemos los datos del personal medico registrado
    ChangeClassActive($("#personal-med"), "pmed");
    HideModalsF("otros");
    GetPersonalMedico(0, false, false);
    $(".pass").show();
    $(".user").show();
    $('#modal-add-personalmed').modal({backdrop: 'static', keyboard: false});
});

$("#save-item-med").on("click", function(e) {
    e.preventDefault();
    var nombre = $("#nomb_personal").val();
    var ape_pat = $("#ape_pat").val();
    var ape_mat = $("#ape_mat").val();
    var SelectTitulo = $("#SelectTitulo option:selected").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var confirm_password = $("#confirm-password").val();

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

    if(_.isEmpty(SelectTitulo)){
        alertify.error("El campo 'Titulo' es obligatorio");
        return false;
    }

    if(_.isEmpty(username)){
        alertify.error("El campo 'Usuario' es obligatorio");
        return false;
    }

    if(_.isEmpty(password)){
        alertify.error("El campo 'Password' es obligatorio");
        return false;
    }

    if(_.isEmpty(confirm_password)){
        alertify.error("El campo 'Confirmar Password' es obligatorio");
        return false;
    }else if(confirm_password !== password ){
        alertify.error("Las contraseñas no son iguales..");
        return false;
    }

    var obj = {
        'nombre':nombre,
        'apellido_pat':ape_pat,
        'apellido_mat':ape_mat,
        'titulo':SelectTitulo,
        'username':username,
        'password':password
    };

    addItemWImage(obj);
});

$("#upd-item-med").on("click", function(e) {
    e.preventDefault();
    var nombre = $("#nomb_personal").val();
    var ape_pat = $("#ape_pat").val();
    var ape_mat = $("#ape_mat").val();
    var SelectTitulo = $("#SelectTitulo option:selected").val();
    var username = $("#username").val();

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

    if(_.isEmpty(SelectTitulo)){
        alertify.error("El campo 'Titulo' es obligatorio");
        return false;
    }

    var obj = {
        'nombre':nombre,
        'apellido_pat':ape_pat,
        'apellido_mat':ape_mat,
        'titulo':SelectTitulo,
        'IdDoc' : IDoc
    };
    Pace.restart();
    Pace.track(function () {
        $.ajax({
            method: "POST",
            url: "CallsWeb/PersonalMedico/UpdatePMedico.php",
            dataType: "JSON",
            data: {obj:obj},
            success: function (data) {
                if(parseInt(data.code) == 200){
                    IDoc = 0;
                    alertify.success(data.response);
                    CleanModalAddPersMed();
                    GetPersonalMedico(0, false, false);
                }else{
                    alertify.error(data.response);
                }
            }
        });
    });
});

$("#tbl_personalmed").on("click", ".btn-update-pmed", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    $(".pass").hide();
    $(".user").hide();
    GetPersonalMedico(id, true, false);
});

$("#tbl_personalmed").on("click", ".btn-del-pmed", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    alertify.confirm('Eliminar Registros', 'Desea Eliminar este Registro', function(){ 
        DelPersonalMedico(id, true);
    }, function(){ 
        alertify.error('Se cancelo la accion..');
    });
});

$("#modal-add-personalmed").on("click",".close", function() {
    CleanModalAddPersMed();
});

$("#clean-item-med").on("click", function(e) {
    e.preventDefault();
    CleanModalAddPersMed();
    $(".pass").show();
    $(".user").show();
    GetPersonalMedico(0, false, false);
});

function CleanModalAddPersMed(){
    $("#nomb_personal").val("");
    $("#ape_mat").val("");
    $("#ape_pat").val("");
    $("#username").val("");
    $("#password").val("");
    $("#confirm-password").val("");
    $(".pass").hide();
    $(".user").hide();
    $("#SelectTitulo").val(0).change();
    $("#upd-item-med").hide();
    $("#save-item-med").show();
    $("#tbl_personalmed").DataTable().destroy();
    $("#tbl_personalmed tbody").html("");
    //llamamos la funcion para obtener los registros de la tabla de personal medico
}

function addItemWImage (obj) {
    if(_.isEmpty($("#FileImage").val())){
        alertify.error("No se selecciono una imagen para este registro");
        SendDataPMedico(obj);
    }else{
        var file = document.getElementById("FileImage").files[0];
        var imagefile = file.type;
        var match = ["image/jpeg", "image/png", "image/jpg"];
        if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
            alertify.error("Formato de Imagen Erroneo..");
            return false;
        } else {
            SendFormdata(obj);
        }
    }
}

function SendDataPMedico(obj) {
    Pace.restart();
    Pace.track(function () {
        $.ajax({
            method: "POST",
            url: "CallsWeb/PersonalMedico/InsPersonalMed.php",
            dataType: "JSON",
            data: {obj:obj},
            success: function (data) {
                if(parseInt(data.code) == 200){
                    alertify.success(data.response);
                    CleanModalAddPersMed();
                    GetPersonalMedico(0, false, false);
                }else{
                    alertify.error(data.response);
                }
            }
        });
    });
}

function SendFormdata(obj) {
    Pace.restart();
    Pace.track(function () {
        var formData = new FormData();
        
        formData.append("nombre", obj.nombre);
        formData.append("apellido_pat", obj.apellido_pat);
        formData.append("apellido_mat", obj.apellido_mat);
        formData.append("titulo", obj.titulo);
        formData.append("username", obj.username);
        formData.append("password", obj.password);

        formData.append(
            "PostImage", document.getElementById("FileImage").files[0]
        ); 
        $.ajax({
            url: "CallsWeb/PersonalMedico/InsPersonalMedImg.php",
            type: "POST",
            data:formData,
            contentType: false,
            cache: false,
            processData: false,
            dataType: "JSON",
            success: function(data){
                console.log("data", data);
            }
        });
    });
}

$('#FileImage').change(function(){
    var input = this;
    var url = $(this).val();
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    var types_img = ["png","jpeg","jpg"];
    if (input.files && input.files[0] && (types_img.indexOf(ext) >= 0)){
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.card-img-top').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }else{
        $('.card-img-top').attr('src', 'images/not-found.png');
        alertify.error("Formato de Imagen Erroneo..");
    }
});