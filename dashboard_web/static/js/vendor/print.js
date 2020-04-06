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
  
  setTimeout(function(){  

  var doc = new jsPDF('l','mm','a4');
  doc.text('Generator records',10,25);
  doc.addImage(imgData, 'jpg', 5, 35, 285, 150);
  for (j=0; j<3 ; j++){
    // debugger;
    doc.addPage('a4','l')
    txtHeader = `Generator ${j+1}-` + $('.input-group.date').datepicker('getDate').toDateString();
    doc.text(txtHeader,15,7);
    doc.autoTable({
      head: [['Record Time','kWH Records','Voltage-3p']],
      theme:'grid',
      styles: { fillColor: [255, 255, 255] },
      headStyles: {fillColor:[192,192,192], textColor:20 ,halign: 'center'},
      bodyStyles:{halign:'center', fontSize:9},
      margin: { top: 9, bottom:0},
      
      body: tableData(server_data,dateSelected[0],dateSelected[1],dateSelected[2],j),
    
    })
  }
  // doc.addPage('a4','l')
  // doc.text( 'Generator 2 - ' + $('.input-group.date').datepicker('getDate').toDateString(),15,7);
  // doc.autoTable({
  //   head: [['Record Time','kWH Records','Voltage-3p']],
  //   theme:'grid',
  //   styles: { fillColor: [255, 255, 255] },
  //   headStyles: {fillColor:[72,255,255], textColor:20 ,halign: 'center'},
  //   bodyStyles:{halign:'center', fontSize:9},
  //   margin: { top: 9, bottom:0},
    
  //   body: tableData(server_data,dateSelected[0],dateSelected[1],dateSelected[2],1),
  
  // })
  // doc.addPage('a4','l')
  // doc.text( 'Generator 3 - ' + $('.input-group.date').datepicker('getDate').toDateString(),15,7);
  // doc.autoTable({
  //   head: [['Record Time','kWH Records','Voltage-3p']],
  //   theme:'grid',
  //   styles: { fillColor: [255, 255, 255] },
  //   headStyles: {fillColor:[72,255,255], textColor:20 ,halign: 'center'},
  //   bodyStyles:{halign:'center', fontSize:9},
  //   margin: { top: 9, bottom:0},
    
  //   body: tableData(server_data,dateSelected[0],dateSelected[1],dateSelected[2],2),
  
  // })
  // doc.addImage(imgGrid,'jpg',5,10,280,390)
  doc.output('dataurlnewwindow');
  // doc.output('save','testing2.pdf')

  }, 900);
}