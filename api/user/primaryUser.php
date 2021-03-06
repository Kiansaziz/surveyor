<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


// QUERY AWAL ATAU PRIMARY
if($type == 'profile')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $outp = $DecodedDataArray->data;
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}



if($type == 'ba')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id        = $DecodedDataArray->data->id;
     $query     = "SELECT * FROM tbl_user_kelurahan_ba WHERE id = '$id'";
     $run       = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}

if($type == 'observasi')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id        = $DecodedDataArray->data->id;
     $query     = "SELECT * FROM tbl_user_kelurahan_observasi WHERE id = '$id'";
     $run       = $conn->query($query);
     if ($run->num_rows != NULL) {
        $outp = $run->fetch_object();
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}


if($type == 'ba_c')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id        = $DecodedDataArray->data->id;
     $query     = "SELECT tbl_jwb_gb_a.nomor_kuesioner, tbl_jwb_gb_a.p101, tbl_jwb_gb_a.p102, tbl_jwb_gb_b.p201 FROM tbl_jwb_gb_a LEFT JOIN tbl_jwb_gb_b ON tbl_jwb_gb_a.nomor_kuesioner=tbl_jwb_gb_b.nomor_kuesioner WHERE tbl_jwb_gb_a.nomor_kuesioner LIKE '$id%'";
     $run       = $conn->query($query);
     if ($run->num_rows != NULL) {
       while($rs = $run->fetch_object()) {
           $outp[] = $rs;
       }
     } else {
       $outp[]=null;
     }
  } catch (Exception $e) {
    $outp[]=null;
  }
  echo json_encode($outp);
}
?>
