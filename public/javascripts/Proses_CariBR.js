

function eraseText1() {
 document.getElementById("htxt_nopr").value = "";
 document.getElementById("txt_prdate").value = "";
 document.getElementById("htxt_noer").value = "";
 document.getElementById("txt_podate").value = "";
 document.getElementById("txt_erdate").value = "";
 document.getElementById("txt_accdate").value = "";
 document.getElementById("txt_appdate").value = "";
 document.getElementById("txt_tglcair").value = "";
 document.getElementById("txt_paygroup").value = "";
 document.getElementById("txt_branchid").value = "";
 //document.getElementById("txt_amount").value = "";
 //document.getElementById("txt_beneficiary").value = "";
 //document.getElementById("txt_kegiatan").value = "";
 //document.getElementById("txt_accnumber").value = "";
 document.getElementById("txt_checker").value = "";
 //document.getElementById("txt_tipeer").value = "";
 document.getElementById("txt_validator1").value = "";
 document.getElementById("txt_validator2").value = "";
 document.getElementById("txt_periode").value = "";
 document.getElementById("txt_ti").value = "";
 document.getElementById("txt_tpc").value = "";
 document.getElementById("txt_tif").value = "";
 document.getElementById("txt_status").value = "";
 document.getElementById("txt_remarks").value = "";

 //document.getElementById("txt_tipeerpr").value = "";
 document.getElementById("txt_dep").value = "";
 $('#btn_update').hide('');
 $('#btn_save').hide('');
$('#htxt_inv').val('');
 $('#txt_noerpr').val('');
$('#txt_ernumber').val('');
$('#txt_beneficiary').val('');
$('#txt_accountnumber').val('');
$('#txt_bankname').val('');
$('#txt_taxcode').val('');
$('#txt_amountpaid').val('');

}

/* SHIFT = Open Disabled Form
document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {

 var keyCode = e.which || e.keyCode;
 if (keyCode == 16) {

  enableText();
  document.getElementById("aktif").checked = true;

 } else {

 }
}
*/

//fungsi kosongkan value CTRL + Q
/*var map = {
 17: false,
 81: false
};
$(document).keydown(function(e) {
 if (e.keyCode in map) {
  map[e.keyCode] = true;
  if (map[17] && map[81]) {
   $('html, body').animate({
    scrollTop: 0
   }, 'fast');
   eraseText1();
   document.getElementById('txt_noerpr').focus();

  }
 }
}).keyup(function(e) {
 if (e.keyCode in map) {
  map[e.keyCode] = false;
 }
});
*/
function search() {
 $("#loading").show(); // Tampilkan loadingnya
 var txt_noerpr = $("#txt_noerpr").val().trim();
 var tipe_ws = $('#tipe_ws').val();
 var url = $('#url').val();
 var location = $('#location').val();

 $.ajax({
  type: "POST", // Method pengiriman data bisa dengan GET atau POST
  url: url+"WebService/getDataER",
  //url: "http://172.16.1.187/er-tracking/WebService/getWSBR",
  //url: "http://localhost:8080/er-tracking/WebService/getWSBR", // Isi dengan url/path file php yang dituju
  data: {
  txt_noerpr: txt_noerpr, tipe_ws: tipe_ws, location: location
  }, // data yang akan dikirim ke file proses
  dataType: "json",
  beforeSend: function(e) {
   if (e && e.overrideMimeType) {
    e.overrideMimeType("application/json;charset=UTF-8");
   }
   $("#error").fadeOut();
        $("#btn-search").html('<i class="fa fa-spinner fa-pulse fa-fw"></i> Searching').prop('disabled', true);
        
  },
  success: function(response) { // Ketika proses pengiriman berhasil
    console.log(response);

   if (response.status == "success" && response.tipe=='biasa') { // Jika isi dari array status adalah success
    //fungsi javascript bilangan dalam rupiah
    $('#erbiasa').show();
    $('#erbiasa1').show();
    $('#erbiasa2').show();
    $('#multibranch').hide();
$('#multibranch1').hide();
    if (response.txt_amount.length > 0 || response.txt_amount!='') {
     var bilangan = response.txt_amount;


     var number_string = bilangan.toString(),
      sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

     if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');

     }
    } else {
     var rupiah = "";
    }
    //akhir fungsi javascript bilangan dalam rupiah

    //fungsi memotong string branch id menjadi 3 digit
    if (response.txt_branchid.length > 0) {
     var string = response.txt_branchid;
     var length = 3;
     var trimmedString = string.substring(0, length);
    } else {
     var trimmedString = "";
    }

    //akhir fungsi memotong string branch id menjadi 3 digit

    if (response.txt_periode == '1900-01-01' || response.txt_periode==false) {
     response.txt_periode = "";
    }
    if (response.txt_ti == '1900-01-01' || response.txt_ti==false) {
     response.txt_ti = "";
    }
    if (response.txt_tpc == '1900-01-01' || response.txt_tpc==false) {
     response.txt_tpc = "";
    }
    if (response.txt_tif == '1900-01-01' || response.txt_tif==false) {
     response.txt_tif = "";
    }
    if (response.txt_appdate == '1900-01-01' || response.txt_appdate==false) {
     response.txt_appdate = "";
    }
    if (response.txt_podate == '1900-01-01' || response.txt_podate==false) {
     response.txt_podate = "";
    }
    if (response.txt_erdate == '1900-01-01' || response.txt_erdate==false) {
     response.txt_erdate = "";
    }
    if (response.txt_prdate == '1900-01-01' || response.txt_prdate==false) {
     response.txt_prdate = "";
    }
    if (response.txt_tglcair == '1900-01-01' || response.txt_tglcair==false) {
     response.txt_tglcair = "";
    }
    if (response.txt_accdate == '1900-01-01' || response.txt_accdate==false) {
     response.txt_accdate = "";
    }

    //button save or update
    if (response.button == 'save') {
      document.getElementById("btn_save").style.display = "inline";
     //document.getElementById("btn_update").style.display = "none";   
 } else if (response.button == 'update') {
    document.getElementById("btn_save").style.display = "none";
     document.getElementById("btn_update").style.display = "inline";   
    }else if (response.button == 'hide') {
    document.getElementById("btn_save").style.display = "none";
     //document.getElementById("btn_update").style.display = "none";   
    }

    //$("#txt_noerpr").val(response.txt_noerpr);
   $('<input>').attr({
    type: 'hidden',
    id: 'foo',
    name: 'txt_noer',
    value: response.txt_noer
}).appendTo('form');
   $('<input>').attr({
    type: 'hidden',
    id: 'foo',
    name: 'txt_nopr',
    value: response.txt_nopr
}).appendTo('form');
   $('<input>').attr({
    type: 'hidden',
    id: 'foo',
    name: 'txt_inv',
    value: response.txt_inv
}).appendTo('form');
   $('<input>').attr({
    type: 'hidden',
    id: 'htxt_validator1',
    name: 'htxt_validator1',
    value: response.txt_validator1
}).appendTo('form');
   $('<input>').attr({
    type: 'hidden',
    id: 'htxt_validator2',
    name: 'htxt_validator2',
    value: response.txt_validator2
}).appendTo('form')
   $('<input>').attr({
    type: 'hidden',
    id: 'htxt_checker',
    name: 'htxt_checker',
    value: response.txt_checker
}).appendTo('form')
    $('<input>').attr({
    type: 'hidden',
    id: 'htxt_branchid',
    name: 'htxt_branchid',
    value: response.txt_branchid
}).appendTo('form')
      $('<input>').attr({
    type: 'hidden',
    id: 'htxt_dep',
    name: 'htxt_dep',
    value: response.txt_dep
}).appendTo('form')
       $('<input>').attr({
    type: 'hidden',
    id: 'htxt_tipeer',
    name: 'htxt_tipeer',
    value: response.txt_tipeer
}).appendTo('form')
        $('<input>').attr({
    type: 'hidden',
    id: 'htxt_periode',
    name: 'htxt_periode',
    value: response.txt_periode
}).appendTo('form')
          $('<input>').attr({
    type: 'hidden',
    id: 'htxt_ti',
    name: 'htxt_ti',
    value: response.txt_ti
}).appendTo('form')
           $('<input>').attr({
    type: 'hidden',
    id: 'htxt_tpc',
    name: 'htxt_tpc',
    value: response.txt_tpc
}).appendTo('form')
           $('<input>').attr({
    type: 'hidden',
    id: 'htxt_status',
    name: 'htxt_status',
    value: response.txt_status
}).appendTo('form')
            $('<input>').attr({
    type: 'hidden',
    id: 'htxt_remarks',
    name: 'htxt_remarks',
    value: response.txt_remarks
}).appendTo('form')
             $('<input>').attr({
    type: 'hidden',
    id: 'htxt_tif',
    name: 'htxt_tif',
    value: response.txt_tif
}).appendTo('form')
               $('<input>').attr({
    type: 'hidden',
    id: 'htxt_tipeerpr',
    name: 'htxt_tipeerpr',
    value: response.txt_tipeerpr
}).appendTo('form')
                $('<input>').attr({
    type: 'hidden',
    id: 'htxt_appdate',
    name: 'htxt_appdate',
    value: response.txt_appdate
}).appendTo('form')
                $('<input>').attr({
    type: 'hidden',
    id: 'htxt_erdate',
    name: 'htxt_erdate',
    value: response.txt_erdate
}).appendTo('form')
                $('<input>').attr({
    type: 'hidden',
    id: 'htxt_prdate',
    name: 'htxt_prdate',
    value: response.txt_prdate
}).appendTo('form')
                $('<input>').attr({
    type: 'hidden',
    id: 'htxt_accdate',
    name: 'htxt_accdate',
    value: response.txt_accdate
}).appendTo('form')
                $('<input>').attr({
    type: 'hidden',
    id: 'htxt_tglcair',
    name: 'htxt_tglcair',
    value: response.txt_tglcair
}).appendTo('form')
               
      if(response.txt_note == '' || Array.isArray(response.txt_note)){
      response.txt_note = '-';
    }          
      
    if(response.tipe_ws=='ER'){
      $('#hidden_note').hide();
      $('#hidden_note1').show();
    } else {
      $('#hidden_note').show();
      $('#hidden_note1').hide();
    }

    $("#tipe_er").val('Single');         
    $("#txt_prdate").val(response.txt_prdate);
     $("#txt_note").val(response.txt_note);
    $("#htxt_nopr").val(response.txt_nopr);
    $("#htxt_noer").val(response.txt_noer);
    $("#htxt_inv").val(response.txt_inv);

    $("#txt_podate").val(response.txt_podate);
    $("#txt_erdate").val(response.txt_erdate);
    $("#txt_accdate").val(response.txt_accdate);
    $("#txt_appdate").val(response.txt_appdate);
    $("#txt_paygroup").val(response.txt_paygroup);
    $("#txt_branchid").val(trimmedString);
    $("#txt_amount").val(rupiah);
    $("#txt_beneficiary").val(response.txt_beneficiary);
    $("#txt_accnumber").val(response.txt_accnumber);

    $("#txt_validator1").val(response.txt_validator1);
    $("#txt_validator2").val(response.txt_validator2);
    //$("#txt_checker").val(response.txt_checker);
     
     /*$('<input>').attr({
    type: 'hidden',
    id: 'kode_cabang',
    name: 'kode_cabang',
    value: trimmedString
}).appendTo('form')*/

    $("#txt_checker").val(response.txt_checker).prop('disabled', false);
    $("#txt_tipeer").val(response.txt_tipeer);

    if(response.txt_tipeer =='MultiPaid'){
      $("#hidden1").hide();
     $("#hidden2").hide();
    $("#hidden3").hide();
     $("#hidden4").css("display","inline")
     
  
    }
    else {
 $("#hidden1").show();
     $("#hidden2").show();
    $("#hidden3").show();
     $("#hidden4").hide();
    }


    $("#txt_periode").val(response.txt_periode);
    $("#txt_ti").val(response.txt_ti);
    $("#txt_tpc").val(response.txt_tpc);
    $("#txt_status").val(response.txt_status);
    $("#txt_remarks").val(response.txt_remarks);
    $("#txt_tif").val(response.txt_tif);
    //$("#txt_tipeerpr").val(response.txt_tipeerpr);
    //$("#txt_tipeerpr").val(response.txt_tipeerpr);
    //$("#txt_dep").val(response.txt_dep);
     $("#txt_dep").val(response.txt_dep);
    $("#txt_kegiatan").val(response.txt_kegiatan);
    $("#txt_tglcair").val(response.txt_tglcair);
    
    $("#htxt_checker").val(response.txt_checker);
    $("#htxt_tipeer").val(response.txt_tipeer);
    $("#htxt_periode").val(response.txt_periode);
    $("#htxt_ti").val(response.txt_ti);
    $("#htxt_tpc").val(response.txt_tpc);
    $("#htxt_status").val(response.txt_status);
    $("#htxt_remarks").val(response.txt_remarks);
    $("#htxt_tif").val(response.txt_tif);
    $("#htxt_tipeerpr").val(response.txt_tipeerpr);
    $("#htxt_dep").val(response.txt_dep);
    $("#htxt_tglcair").val(response.txt_tglcair);
    $("#data1").val(response.data1);

     $('#txt_ernumber').val(response.txt_ernumber);
    $('#txt_beneficiarymb').val(response.txt_beneficiarymb);
    $('#txt_accountnumber').val(response.txt_accountnumber);
    $('#txt_bankname').val(response.txt_bankname);
    $('#txt_taxcode').val(response.txt_taxcode);
    $('#txt_amountpaid').val(rupiah);

    $("#txt_checkermb").val(response.txt_checker);
    $("#txt_validator1mb").val(response.txt_validator1);
    $("#txt_periodemb").val(response.txt_periode);
    $("#txt_tpcmb").val(response.txt_tpc);
    $("#txt_statusmb").val(response.txt_status);
    $("#txt_depmb").val(response.txt_dep);

    //$("#txt_tipeerprmb").val(response.txt_tipeerpr);
    $("#txt_validator2mb").val(response.txt_validator2);
    $("#txt_timb").val(response.txt_ti);
    $("#txt_tifmb").val(response.txt_tif);
    $("#txt_remarksmb").val(response.txt_remarks);
/*var str = response.txt_noer;
var branch = str.substr(6, 3);
$("#branch").val(branch);*/
    // varibel miliday sebagai pembagi untuk menghasilkan hari
    
    // varibel miliday sebagai pembagi untuk menghasilkan hari
    function convertdate(date1, date2){
      var selisih;
      if(!date1 || !date2 || date1=='' || date2==''){
        selisih = '-';
        return selisih;
      }
    var date1 = new Date(date1);
    var date2 = new Date(date2);

    var timeDiff = Math.abs(date1.getTime() - date2.getTime());
   selisih = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    return selisih;

    }

    function convertdatetampil(date1, date2){
      var selisih;
      if(!date1 || !date2 || date1=='' || date2==''){
        selisih = '-';
        return selisih;
      }
    var date1 = new Date(date1);
    var date2 = new Date(date2);

    var timeDiff = Math.abs(date1.getTime() - date2.getTime());
   selisih = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    return selisih;

    }


    
      document.getElementById("kode_cabang").value = trimmedString;
      document.getElementById("slapr").innerHTML = cekIsNaN(convertdate(response.txt_appdate, response.txt_prdate));
       document.getElementById("slapo").innerHTML = cekIsNaN(convertdate(response.txt_podate, response.txt_appdate));
       document.getElementById("slaerdate").innerHTML = cekIsNaN(convertdate(response.txt_erdate, response.txt_podate));
       document.getElementById("slakirim").innerHTML = cekIsNaN(convertdate(response.txt_ti, response.txt_erdate));
       document.getElementById("slacabang").innerHTML = cekIsNaN(convertdate(response.txt_ti, response.txt_prdate));
       document.getElementById("acct").innerHTML = cekIsNaN(convertdate(response.txt_accdate, response.txt_tpc));
       document.getElementById("slafin").innerHTML = cekIsNaN(convertdate(response.txt_tglcair, response.txt_accdate));
       document.getElementById("slahq").innerHTML = cekIsNaN(convertdate(response.txt_tglcair, response.txt_ti));
 
       document.getElementById("txt_slapr").value = cekIsNaNforInsert(convertdatetampil(response.txt_appdate, response.txt_prdate));
         document.getElementById("txt_slapo").value = cekIsNaNforInsert(convertdatetampil(response.txt_podate, response.txt_appdate));
     document.getElementById("txt_slaerdate").value = cekIsNaNforInsert(convertdatetampil(response.txt_erdate, response.txt_podate));
      document.getElementById("txt_slakirim").value = cekIsNaNforInsert(convertdatetampil(response.txt_ti, response.txt_erdate));
       document.getElementById("txt_slacabang").value = cekIsNaNforInsert(convertdatetampil(response.txt_ti, response.txt_prdate));
       document.getElementById("txt_acct").value = cekIsNaNforInsert(convertdatetampil(response.txt_accdate, response.txt_tpc));
        document.getElementById("txt_slafin").value = cekIsNaNforInsert(convertdatetampil(response.txt_tglcair, response.txt_accdate));
        document.getElementById("txt_slahq").value = cekIsNaNforInsert(convertdatetampil(response.txt_tglcair, response.txt_ti));
    // function hitung_selisih(){
    // //ambil tanggal berangkat dan kembali
    // var berangkat = document.getElementsByName("berangkat");
    // var kembali = document.getElementsByName("kembali");
    // // bangun string untuk tanggal "tahun bulan tanggal"
    // var tgl_berangkat = tgl_kembali ="";
    // for(var i = 0; i < berangkat.length; i++){
    //     tgl_berangkat += berangkat[i].value+" ";
    //     tgl_kembali += kembali[i].value+" ";
    //     }
    // var selisih = hitungSelisihHari(tgl_berangkat,tgl_kembali);
    // //isikan hasil pada input dengan id = hasil
    // document.getElementById("hasil").value = selisih;
    // }

    document.getElementById("txt_prdate").disabled = true;
     document.getElementById("htxt_noer").disabled = true;
    document.getElementById("htxt_nopr").disabled = true;
    document.getElementById("txt_podate").disabled = true;
    document.getElementById("txt_erdate").disabled = true;
    document.getElementById("txt_accdate").disabled = true;
    document.getElementById("txt_appdate").disabled = true;
    document.getElementById("txt_tglcair").disabled = true;
    document.getElementById("txt_paygroup").disabled = true;
    document.getElementById("txt_branchid").disabled = true;
    document.getElementById("htxt_inv").disabled = true;
     if(document.getElementById("txt_amount")){
     document.getElementById("txt_amount").disabled = true;
    document.getElementById("txt_beneficiary").disabled = true;
    document.getElementById("txt_kegiatan").disabled = true;
    document.getElementById("txt_accnumber").disabled = true;
    }
    
    //document.getElementById("btn_update").style.visibility = "visible";
    document.getElementById("data").innerHTML = "Data Ditemukan";
    document.getElementById("nodata").innerHTML = "";
    //document.getElementById("aktif").checked = false;
$("#btn-search").html('Search').prop('disabled', false);
//console.log(response);
   } else if (response.status == "failed" && response.tipe=='biasa') {  // Jika isi dari array status adalah failed
    // alert("Data Tidak Ditemukan");
    //swal("Tidak Di Temukan/isi No PR!", "Silahkan Cari Berdasarkan No PR", "error");
    // document.location='Page_Input';
    //$('#erbiasa').hide();
    $('#erbiasa').hide();
    $('#erbiasa1').hide();
    $('#erbiasa2').hide();
    
     $('#multibranch').hide();
$('#multibranch1').hide();
      document.getElementById("btn_save").style.display = "none";
     //document.getElementById("btn_update").style.display = "none";
    document.getElementById("htxt_nopr").value = "";
    document.getElementById("htxt_nopr").disabled = false;
    document.getElementById("txt_prdate").value = "";
    document.getElementById("txt_prdate").disabled = false;
    document.getElementById("htxt_noer").value = "";
    document.getElementById("htxt_noer").disabled = false;
    document.getElementById("txt_podate").value = "";
    document.getElementById("txt_podate").disabled = false;
    document.getElementById("txt_erdate").value = "";
    document.getElementById("txt_erdate").disabled = false;
    document.getElementById("txt_accdate").value = "";
    document.getElementById("txt_accdate").disabled = false;
    document.getElementById("txt_appdate").value = "";
    document.getElementById("txt_appdate").disabled = false;
    document.getElementById("txt_tglcair").value = "";
    document.getElementById("txt_tglcair").disabled = false;
    document.getElementById("txt_paygroup").value = "";
    document.getElementById("txt_paygroup").disabled = false;
    document.getElementById("txt_branchid").value = "";
    document.getElementById("txt_branchid").disabled = false;
    
    if(document.getElementById("txt_amount")){
      document.getElementById("txt_amount").value = "";
    document.getElementById("txt_amount").disabled = false;
    document.getElementById("txt_beneficiary").value = "";
    document.getElementById("txt_beneficiary").disabled = false;
    document.getElementById("txt_kegiatan").value = "";
    document.getElementById("txt_kegiatan").disabled = false;
    document.getElementById("txt_accnumber").value = "";
    document.getElementById("txt_accnumber").disabled = false;
    
    }

    document.getElementById("txt_checker").value = "";
    document.getElementById("txt_checker").disabled = false;
    //document.getElementById("txt_tipeer").value = "";
    //document.getElementById("txt_tipeer").disabled = false;
    document.getElementById("txt_validator1").value = "";
    document.getElementById("txt_validator1").disabled = false;
    document.getElementById("txt_validator2").value = "";
    document.getElementById("txt_validator2").disabled = false;
    document.getElementById("txt_periode").value = "";
    document.getElementById("txt_periode").disabled = false;
    document.getElementById("txt_ti").value = "";
    document.getElementById("txt_ti").disabled = false;
    document.getElementById("txt_tpc").value = "";
    document.getElementById("txt_tpc").disabled = false;
    document.getElementById("txt_tif").value = "";
    document.getElementById("txt_tif").disabled = false;
    document.getElementById("txt_status").value = "";
    document.getElementById("txt_status").disabled = false;
    document.getElementById("txt_remarks").value = "";
    document.getElementById("txt_remarks").disabled = false;
    document.getElementById("txt_dep").value = "";
    document.getElementById("txt_dep").disabled = false;

    //document.getElementById("txt_tipeerpr").value = "";
    //document.getElementById("txt_tipeerpr").disabled = false;

   // document.getElementById("btn_update").style.visibility = "hidden";
    document.getElementById("nodata").innerHTML = "Data Tidak Ditemukan";
    document.getElementById("data").innerHTML = "";
    //document.getElementById("aktif").checked = false;
    $("#btn-search").html('Search').prop('disabled', false);
    //console.log(response);
   } else if(response.status == "success" && response.tipe=='multibranch'){
    $('#erbiasa').hide();
    $('#erbiasa1').hide();
    $('#erbiasa2').show();
    $('#multibranch').show();
$('#multibranch1').show();

  
      //fungsi rupiah amount paid
      if (response.txt_amountpaid.length > 0 || response.txt_amountpaid!='') {
     var bilangan = response.txt_amountpaid;


     var number_string = bilangan.toString(),
      sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

     if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');

     }
    } else {
     var rupiah = "";
    }
     //end fungsi rupiah  

     //fungsi rupiah tax code
      if (response.txt_taxcode.length > 0 || response.txt_taxcode!='') {
     var bilangantax = response.txt_taxcode;


     var number_stringtax = bilangantax.toString(),
      sisatax = number_stringtax.length % 3,
      rupiahtax = number_stringtax.substr(0, sisatax),
      ribuantax = number_stringtax.substr(sisatax).match(/\d{3}/g);

     if (ribuantax) {
      separatortax = sisatax ? '.' : '';
      rupiahtax += separatortax + ribuantax.join('.');

     }
    } else {
     var rupiahtax = "";
    }
     //end fungsi rupiah

    if (response.txt_periode == '1900-01-01' || response.txt_periode==false) {
     response.txt_periode = "";
    }
    if (response.txt_ti == '1900-01-01' || response.txt_ti==false) {
     response.txt_ti = "";
    }
    if (response.txt_tpc == '1900-01-01' || response.txt_tpc==false) {
     response.txt_tpc = "";
    }
    if (response.txt_tif == '1900-01-01' || response.txt_tif==false) {
     response.txt_tif = "";
    }
    if (response.txt_appdate == '1900-01-01' || response.txt_appdate==false) {
     response.txt_appdate = "";
    }
    if (response.txt_podate == '1900-01-01' || response.txt_podate==false) {
     response.txt_podate = "";
    }
    if (response.txt_erdate == '1900-01-01' || response.txt_erdate==false) {
     response.txt_erdate = "";
    }
    if (response.txt_prdate == '1900-01-01' || response.txt_prdate==false) {
     response.txt_prdate = "";
    }
    if (response.txt_tglcair == '1900-01-01' || response.txt_tglcair==false) {
     response.txt_tglcair = "";
    }
    if (response.txt_accdate == '1900-01-01' || response.txt_accdate==false) {
     response.txt_accdate = "";
    }

    if (response.button == 'save') {
      document.getElementById("btn_save").style.display = "inline";
     //document.getElementById("btn_update").style.display = "none";   
 } else if (response.button == 'update') {
    document.getElementById("btn_save").style.display = "none";
     document.getElementById("btn_update").style.display = "inline";   
    }else if (response.button == 'hide') {
    document.getElementById("btn_save").style.display = "none";
    // document.getElementById("btn_update").style.display = "none";   
    }
    
    $("#tipe_er").val('MultiBranch');
    $('#txt_tipeermb').val('MultiBranch');
    $("#htxt_noermb").val(response.txt_noer);
    $('#txt_beneficiarymb').val(response.txt_beneficiarymb);
    $('#txt_accountnumbermb').val(response.txt_accountnumber);
    $('#txt_banknamemb').val(response.txt_bankname);
    $('#txt_taxcodemb').val(rupiahtax);
    $('#txt_amountpaidmb').val(rupiah);

    $("#txt_checkermb").val(response.txt_checker).prop('disabled', true);
    $("#htxt_checkermb").val(response.txt_checker);
    $("#txt_validator1mb").val(response.txt_validator1);
    $("#txt_periodemb").val(response.txt_periode);
    $("#txt_tpcmb").val(response.txt_tpc);
    $("#txt_statusmb").val(response.txt_status);
    $("#txt_depmb").val(response.txt_dep);

    //$("#txt_tipeermb").val(response.txt_tipeer);
    $("#txt_validator2mb").val(response.txt_validator2);
    $("#txt_timb").val(response.txt_ti);
    $("#txt_tifmb").val(response.txt_tif);
    $("#txt_remarksmb").val(response.txt_remarks);
    $("#txt_prnumbermb").val(response.txt_prnumber);
    $("#txt_appdatemb").val(response.txt_appdate);
    $("#txt_invmb").val(response.txt_inv);
    $("#htxt_noprmb").val(response.txt_nopr);
     if (response.txt_branchid.length > 0) {
     var string = response.txt_branchid;
     var length = 3;
     var trimmedString = string.substring(0, length);
    } else {
     var trimmedString = "";
    }

    $("#htxt_branchidmb").val(trimmedString);
    //$("#txt_tipeerprmb").val(response.txt_tipeerpr);
    $("#txt_tipeermb").val('MultiBranch');
    $("#htxt_erdatemb").val(response.txt_erdate);
    $("#htxt_prdatemb").val(response.txt_prdate);
    $("#htxt_accdatemb").val(response.txt_accdate);
    $("#htxt_tglcairmb").val(response.txt_tglcair);
    $("#txt_slaprmb").val(response.txt_slapr);
    $("#txt_slapomb").val(response.txt_slapo);
    $("#txt_slaerdatemb").val(response.txt_slaerdate);
    $("#txt_slafinmb").val(response.txt_slafin);


    $("#btn-search").html('Search').prop('disabled', false);
    $('#data').html('Data ditemukan');
    $('#nodata').html('');

    function convertdate(date1, date2){
      var selisih;
      if(!date1 || !date2 || date1=='' || date2==''){
        selisih = '-';
        return selisih;
      }
    var date1 = new Date(date1);
    var date2 = new Date(date2);

    var timeDiff = Math.abs(date1.getTime() - date2.getTime());
   selisih = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    return selisih;

    }

    function convertdatetampil(date1, date2){
      var selisih;
      if(!date1 || !date2 || date1=='' || date2==''){
        selisih = '-';
        return selisih;
      }
    var date1 = new Date(date1);
    var date2 = new Date(date2);

    var timeDiff = Math.abs(date1.getTime() - date2.getTime());
   selisih = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    return selisih;

    }


    
      //document.getElementById("kode_cabang").value = trimmedString;
       document.getElementById("slapr").innerHTML = cekIsNaN(convertdate(response.txt_appdate, response.txt_prdate));
       document.getElementById("slapo").innerHTML = cekIsNaN(convertdate(response.txt_podate, response.txt_appdate));
       document.getElementById("slaerdate").innerHTML = cekIsNaN(convertdate(response.txt_erdate, response.txt_podate));
       document.getElementById("slakirim").innerHTML = cekIsNaN(convertdate(response.txt_ti, response.txt_erdate));
       document.getElementById("slacabang").innerHTML = cekIsNaN(convertdate(response.txt_ti, response.txt_prdate));
       document.getElementById("acct").innerHTML = cekIsNaN(convertdate(response.txt_accdate, response.txt_tpc));
       document.getElementById("slafin").innerHTML = cekIsNaN(convertdate(response.txt_tglcair, response.txt_accdate));
       document.getElementById("slahq").innerHTML = cekIsNaN(convertdate(response.txt_tglcair, response.txt_ti));
 
       document.getElementById("txt_slaprmb").value = cekIsNaNforInsert(convertdatetampil(response.txt_appdate, response.txt_prdate));
         document.getElementById("txt_slapomb").value = cekIsNaNforInsert(convertdatetampil(response.txt_podate, response.txt_appdate));
     document.getElementById("txt_slaerdatemb").value = cekIsNaNforInsert(convertdatetampil(response.txt_erdate, response.txt_podate));
      document.getElementById("txt_slakirimmb").value = cekIsNaNforInsert(convertdatetampil(response.txt_ti, response.txt_erdate));
       document.getElementById("txt_slacabangmb").value = cekIsNaNforInsert(convertdatetampil(response.txt_ti, response.txt_prdate));
       document.getElementById("txt_acctmb").value = cekIsNaNforInsert(convertdatetampil(response.txt_accdate, response.txt_tpc));
        document.getElementById("txt_slafinmb").value = cekIsNaNforInsert(convertdatetampil(response.txt_tglcair, response.txt_accdate));
        document.getElementById("txt_slahqmb").value = cekIsNaNforInsert(convertdatetampil(response.txt_tglcair, response.txt_ti));

   } else if(response.status == "failed" && response.tipe=='multibranch'){
    $('#erbiasa').hide();
    $('#erbiasa1').hide();
    $('#erbiasa2').hide();
    $('#multibranch').hide();
$('#multibranch1').hide();

     $('#txt_ernumber').val('');
    $('#txt_beneficiary').val('');
    $('#txt_accountnumber').val('');
    $('#txt_bankname').val('');
    $('#txt_taxcode').val('');
    $('#txt_amountpaid').val('');
    $("#btn-search").html('Search').prop('disabled', false);
    $('#data').html('');
    $('#nodata').html('Data tidak Ditemukan');

    function convertdate(date1, date2){
      var selisih;
      if(!date1 || !date2 || date1=='' || date2==''){
        selisih = '-';
        return selisih;
      }
    var date1 = new Date(date1);
    var date2 = new Date(date2);

    var timeDiff = Math.abs(date1.getTime() - date2.getTime());
   selisih = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    return selisih;

    }

    function convertdatetampil(date1, date2){
      var selisih;
      if(!date1 || !date2 || date1=='' || date2==''){
        selisih = '-';
        return selisih;
      }
    var date1 = new Date(date1);
    var date2 = new Date(date2);

    var timeDiff = Math.abs(date1.getTime() - date2.getTime());
   selisih = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    return selisih;

    }


    
    document.getElementById("kode_cabang").value = trimmedString;
    document.getElementById("slapr").innerHTML = cekIsNaN(convertdate(response.txt_appdate, response.txt_prdate));
    document.getElementById("slapo").innerHTML = cekIsNaN(convertdate(response.txt_podate, response.txt_appdate));
    document.getElementById("slaerdate").innerHTML = cekIsNaN(convertdate(response.txt_erdate, response.txt_podate));
    document.getElementById("slakirim").innerHTML = cekIsNaN(convertdate(response.txt_ti, response.txt_erdate));
    document.getElementById("slacabang").innerHTML = cekIsNaN(convertdate(response.txt_ti, response.txt_prdate));
    document.getElementById("acct").innerHTML = cekIsNaN(convertdate(response.txt_accdate, response.txt_tpc));
    document.getElementById("slafin").innerHTML = cekIsNaN(convertdate(response.txt_tglcair, response.txt_accdate));
    document.getElementById("slahq").innerHTML = cekIsNaN(convertdate(response.txt_tglcair, response.txt_ti));

    document.getElementById("txt_slapr").value = cekIsNaNforInsert(convertdatetampil(response.txt_appdate, response.txt_prdate));
      document.getElementById("txt_slapo").value = cekIsNaNforInsert(convertdatetampil(response.txt_podate, response.txt_appdate));
  document.getElementById("txt_slaerdate").value = cekIsNaNforInsert(convertdatetampil(response.txt_erdate, response.txt_podate));
   document.getElementById("txt_slakirim").value = cekIsNaNforInsert(convertdatetampil(response.txt_ti, response.txt_erdate));
    document.getElementById("txt_slacabang").value = cekIsNaNforInsert(convertdatetampil(response.txt_ti, response.txt_prdate));
    document.getElementById("txt_acct").value = cekIsNaNforInsert(convertdatetampil(response.txt_accdate, response.txt_tpc));
     document.getElementById("txt_slafin").value = cekIsNaNforInsert(convertdatetampil(response.txt_tglcair, response.txt_accdate));
     document.getElementById("txt_slahq").value = cekIsNaNforInsert(convertdatetampil(response.txt_tglcair, response.txt_ti));
   }
  },
  error: function(xhr, ajaxOptions, thrownError) { // Ketika ada error
   alert(xhr.responseText);
  }
 });
}

//=========================================================//

$(document).ready(function() {
 $("#loading").hide(); // Sembunyikan loadingnya
 $('#erbiasa').hide();
  $('#erbiasa1').hide();
$('#erbiasa2').hide();

 $('#multibranch').hide();
$('#multibranch1').hide();

 $("#btn-search").click(function() { // Ketika user mengklik tombol Cari
 var cek = $('#txt_noerpr').val().trim();
var tipe_ws = $('#tipe_ws').val();

  if(cek.length < 1 || !cek || cek==''){
    $('#tipe_ws').focus().css('border-color','#D5D5D5');
    $('#txt_noerpr').focus().css('border-color','#F44336');
    $('#data').html('');
    $('#nodata').html('Silahkan Isi No PR / ER / INV');

    return false;
  } else if(tipe_ws == '-'){
    
    $('#tipe_ws').focus().css('border-color','#F44336');
    $('#txt_noerpr').focus().css('border-color','#D5D5D5');
    $('#data').html('');
    $('#nodata').html('Silahkan Pilih Tipe ER');

    return false;
  } else {
    $('#tipe_ws').focus().css('border-color','#D5D5D5');
    $('#txt_noerpr').focus().css('border-color','#D5D5D5');
    $('#data').html('');
    $('#nodata').html('');
    search();
  } // Panggil function search
 });



});

function cekIsNaN(param){
    var cek = Number.isNaN(param);
  
    if(cek===true){
      return '-'+' Hari';
    } else {
      return param+' Hari';
    }
  }
  
    function cekIsNaNforInsert(param){
      var cek = Number.isNaN(param);
  
      if(cek===true){
        return '-';
      } else {
        return param;
      }
    }

function CheckKey(e) //receives event object as parameter
{
   var cek = $('#txt_noerpr').val().trim();
 var code = e.keyCode ? e.keyCode : e.which;
 var tipe_ws = $('#tipe_ws').val();
 /*if($(this).val().length > 8) {*/
 if (code === 13) {
  
  if(cek.length < 1 || !cek || cek==''){
    $('#tipe_ws').focus().css('border-color','#D5D5D5');
    $('#txt_noerpr').focus().css('border-color','#F44336');
    $('#data').html('');
    $('#nodata').html('Silahkan Isi No PR / ER / INV');

    return false;
  } else if(tipe_ws == '-'){
    
    $('#tipe_ws').focus().css('border-color','#F44336');
    $('#txt_noerpr').focus().css('border-color','#D5D5D5');
    $('#data').html('');
    $('#nodata').html('Silahkan Pilih Tipe ER');

    return false;
  } else {
    $('#tipe_ws').focus().css('border-color','#D5D5D5');
    $('#txt_noerpr').focus().css('border-color','#D5D5D5');
    $('#data').html('');
    $('#nodata').html('');
    search();
  } // Panggil function search

 }
/*}*/
}

$(document).ready(function(){
$("#txt_checker").change(function() {
    //alert($(this).val());
    var text = $(this).val();
    var url = $('#url').val();
    //$('#txt_validator1').val(txt);

     $.ajax({

        type:"POST",//or POST
        //url:'http://172.16.1.187/er-tracking/Home/getChecker',
        url:url+'Home/getChecker',
                           //  (or whatever your url is)
        data:{search:text},
        dataType : "json", 
        //can send multipledata like {data1:var1,data2:var2,data3:var3
        //can use dataType:'text/html' or 'json' if response type expected 

        beforeSend: function(){
        $('#txt_validator1').val('Loading...');
        $('#txt_validator2').val('Loading...');
        },


        success: function(result) {
        
        var json =  result;

        console.log(json);
        $('#txt_validator1').val(json.validator1);
        $('#txt_validator2').val(json.validator2);


    }
     })
});
$("#txt_checkermb").change(function() {
    //alert($(this).val());
    var text = $(this).val();
    var url = $('#url').val();
    //$('#txt_validator1').val(txt);

     $.ajax({

        type:"POST",//or POST
        //url:'http://172.16.1.187/er-tracking/Home/getChecker',
        url:url+'Home/getChecker',
                           //  (or whatever your url is)
        data:{search:text},
        dataType : "json", 
        //can send multipledata like {data1:var1,data2:var2,data3:var3
        //can use dataType:'text/html' or 'json' if response type expected 

        beforeSend: function(){
        $('#txt_validator1mb').val('Loading...');
        $('#txt_validator2mb').val('Loading...');
        },

        
        success: function(result) {
        
        var json =  result;

        console.log(json);
        $('#txt_validator1mb').val(json.validator1);
        $('#txt_validator2mb').val(json.validator2);


    }
     })
});
});
  /*$( function() {
  
        $( "#txt_checker" ).autocomplete({
            source: function( request, response ) {
                
                $.ajax({
                    url: "http://172.16.1.187/er-tracking/Home/getChecker",
                    type: 'post',
                    dataType: "json",
                    data: {
                        search: request.term
                    },
                    success: function( data ) {
                        response( data );
                    }
                });
            },
            select: function (event, ui) {
                $('#txt_checker').val(ui.item.checker); // display the selected text
                $('#txt_validator1').val(ui.item.validator1); // save selected id to input
                $('#txt_validator2').val(ui.item.validator2); // save selected id to input
                return false;
            }
        });
    });*/
         
  
        //autocomplete
       
