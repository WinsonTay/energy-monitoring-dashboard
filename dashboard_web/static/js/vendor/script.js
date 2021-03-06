getdata = document.getElementById("getData");

function getData(year,month,day){
    var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function(){
    //   if (this.readyState == 4 && this.status==200) {
    //       parsed_data=JSON.parse(this.responseText)
    //       return parsed_data
    //   }
    // };
    xhttp.open("GET","https://winson-dashboard.herokuapp.com/api/v1/data/"+year+"/"+month+"/"+day,false)
    xhttp.send(null);
    return xhttp.responseText
}
function getPower(year,month,day){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET","https://winson-dashboard.herokuapp.com/api/v1/data/"+"generated"+"/"+year+"/"+month+"/"+day,false)
  xhttp.send(null);
  return xhttp.responseText
}
function chartConfig(server_data,gen){
  // var server_data = JSON.parse(getData(year,month,day));
  // var gen = JSON.parse(getPower(year,month,day));
  var data = []
  var list = []
  // intialize array
  // get power generate value
    for(j=0;j<gen.length;j++){
      for (i=0; i<gen[0].power_generated.length; i++){
          list.push(gen[j].power_generated[i].power);
      }
      data[j] = list;
      list =[];
  }

  var ts = server_data.date + "T00:00:00.000";
  var ts_2 =gen[0].power_generated[0].date +"T00:00:00.000";
  unix_seconds = ((new Date(ts)).getTime());
  unix_seconds_2 = ((new Date(ts_2)).getTime());
    
  let chartConfig = {
    backgroundColor: '#ecf2f6',
    graphset: [
      {
        type: 'bar',
        backgroundColor: '#fff',
        borderWidth: '1px',
        borderColor: '#dae5ec',
        width: '96%',
        height: '42%',
        x: '2%',
        y: '3%',
        title: {
          text: 'GENERATOR PERFORMANCE FOR PAST 7 DAYS',
          marginTop: '7px',
          marginLeft: '9px',
          backgroundColor: 'none',
          fontColor: '#707d94',
          fontFamily: 'Arial',
          fontSize: '11px',
          fontWeight: 'bold',
          shadow: false,
          textAlign: 'center',
          mediaRules: [{
            maxWidth:550,
            textAlign: 'left',
            marginTop:'3px',
            text:'GENERATOR PERFORMANCE<br>FOR PAST 7 days',
            fontSize:'8px,'
          }
          ],
        },
        "legend": {
          layout: "2x2"
        },

        plot: {
          tooltip: {
            padding: '5px 10px',
            backgroundColor: '#707e94',
            borderRadius: '8px',
            fontColor: '#fff',
            fontFamily: 'Arial',
            fontSize: '11px',
            shadow: false
            
          },
          'value-box': {
            //Displays all data values by default.
          },
          animation: {
            delay: 500,
            effect: 'ANIMATION_SLIDE_BOTTOM'
          },
          barWidth: '33px',
          hoverState: {
            visible: false
          }
        },
        plotarea: {
          margin: '45px 1px 40px 10px',
          marginLeft:'70px',
          marginRight:'10px',

        },
        "utc":true,
        "timezone":8,
        
        scaleX: {
            minValue: unix_seconds_2,
            
            step: '1day', 
            transform:{ 
              type: 'date',
              // all: '%D, %d %M %Y<br>%h:%i %A', Day,day Month, Year, Time format
              all: '%D, %d %M %Y',
              itemsOverlap: true,
            },
            mediaRules: [
              {
                maxWidth: 700,
                "zooming": true,
                "zoom-to": [0, 4],
                transform:{ 
                  type: 'date',
                  // all: '%D, %d %M %Y<br>%h:%i %A', Day,day Month, Year, Time format
                  all: '%m/%d',
                  itemsOverlap: true,
                },
              
              },
              {
                maxWidth: 400,
                "zooming": true,
                "zoom-to": [0, 3],
                transform:{ 
                  type: 'date',
                  // all: '%D, %d %M %Y<br>%h:%i %A', Day,day Month, Year, Time format
                  all: '%m/%d',
                  itemsOverlap: true,
                },
              
              },
            ],
          item: {
            paddingTop: '2px',
            fontColor: '#8391a5',
            fontFamily: 'Arial',
            fontSize: '11px'
          },
          itemsOverlap: true,
          lineColor: '#d2dae2',
          maxItems: 9999,
          offsetY: '1px',
          tick: {
            lineColor: '#d2dae2',
            visible: false
          }
        },
        "scroll-x": {
          "bar": {
            "background-color": "#DCEDC8",
            "alpha": 0.5
          },
          "handle": {
            "background-color": "#8BC34A"
          }
        },
        scaleY: {
          values: '0:200:50',
          guide: {
            rules: [
              {
                lineWidth: '0px',
                rule: '%i == 0'
              },
              {
                alpha: 0.4,
                lineColor: '#d2dae2',
                lineStyle: 'solid',
                lineWidth: '1px',
                rule: '%i > 0'
              }
            ]
          
          },
          label: {
            text: ' Daily Power Generated<br>(kWH)',
          },
          item: {
            paddingRight: '5px',
            fontColor: '#8391a5',
            fontFamily: 'Arial',
            fontSize: '10px'
          },
          lineColor: 'none',
          maxItems: 4,
          maxTicks: 4,
          tick: {
            visible: false
          }
        },

        series: [
          {
            values:data[0],
            text:server_data.gen_record[0].name,
            'barWidth':'75%',
          },
          {
            values:data[1],
            text:server_data.gen_record[1].name,
            'barWidth':'75%',
          },
          {
            values:data[2],
            text:server_data.gen_record[2].name,
            'barWidth':'75%',
          },
        ]
      },
      {
        type: 'line',
        backgroundColor: '#fff',
        borderColor: '#dae5ec',
        borderWidth: '1px',
        width: '96%',
        height: '50%',
        x: '2%',
        y: '47.2%',
        title: {
          text: 'kWH Records',
          marginTop: '7px',
          marginLeft: '12px',
          backgroundColor: 'none',
          fontColor: '#707d94',
          fontFamily: 'Arial',
          fontSize: '11px',
          shadow: false,
          textAlign: 'center',
          mediaRules:[
            {
              maxWidth:500,
              textAlign:'left',
            }
          ]
        },
        "preview": {
          // adjustLayout:true,
        },

      
        subtitle:{
            text:server_data.date,
            marginTop:'20px',
            textAlign:'left',
        },
        plot: {
          animation: {
            delay: 400,
            effect: 'ANIMATION_SLIDE_LEFT'
          }
        },
        plotarea: {
          margin: '50px 25px 65px 46px',
          marginBottom:'120 px',
          borderRadius:'10px',
        },
        scaleY: {
          guide: {
            alpha: 0.5,
            lineColor: '#d2dae2',
            lineStyle: 'solid',
            lineWidth: '1px'
          },
          item: {
            paddingRight: '5px',
            fontColor: '#8391a5',
            fontFamily: 'Arial',
            fontSize: '10px'
          },
          lineColor: 'none',
          tick: {
            visible: false
          }
        },
        "utc":true,
        "timezone":8,
        scaleX: {
            zooming:true,
            minValue: unix_seconds,
            step: '1hour', 
            transform:{ 
              type: 'date',
              // all: '%D, %d %M %Y<br>%h:%i %A', Day,day Month, Year, Time format
              all: '%D <br>%h:%i %A',
              itemsOverlap: true,
            },
            mediaRules: [
              {
                maxWidth: 700,
                "zooming": true,
                "zoom-to":[0,11],
                transform:{ 
                  type: 'date',
                  // all: '%D, %d %M %Y<br>%h:%i %A', Day,day Month, Year, Time format
                  all: '%h:%i',
                  itemsOverlap: true,
                },
              
              },
              
            ],
           "scroll-x": {
                    "bar": {
                      "background-color": "#DCEDC8",
                      "alpha": 0.5
                    },
                    "handle": {
                      "background-color": "#8BC34A"
                    }
          },
          item: {
            paddingTop: '5px',
            fontColor: '#8391a5',
            fontFamily: 'Arial',
            fontSize: '10px',
          },
          lineColor: '#d2dae2',
          lineWidth: '2px',
          tick: {
            lineColor: '#d2dae2',
            lineWidth: '1px'
          }
        },
        legend: {
          // margin:'20 auto 15 auto',
          backgroundColor: 'none',
          borderWidth: '0px',
          item: {
            margin: '1px',
            marginTop:'0px',
            padding: '0px',
            fontColor: '#707d94', 
            fontFamily: 'Arial',
            fontSize: '9px'
          },
          layout: '2x2',
          marker: {
            type: 'match',
            padding: '3px',
            fontFamily: 'Arial',
            fontSize: '10px',
            lineWidth: '2px',
            showLine: 'true',
            size: 4
          },
          shadow: true
        },
        scaleLabel: {
          padding: '5px 10px',
          backgroundColor: '#707d94',
          borderRadius: '5px',
          fontColor: '#ffffff',
          fontFamily: 'Arial',
          fontSize: '10px'
        },
        crosshairX: {
          lineColor: '#707d94',
          lineWidth: '1px',
          plotLabel: {
            padding: '5px 10px',
            alpha: 1,
            borderRadius: '5px',
            fontColor: '#000',
            fontFamily: 'Arial',
            fontSize: '10px',
            shadow: false
          }
        },
        tooltip: {
          visible: false
        },
        series: [
          {
            values: server_data.gen_record[0].power,
            text: server_data.gen_record[0].name,
            lineColor: '#4dbac0',
            lineWidth: '2px',
            marker: {
              backgroundColor: '#fff',
              borderColor: '#36a2a8',
              borderWidth: '1px',
              shadow: false,
              size: 3
            },
            palette: 0,
            shadow: false
          },
          {
            text: server_data.gen_record[1].name,
            values: server_data.gen_record[1].power,
            lineColor: '#25a6f7',
            lineWidth: '2px',
            marker: {
              backgroundColor: '#fff',
              borderColor: '#1993e0',
              borderWidth: '1px',
              shadow: false,
              size: 3
            },
            palette: 1,
            shadow: false,
            visible: true
          },
          {
            text: server_data.gen_record[2].name,
            values: server_data.gen_record[2].power,
            lineColor: '#ad6bae',
            lineWidth: '2px',
            marker: {
              backgroundColor: '#fff',
              borderColor: '#975098',
              borderWidth: '1px',
              shadow: false,
              size: 3
            },
            palette: 2,
            shadow: false,
            visible: true
          }
        ]
      }
    ]
  };
  return chartConfig;
}


function renderChart(year,month,day){
    // Javascript code to execute after DOM content
    // full ZingChart schema can be found here:
    // https://www.zingchart.com/docs/api/json-configuration/
    server_data = JSON.parse(getData(year,month,day));
    gen = JSON.parse(getPower(year,month,day));
    zingchart.render({ 
        id: 'myChart', 
        data: chartConfig(server_data,gen),
        width:'100%',
        height:650,
        });
};
function getDateParameters(dateValue){
  dateParameters = new Array()
  dateParameters[0] = dateValue.getFullYear();
  dateParameters[1] = dateValue.getMonth()+1;
  dateParameters[2] = dateValue.getDate();
  return dateParameters;
}





