var printBtn = document.getElementById('printpdf');
// var svg = document.getElementById('myChart').innerHTML;
// if (svg)
//     svg = svg.replace(/\r?\n|\r/g, '').trim();
var imgData
printBtn.onclick=function(){
zingchart.exec('myChart', 'getimagedata', {
    filetype: 'jpg',
    callback : function(imagedata) {
      imgData =imagedata;
      console.log(imgData);
    }
  });
  
  var doc = new jsPDF();
  doc.addImage(imgData, 'jpg', 2, 3, 300, 150);
  doc.output('dataurlnewwindow');
 
}