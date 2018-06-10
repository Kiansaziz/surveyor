<?php
require('../connection.php');
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;
define('SECRET_KEY','Rizki-Fachrulroji');
define('ALGORITHM','HS512');
$secretKey = base64_decode(SECRET_KEY);
$type      = $conn->real_escape_string(htmlentities($_GET['type']));



if($type == 'submit')
{
  $ket        = '';
  $post       = json_decode(file_get_contents("php://input"));
  $jawaban    = isset($post->jawaban) ? $post->jawaban : '';
  $tabel      = $conn->real_escape_string(isset($post->tabel) ? $post->tabel : '');
  $aksi       = $conn->real_escape_string(isset($post->aksi) ? $post->aksi : '');
  $grup       = $conn->real_escape_string(isset($post->grup) ? $post->grup : '');
  $jwt        = $conn->real_escape_string($post->token);
  try {
     $DecodedDataArray = JWT::decode(
       $jwt,
       $secretKey,
       array(ALGORITHM)
     );
     $nomor_kuesioner = $DecodedDataArray->data->nomor_kuesioner;
     $kolom_valid     = $DecodedDataArray->data->valid;
     $level           = $DecodedDataArray->data->level;
     $bagian          = $DecodedDataArray->data->bagian;


     if ($aksi == 'insert') {







         if ($grup == 'a') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman B"; }
         if ($grup == 'b') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman C"; }
         if ($grup == 'c') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman D"; }
         if ($grup == 'd') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman E"; }
         if ($grup == 'e') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman F"; }
         if ($grup == 'f') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman G"; }
         if ($grup == 'g') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman H"; }
         if ($grup == 'h') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman I"; }
         if ($grup == 'i') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman J"; }
         if ($grup == 'j') { $ket = "Berhasil Memasukan Data, Mengalihkan Ke Halaman K"; }
         if ($grup == 'k') { $ket = "Berhasil Memasukan Data"; }

          //  QUERY INSERT ------------------------------------------------------------------------------------------------------------------------------------------------
          foreach ($jawaban as $key => $value) {
            $cols[]     = "`".$key."`='".$value."'";
            $compares[] = "( t1.".$key." <> t2.".$key." ) AS $key";
          }
          $col             = "`nomor_kuesioner` = '$nomor_kuesioner', ";
          $col             .= implode(",", $cols);
          $compare         = implode(",", $compares);
          $query           = "INSERT INTO $tabel SET $col; ";

          // AKSI ENUMERATOR ----------------------------------------------------------------------------------------------------------------------------------------------
          if ($level == '7' && $grup == 'a') {
            $query .= "INSERT INTO `tbl_jwb_ed_a` SET $col; ";
            $query .= "INSERT INTO `tbl_jwb_gb_a` SET $col; ";
          }
          if ($level == '7' && $grup == 'b') {
            $query .= "INSERT INTO `tbl_jwb_ed_b` SET $col; ";
            $query .= "INSERT INTO `tbl_jwb_gb_b` SET $col; ";
          }
          if ($level == '7' && $grup == 'k') {
            $query .= "INSERT INTO `tbl_jwb_ed_k` SET $col; ";
            $query .= "INSERT INTO `tbl_jwb_gb_k` SET $col; ";
            $query .= "UPDATE tbl_kuesioner SET $kolom_valid = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
          }

          // AKSI DATAENTRY ----------------------------------------------------------------------------------------------------------------------------------------------
          if ($level == '8' && $grup == 'c') {
            $query .= "INSERT INTO `tbl_jwb_gb_c` SET $col; ";
          }
          if ($level == '8' && $grup == 'd') {
            $query .= "INSERT INTO `tbl_jwb_gb_d` SET $col; ";
          }
          if ($level == '8' && $grup == 'e') {
            $query .= "INSERT INTO `tbl_jwb_gb_e` SET $col; ";
          }
          if ($level == '8' && $grup == 'f') {
            $query .= "INSERT INTO `tbl_jwb_gb_f` SET $col; ";
          }
          if ($level == '8' && $grup == 'g') {
            $query .= "INSERT INTO `tbl_jwb_gb_g` SET $col; ";
          }
          if ($level == '8' && $grup == 'h') {
            $query .= "INSERT INTO `tbl_jwb_gb_h` SET $col; ";
          }
          if ($level == '8' && $grup == 'i') {
            $query .= "INSERT INTO `tbl_jwb_gb_i` SET $col; ";
          }
          if ($level == '8' && $grup == 'j') {
            $query .= "INSERT INTO `tbl_jwb_gb_j` SET $col; ";
            $query .= "UPDATE tbl_kuesioner SET $kolom_valid = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
          }

          $run    = $conn->multi_query($query)or die(mysql_error());
          if (!$run) {
            $outp .= '{"status":"error",';
            $outp .= '"hasil":"insert",';
            $outp .= '"keterangan":"Gagal Memasukan Data"}';
          } else {

            // Handling Error multiple query ----------------------------------------------------------------------------------------------------------------------------
            do {
              $conn->use_result();
            } while ($conn->next_result());
            if ($conn->errno) {
              $ket .= "Terjadi Kegagalan Sistem Kode 1212";
            }

            // Proses membandingkan jika ini dari data entry ------------------------------------------------------------------------------------------------------------
            if ($level == '8') {
              if ($conn->query("DELETE FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner' AND grup = '$grup'")) {
                $i             = 0;
                $query_compare = "SELECT $compare
                                  FROM tbl_jwb_ed_$grup t1,
                                       tbl_jwb_en_$grup t2
                                  WHERE t1.nomor_kuesioner = '$nomor_kuesioner'
                                  AND t2.nomor_kuesioner = '$nomor_kuesioner'";
                $proses_compare = $conn->query($query_compare);
                $row_compare    = $proses_compare->fetch_assoc();
                $insert_beda    = "INSERT INTO tbl_jwb_beda (id,nomor_kuesioner,grup,pertanyaan) VALUES";
                                    foreach ($jawaban as $key => $value) {
                                      $i += $row_compare[$key];
                                      if( $row_compare[$key] == '1' ){ $insert_beda .= "('','$nomor_kuesioner','$grup','$key'),";  }
                                    }
                                    $insert_beda = rtrim($insert_beda,",");
                if($i != 0){
                  $simpan_beda    = $conn->query($insert_beda);
                }
              }
            }


            // Proses valid gabungan, jika di table beda kosong, maka diubah menjadi 0 -------------------------------------------------------------------------------
            if ($level == '8' && ($grup == 'j' || $grup == 'k')) {
              $query_cek_gabungan   = "SELECT * FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner'";
              $proses_cek_gabungan  = $conn->query($query_cek_gabungan);
              if ($proses_cek_gabungan->num_rows == NULL) {
                $conn->query("UPDATE tbl_kuesioner SET valid_gabungan = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'");
              } else {
                $conn->query("UPDATE tbl_kuesioner SET valid_gabungan = '1' WHERE nomor_kuesioner = '$nomor_kuesioner'");
              }
            }

            // Output Sukses INSERT-------------------------------------------------------------------------------------------------------------------------------------
            $outp .= '{"status":"success",';
            $outp .= '"hasil":"insert",';
            $outp .= '"keterangan":"'.$ket.'"}';
          }




     } else {





          //  QUERY UPDATE -----------------------------------------------------------------------------------------------------------------------------------------------
          foreach ($jawaban as $key => $value) {
            $cols[]     = "`".$key."`='".$value."'";
            $compares[] = "( t1.".$key." <> t2.".$key." ) AS $key";
          }
          $col             = implode(",", $cols);
          $compare         = implode(",", $compares);
          $query           = "UPDATE $tabel SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";

          // AKSI ENUMERATOR ----------------------------------------------------------------------------------------------------------------------------------------------
          if ($level == '7' && $grup == 'a') {
            $query .= "UPDATE `tbl_jwb_ed_a` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
            $query .= "UPDATE `tbl_jwb_gb_a` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '7' && $grup == 'b') {
            $query .= "UPDATE `tbl_jwb_ed_b` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
            $query .= "UPDATE `tbl_jwb_gb_b` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '7' && $grup == 'k') {
            $query .= "UPDATE `tbl_jwb_ed_k` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
            $query .= "UPDATE `tbl_jwb_gb_k` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
            $query .= "UPDATE tbl_kuesioner SET $kolom_valid = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
          }

          // AKSI DATAENTRY ----------------------------------------------------------------------------------------------------------------------------------------------
          if ($level == '8' && $grup == 'a') {
            $query .= "UPDATE `tbl_jwb_gb_a` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'b') {
            $query .= "UPDATE `tbl_jwb_gb_b` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'c') {
            $query .= "UPDATE `tbl_jwb_gb_c` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'd') {
            $query .= "UPDATE `tbl_jwb_gb_d` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'e') {
            $query .= "UPDATE `tbl_jwb_gb_e` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'f') {
            $query .= "UPDATE `tbl_jwb_gb_f` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'g') {
            $query .= "UPDATE `tbl_jwb_gb_g` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'h') {
            $query .= "UPDATE `tbl_jwb_gb_h` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'i') {
            $query .= "UPDATE `tbl_jwb_gb_i` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'j') {
            $query .= "UPDATE `tbl_jwb_gb_j` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
            $query .= "UPDATE tbl_kuesioner SET $kolom_valid = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'; ";
          }
          if ($level == '8' && $grup == 'k') {
            $query .= "UPDATE `tbl_jwb_gb_k` SET $col WHERE `nomor_kuesioner` = '$nomor_kuesioner'; ";
          }


          $run    = $conn->multi_query($query)or die(mysql_error());
          if (!$run) {

            $outp .= '{"status":"error",';
            $outp .= '"hasil":"update",';
            $outp .= '"keterangan":"Gagal Mengubah Data"}';

          } else {

            $ket = "Berhasil Mengubah Data";
            // Handling Error multiple query ----------------------------------------------------------------------------------------------------------------------------
            do {
              $conn->use_result();
            } while ($conn->next_result());
            if ($conn->errno) {
              $ket .= " -> Terjadi Kegagalan Sistem Kode 1212";
            }

            // Proses membandingkan jika ini dari data entry ------------------------------------------------------------------------------------------------------------
            if ($level == '8') {
              if ($conn->query("DELETE FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner' AND grup = '$grup'")) {
                $i             = 0;
                $query_compare = "SELECT $compare
                                  FROM tbl_jwb_ed_$grup t1,
                                       tbl_jwb_en_$grup t2
                                  WHERE t1.nomor_kuesioner = '$nomor_kuesioner'
                                  AND t2.nomor_kuesioner = '$nomor_kuesioner'";
                $proses_compare = $conn->query($query_compare);
                $row_compare    = $proses_compare->fetch_assoc();
                $insert_beda    = "INSERT INTO tbl_jwb_beda (id,nomor_kuesioner,grup,pertanyaan) VALUES";
                                    foreach ($jawaban as $key => $value) {
                                      $i += $row_compare[$key];
                                      if( $row_compare[$key] == '1' ){ $insert_beda .= "('','$nomor_kuesioner','$grup','$key'),";  }
                                    }
                                    $insert_beda = rtrim($insert_beda,",");
                if($i != 0){
                  $simpan_beda    = $conn->query($insert_beda);
                }
              }
            }


            // Proses valid gabungan, jika di table beda kosong, maka diubah menjadi 0 -------------------------------------------------------------------------------
            if ($level == '8' && ($grup == 'j' || $grup == 'k')) {
              $query_cek_gabungan   = "SELECT * FROM tbl_jwb_beda WHERE nomor_kuesioner = '$nomor_kuesioner'";
              $proses_cek_gabungan  = $conn->query($query_cek_gabungan);
              if ($proses_cek_gabungan->num_rows == NULL) {
                $conn->query("UPDATE tbl_kuesioner SET valid_gabungan = '0' WHERE nomor_kuesioner = '$nomor_kuesioner'");
              } else {
                $conn->query("UPDATE tbl_kuesioner SET valid_gabungan = '1' WHERE nomor_kuesioner = '$nomor_kuesioner'");
              }
            }

            // Output Sukses UPDATE-------------------------------------------------------------------------------------------------------------------------------------
            $outp .= '{"status":"success",';
            $outp .= '"hasil":"update",';
            $outp .= '"keterangan":"'.$ket.'"}';

          }




     }
  } catch (Exception $e) {
    $outp .= '{"status":"error",';
    $outp .= '"keterangan":"Gagal Proses, Code : 1212"}';
  }
  echo $outp;
}

?>
