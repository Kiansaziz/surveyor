<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));



if($type == 'dataMainPesanKhusus')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id       = $DecodedDataArray->data->id;
     $proses   = $conn->query("SELECT tbl_pesan_khusus.*, (tbl_user.nama) as dari FROM tbl_pesan_khusus INNER JOIN tbl_user ON tbl_pesan_khusus.dari=tbl_user.id WHERE tbl_pesan_khusus.kepada = '$id'");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
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

if ($type == 'responsePesanKhusus') {
  $post        = json_decode(file_get_contents("php://input"));
  $id          = $conn->real_escape_string(isset($post->id) ? $post->id : '');
  $query      = "UPDATE tbl_pesan_khusus SET response = '1' WHERE id = '$id'";
  if ($conn->query($query)) {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Membaca Data"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Membaca Data"}';
  }
  echo $outp;
}




if($type == 'dataMainPesanBroadcast')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $level    = $DecodedDataArray->data->level;
     $proses   = $conn->query("SELECT tbl_pesan_broadcast.*, (tbl_user.nama) as dari FROM tbl_pesan_broadcast
                                INNER JOIN tbl_user ON tbl_pesan_broadcast.dari=tbl_user.id WHERE tbl_pesan_broadcast.kepada LIKE '%$level%'
                                AND tbl_pesan_broadcast.mulai <= '$nowshort' AND tbl_pesan_broadcast.selesai >= '$nowshort'");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
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




if($type == 'dataPesanKhusus')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $id       = $DecodedDataArray->data->id;
     $proses = $conn->query("SELECT tbl_pesan_khusus.*, (tbl_user.nama) AS pengirim FROM tbl_pesan_khusus INNER JOIN tbl_user ON tbl_pesan_khusus.dari=tbl_user.id WHERE tbl_pesan_khusus.dari = '$id' OR tbl_pesan_khusus.kepada='$id'");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
         $queryPenerima = $conn->query("SELECT nama FROM tbl_user WHERE id = '$rs->kepada'")->fetch_array();
         $rs->penerima = $queryPenerima['nama'];
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



if($type == 'insertPesanKhusus')
{
  $post   = json_decode(file_get_contents("php://input"));
  $jwt    = $conn->real_escape_string($post->token);
  $kepada = $conn->real_escape_string(isset($post->kepada) ? $post->kepada : '');
  $isi    = $conn->real_escape_string(isset($post->isi) ? $post->isi : '');
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $dari     = $DecodedDataArray->data->id;
     $query    = "INSERT INTO tbl_pesan_khusus VALUES ('', '$dari', '$kepada', '$isi', '0', NOW())";
     $runQuery = $conn->query($query);

     if ($runQuery) {
       $outp .= '{"status":"success",';
       $outp .= '"keterangan":"Berhasil Memasukan Data"}';
     } else {
       $outp .= '{"status":"error",';
       $outp .= '"keterangan":"Gagal Memasukan Data"}';
     }

  } catch (Exception $e) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Memproses Data"}';
  }
  echo $outp;
}



if ($type == 'delete') {
  $post        = json_decode(file_get_contents("php://input"));
  $id          = $conn->real_escape_string(isset($post->id) ? $post->id : '');
  $tabel       = $conn->real_escape_string(isset($post->tabel) ? $post->tabel : '');
  $query      = "DELETE FROM $tabel WHERE id = '$id'";
  if ($conn->query($query)) {
    $outp .= '{"status":"success",';
    $outp .= '"keterangan":"Berhasil Menghapus Data"}';
  } else {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Menghapus Data"}';
  }
  echo $outp;
}


?>
