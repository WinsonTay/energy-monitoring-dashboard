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
function tableData(server_data,year,month,day,gen_idx){
    server_data = JSON.parse(getData(year,month,day))
    dataset = [];
    values = [];
    for(i=0;i<=24;i++){
        values[0] = new Date(year,month,day,0,0,0).addHours(i).toLocaleTimeString();
        values[1] = server_data.gen_record[gen_idx].power[i];
        dataset.push(values);
        values =[];
    }
    return dataset;
}

function renderGrid(year,month,day,idx){
    server_data = JSON.parse(getData(year,month,day))
    gridSeries= serializeValues(server_data,year,month,day,idx);
    zingchart.render({ 
        id: 'myGrid', 
        data: gridConfig(gridSeries),
        width:'100%' ,
        height:'200%',
        output:'svg',
        });
}
var dateSelected
window.onload = function(){
   
    $('.input-group.date').datepicker({
        format: "dd/mm/yyyy",
        todayBtn: "linked",
        todayHighlight: true,
        autoclose: true,
        });
        // Get Today Date
        today = new Date();
    dateSelected =getDateParameters(today);
    $('.input-group.date').datepicker('setDate', today.toDateString());
    $('#dateHTML').html($('.input-group.date').datepicker('getDate').toDateString());

    renderGrid(dateSelected[0],dateSelected[1],dateSelected[2],0);
    renderChart(dateSelected[0],dateSelected[1],dateSelected[2]);

    

    // Set Event Trigger after the window load and after setting today Date
    $('.input-group.date').datepicker()
    .on('changeDate', function() {
        dateSelected = getDateParameters(($('.input-group.date').datepicker('getDate')));
        $('#dateSelected').html($('.input-group.date').datepicker('getDate').toDateString());
        renderGrid(dateSelected[0],dateSelected[1],dateSelected[2],0);
        renderChart(dateSelected[0],dateSelected[1],dateSelected[2]);
    });
    
}
function updateGrid(idx){
    dateSelected = getDateParameters(($('.input-group.date').datepicker('getDate')));  
    renderGrid(dateSelected[0],dateSelected[1],dateSelected[2],idx)
}

selection = document.querySelectorAll('.gridSelect');
grid = document.querySelectorAll('.grid');

// grid[0].style.display="none";
for (k=0; k<selection.length; k++){ 
    selection[k].onclick = function(){
     updateGrid(this.id)
     for(i=0; i<selection.length;i++){
         if (selection[i].classList.contains('btn-success')){
            selection[i].classList.remove('btn-success');
            selection[i].classList.add('btn-dark');
         }
         
     }
     this.classList.remove("btn-dark");
     this.classList.add("btn-success");
    }
};
