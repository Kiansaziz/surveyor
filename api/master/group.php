<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);

// variable Kosong
$joina  = "";
$joinb  = "";

$post     = json_decode(file_get_contents("php://input"));
$table    = isset($post->table) ? $post->table : '';
$poin     = isset($post->poin) ? $post->poin : '';
$x        = isset($post->x) ? $post->x : '';

if ($x != '') {
  foreach ($x as $key => $value) {
    $cols[]     = $table.".".$key." AS ".$value;
  }
  $col = implode(", ", $cols);
} else {
  $col = '';
}

if ($table != 'tbl_jwb_gb_a') {
  $joina  = "INNER JOIN tbl_jwb_gb_a ON $table.nomor_kuesioner = tbl_jwb_gb_a.nomor_kuesioner";
}
if ($table != 'tbl_jwb_gb_b') {
  $joinb  = "INNER JOIN tbl_jwb_gb_b ON $table.nomor_kuesioner = tbl_jwb_gb_b.nomor_kuesioner";
}



// membuat perintah dinamis
$query    = "SELECT $col,
                    tbl_kuesioner.nomor_kuesioner AS nomor_kuesioner,
                    tbl_jwb_gb_a.p106 AS usia,
                    tbl_jwb_gb_b.p201 AS profesi,
                    tbl_prov.kategori_tppu AS tppu,
                    tbl_prov.kategori_tppt AS tppt,
                    tbl_profil.kategori AS profesi
             FROM $table
             $joina
             $joinb
             INNER JOIN tbl_kuesioner ON $table.nomor_kuesioner=tbl_kuesioner.nomor_kuesioner
             INNER JOIN tbl_prov ON tbl_prov.id=tbl_kuesioner.id_prov
             INNER JOIN tbl_profil ON tbl_profil.profil=tbl_jwb_gb_b.p201
             WHERE tbl_kuesioner.valid_gabungan = '0'";

// PROSES QUERY
$proses = $conn->query($query);
if ($proses->num_rows > 0) {
  while($rs = $proses->fetch_object()) {
      $data[] = $rs;
  }
} else {
  $data[]=null;
}
$outp .= '{"hasil":'.json_encode($data).',';
$outp .= '"title":"PERTANYAAN POIN '.SUBSTR($poin,1).'"}';
echo $outp;




?>
