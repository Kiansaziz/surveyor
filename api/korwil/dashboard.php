<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));


if($type == 'kuesioner')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $korwil    = $DecodedDataArray->data->korwil;
     $proses = $conn->query("SELECT
                               COUNT(nomor_kuesioner) jumlah,
                               SUM(CASE WHEN valid_enumerator = '0' THEN 1 ELSE 0 END) enumerator,
                               SUM(CASE WHEN valid_data_entry = '0' THEN 1 ELSE 0 END) data_entry,
                               SUM(CASE WHEN valid_gabungan = '0' THEN 1 ELSE 0 END) hasil
                               FROM tbl_kuesioner
                               WHERE id_kab IN ($korwil)
                             ");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $outp = $rs;
       }
     } else {
       $outp=null;
     }
  } catch (Exception $e) {
    $outp=null;
  }
  echo json_encode($outp);
}



if($type == 'capaian_percent')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $korwil    = $DecodedDataArray->data->korwil;
     $proses = $conn->query("SELECT
                           	   tbl_kab.kabupaten,
                               SUM(CASE WHEN tbl_kuesioner.valid_enumerator = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS enumerator,
                               SUM(CASE WHEN tbl_kuesioner.valid_data_entry = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS data_entry,
                               SUM(CASE WHEN tbl_kuesioner.valid_gabungan = '0' THEN 1 ELSE 0 END) / COUNT(tbl_kuesioner.nomor_kuesioner) * 100 AS hasil
                               FROM tbl_kuesioner
                               LEFT JOIN tbl_kab ON tbl_kuesioner.id_kab=tbl_kab.id
                               WHERE tbl_kuesioner.id_kab IN ($korwil)
                               GROUP BY tbl_kuesioner.id_kab
                             ");
     if ($proses->num_rows > 0) {
       while($rs = $proses->fetch_object()) {
           $rs->target = 100;
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




if($type == 'capaian')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $korwil    = $DecodedDataArray->data->korwil;
     $proses = $conn->query("SELECT
                           	   tbl_kab.kabupaten,
                               COUNT(tbl_kuesioner.nomor_kuesioner) target,
                               SUM(CASE WHEN tbl_kuesioner.valid_enumerator = '0' THEN 1 ELSE 0 END) enumerator,
                               SUM(CASE WHEN tbl_kuesioner.valid_data_entry = '0' THEN 1 ELSE 0 END) data_entry,
                               SUM(CASE WHEN tbl_kuesioner.valid_gabungan = '0' THEN 1 ELSE 0 END) hasil
                               FROM tbl_kuesioner
                               INNER JOIN tbl_kab ON tbl_kuesioner.id_kab=tbl_kab.id
                               WHERE tbl_kuesioner.id_kab IN ($korwil)
                               GROUP BY tbl_kuesioner.id_kab
                             ");
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




if($type == 'jenis_kelamin')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $korwil    = $DecodedDataArray->data->korwil;
     $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_a.nomor_kuesioner) as value,
                                           tbl_jwb_gb_a.p105 as label
                                           FROM tbl_jwb_gb_a
                                           INNER JOIN tbl_kuesioner ON tbl_jwb_gb_a.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                           WHERE tbl_kuesioner.valid_gabungan = '0'
                                           AND tbl_kuesioner.id_kab IN ($korwil)
                                           GROUP BY tbl_jwb_gb_a.p105
                                           ");
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




if($type == 'profesi')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $korwil    = $DecodedDataArray->data->korwil;
     $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_b.nomor_kuesioner) as value,
                                           tbl_jwb_gb_b.p201 as label
                                           FROM tbl_jwb_gb_b
                                           INNER JOIN tbl_kuesioner ON tbl_jwb_gb_b.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                           WHERE tbl_kuesioner.valid_gabungan = '0'
                                           AND tbl_kuesioner.id_kab IN ($korwil)
                                           GROUP BY tbl_jwb_gb_b.p201
                                           ");
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




if($type == 'profesi_lain')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $korwil    = $DecodedDataArray->data->korwil;
     $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_b.nomor_kuesioner) as value,
                                           tbl_jwb_gb_b.p201x as label
                                           FROM tbl_jwb_gb_b
                                           INNER JOIN tbl_kuesioner ON tbl_jwb_gb_b.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                           WHERE tbl_kuesioner.valid_gabungan = '0'
                                           AND tbl_jwb_gb_b.p201 = 'Profesi Lainnya'
                                           AND tbl_kuesioner.id_kab IN ($korwil)
                                           GROUP BY tbl_jwb_gb_b.p201x
                                           ");
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




if($type == 'usia')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $korwil    = $DecodedDataArray->data->korwil;
     $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_a.nomor_kuesioner) as value,
                                           tbl_jwb_gb_a.p106 as label
                                           FROM tbl_jwb_gb_a
                                           INNER JOIN tbl_kuesioner ON tbl_jwb_gb_a.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                           WHERE tbl_kuesioner.valid_gabungan = '0'
                                           AND tbl_kuesioner.id_kab IN ($korwil)
                                           GROUP BY tbl_jwb_gb_a.p106
                                           ");
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




if($type == 'pendidikan')
{
  $jwt    = $conn->real_escape_string(htmlentities($_GET['token']));
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $korwil    = $DecodedDataArray->data->korwil;
     $proses = $conn->query("SELECT COUNT(tbl_jwb_gb_a.nomor_kuesioner) as value,
                                           tbl_jwb_gb_a.p107 as label
                                           FROM tbl_jwb_gb_a
                                           INNER JOIN tbl_kuesioner ON tbl_jwb_gb_a.nomor_kuesioner = tbl_kuesioner.nomor_kuesioner
                                           WHERE tbl_kuesioner.valid_gabungan = '0'
                                           AND tbl_kuesioner.id_kab IN ($korwil)
                                           GROUP BY tbl_jwb_gb_a.p107
                                           ");
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



?>
