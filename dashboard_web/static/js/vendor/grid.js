Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

var server_data;


function gridConfig(gridSeries){
    let gridConfig = {
        type: "grid",
        'scroll-x': {

        },
        'scroll-y': {

        },
        plotarea: {
        margin: 20,
        marginTop:'1px',
        },
        options: {
        'col-labels': ["Record Time","kWH Record", "Voltage-3P"],
        'col-widths': ["40%","30%","30%" ]
        },
        series:gridSeries,
        // series: [
        //   {
        //     values: ["30-03-2020 12:00:00 AM","200","415.3" ]
        //   },
        //   {
        //     values:["30-03-2020 1:00:00 AM"]
        //   }
        // ]
    }
    return gridConfig
}
function serializeValues(server_data,year,month,day,gen_idx){
    arrSeries = []
    var dataset ={};
    for(i=0; i<=24;i++){
        dataset ={};
        dataset.values=[];
        dataset.values[0] = new Date(year,month,day,0,0,0).addHours(i).toLocaleTimeString();
        dataset.values[1] = server_data.gen_record[gen_idx].power[i];
        arrSeries.push(dataset);
    }
    return arrSeries
}


function renderGrid(year,month,day){
    server_data = JSON.parse(getData(year,month,day))
    gridSeries= serializeValues(server_data,year,month,day,0);
   
    zingchart.render({ 
        id: 'myGrid', 
        data: gridConfig(gridSeries),
        width:'100%' ,
        height:'200%',
        });
}

window.onload = function(){
    $('.input-group.date').datepicker({
        format: "dd/mm/yyyy",
        todayBtn: "linked",
        todayHighlight: true,
        autoclose: true,
        });
        // Get Today Date
        today = new Date();
    $('.input-group.date').datepicker('setDate', today.toDateString());
    $('#dateSelected').html($('.input-group.date').datepicker('getDate').toDateString());
    renderGrid.apply(null,getDateParameters(today));
    renderChart.apply(null,getDateParameters(today));

    // Set Event Trigger after the window load and after setting today Date
    $('.input-group.date').datepicker()
    .on('changeDate', function() {
        dateSelected = getDateParameters(($('.input-group.date').datepicker('getDate')));
        $('#dateSelected').html($('.input-group.date').datepicker('getDate').toDateString());
        renderGrid.apply(null,dateSelected)
        renderChart.apply(null,dateSelected)
    });
    
}
function updateGrid(idx){
    console.log("update grid pressed")
    dateSelected = getDateParameters(($('.input-group.date').datepicker('getDate')));
    year = dateSelected[0];
    month = dateSelected[1];
    day = dateSelected[2];
    gridSeries= serializeValues(server_data,year,month,day,idx);
    
    zingchart.render({ 
                id: 'myGrid', 
                data: gridConfig(gridSeries),
                width:'100%' ,
                height:'200%',
                });
}

selection = document.querySelectorAll('.gridSelect');


for (k=0; k<selection.length; k++){ 
    selection[k].onclick = function(){
     updateGrid(this.id)
     for(i=0; i<selection.length;i++){
         if (selection[i].classList.contains('btn-success')){
            selection[i].classList.remove('btn-success');
            selection[i].classList.add('btn-dark')
         }
         
     }
     this.classList.remove("btn-dark");
     this.classList.add("btn-success");
    }
};
