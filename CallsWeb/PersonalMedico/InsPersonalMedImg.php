<?php
include_once("../../db/db.php");

ini_set("memory_limit","1024M");
set_time_limit(0);
ini_set('upload_max_filesize', '500M');
ini_set('post_max_size', '500M');
ini_set('max_input_time', 4000); // Play with the values
ini_set('max_execution_time', 4000); // Play with the values

$DB = new DAO();
$conn = $DB->getConnect();
$response = [];

$nombre = $_POST["nombre"];
$apellido_pat = $_POST["apellido_pat"];
$apellido_mat = $_POST["apellido_mat"];
$titulo = $_POST["titulo"];
$username = $_POST["username"];
$password = $_POST["password"];
$rutaImagenes = "../../images/ImgsPMed/";

//var_dump($_POST);
//die();

if (GetPersMedExists($nombre, $apellido_pat, $apellido_mat, $titulo, $username)) {
	$response["status"] = "ERROR";
	$response["code"] = "500";
	$response["response"] = "Ya existe un un registro con la informacion que esta tratando de enviar..";
	echo json_encode($response);
}else{
	if (isset($_FILES["PostImage"]["type"])) {
		$validextensions = array(
			"jpeg",
			"jpg",
			"png"
		);
		$temporary       = explode(".", $_FILES["PostImage"]["name"]);
		$file_extension  = end($temporary);
		if ( (($_FILES["PostImage"]["type"] == "image/png") || 
			  ($_FILES["PostImage"]["type"] == "image/jpg") || 
			  ($_FILES["PostImage"]["type"] == "image/jpeg")) && 
			  (in_array($file_extension, $validextensions)) ) {
			if ($_FILES["PostImage"]["error"] > 0) {
				//echo "Return Code: " . $_FILES["PostImage"]["error"] . "<br/><br/>";
			} else {
				$imageName = "Profile_File_" . generateRandomString() . "." . $file_extension;
				$sourcePath = $_FILES['PostImage']['tmp_name'];
				if (is_writable($sourcePath)) {
					if (!file_exists($rutaImagenes)) {
						mkdir($rutaImagenes, 0777, true);
					}
					if (file_exists($rutaImagenes)) {
						$rutaActual=getcwd();
						$targetPath = $rutaImagenes . $imageName;
						if (move_uploaded_file($sourcePath, $targetPath)) {
							//Insertamos el registro con el path
							if(InsPMedico($nombre, $apellido_pat, $apellido_mat, $titulo, $username, $password, $targetPath)){
								$response["status"] = "SUCCESS";
								$response["code"] = "200";
								$response["rutaActual"] = getcwd();
								$response["Img"] = "images/ImgsPMed/".$imageName;
								$response["response"] = "No se encontro la ruta para almacenar la imagen";
								echo json_encode($response);
							}else{
								$response["status"] = "ERROR";
								$response["code"] = "500";
								$response["response"] = "Hubo un problema al guardar la informacion en la base de datos..";
								echo json_encode($response);
								chdir($rutaActual);
							}
						}else{
							//mandamos error 500
							$response["status"] = "ERROR";
							$response["code"] = "500";
							$response["response"] = "Hubo un problema al cargar la imagen";
							echo json_encode($response);
							chdir($rutaActual);
						}
					} else {
						$response["status"] = "ERROR";
						$response["code"] = "500";
						$response["rutaActual"] = getcwd();
						$response["rutaImagenes"] = $rutaImagenes;
						$response["response"] = "No se encontro la ruta para almacenar la imagen";
						echo json_encode($response);
					}
				} else {
					$response["status"] = "ERROR";
					$response["code"] = "500";
					$response["response"] = "The file is not writable";
					echo json_encode($response);
				}
			}
		} else {
			$response["status"] = "ERROR";
			$response["code"] = "500";
			$response["response"] = "Formato no permitido..";
			echo json_encode($response);
		}
	}
}

function generateRandomString($length = 25) 
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) 
    {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function InsPMedico($nombre, $ape_pat, $ape_mat, $titulo, $username, $pass, $pathfile)
{
	$res = false;
	$DB = new DAO();
	$conn = $DB->getConnect();
	$createItemSQL="INSERT INTO enfdoctable(Nombre, ApellidoPaterno, ApellidoMaterno, Titulo, Usuario, Password, PathImg, CreatedAt) 
	VALUES(?, ?, ?, ?, ?, ?, ?, NOW());";
	if ($createItem = $conn->prepare($createItemSQL)) {
		$createItem->bind_param("sssssss", $nombre, $ape_pat, $ape_mat, $titulo, $username, $pass, $pathfile );
		if ($createItem->execute()) {
			$res = true;
		}else{
			echo "Ocurrio un error en la insercion" . $conn->error;
		}
	}
	return $res;
}

function GetPersMedExists($nombre, $ape_pat, $ape_mat, $titulo, $username)
{
	$DB = new DAO();
	$conn = $DB->getConnect();
	$res = false;
	//obtenemos un valor true o false si el area que intentamos registrar existe
	$query = "SELECT IdDoc 
			  FROM enfdoctable 
			  where 0=0
			  and Nombre = ? 
			  and ApellidoMaterno = ? 
			  and ApellidoPaterno = ? 
			  and Titulo = ? 
			  and Usuario = ? 
			  order by IdDoc desc limit 1;";

	if ($cmd = $conn->prepare($query)) {
	    $cmd->bind_param("sssss", $nombre,$ape_mat,$ape_pat,$titulo, $username);
	    if ($cmd->execute()) {
	        $cmd->store_result();
	        $cmd->bind_result($IdDoc);
	        $cont=0;
	        if($cmd->num_rows > 0){
	        	$res = true;
	        }
	    }
	}else{
	    echo "error ".$conn->error;
	}

	return $res;
}
?>