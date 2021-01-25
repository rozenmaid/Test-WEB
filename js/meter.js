const app = document.getElementsByTagName('head')[0]
const approot = document.getElementById('root')
const appscript = document.getElementById('scriptrds')

// Add scripts 
var newScript = document.createElement("script")

newScript.setAttribute('type', 'text/javascript')
newScript.setAttribute('src', 'tween.js')

app.appendChild(newScript)
   

var newScript2 = document.createElement("script")

newScript2.setAttribute('type', 'text/javascript')
newScript2.setAttribute('src', 'steelseries.js')

app.appendChild(newScript2)

//add gauge 
/*    <canvas id='canvas1' width='200' height='200'>
        No canvas in your browser...sorry...
    </canvas>*/
var newScript3 = document.createElement('canvas')
newScript3.setAttribute('id', "canvas1")
//newScript3.setAttribute('width', "calc(100% - 20px)")
//newScript3.setAttribute('height', "calc(100% - 20px)")
newScript3.setAttribute('class', "d-flex flex-column  justify-content-center flex-grow-1")
newScript3.setAttribute('style',"zoom: 0.9 -ms-transform: scale(1); -moz-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1);  -ms-transform-origin: 0 0; -moz-transform-origin: 0 0; -o-transform-origin: 0 0; -webkit-transform-origin: 0 0; transform-origin: 0 0;")
approot.appendChild(newScript3)


var c = document.getElementById('canvas1')
var ctx = c.getContext ("2d")

ctx.scale (0.9 , 0.9)

//Add gauge script
function init()
{
  // Define some sections
  var sections = Array(steelseries.Section(0, 25, 'rgba(0, 0, 220, 0.3)'),
                       steelseries.Section(25, 50, 'rgba(0, 220, 0, 0.3)'), 
                       steelseries.Section(50, 75, 'rgba(220, 220, 0, 0.3)'));
  
  // Define one area
  var areas = Array(steelseries.Section(75, 100, 'rgba(220, 0, 0, 0.3)'));
            
  // Create one radial gauge
  var radial1 = new steelseries.Radial(
                    'canvas1', {
                    gaugeType: steelseries.GaugeType.TYPE2,                     
                    size: 300,
                    section: sections,                      
                    area: areas,                            
                    titleString: 'Temp',                    
                    unitString: '°C',  
                    minValue: -10,
                    maxValue: 50,                   
                    pointerType: steelseries.PointerType.TYPE8,
                    frameDesign: steelseries.FrameDesign.GOLD,
                    
                    });                               

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET','http://192.168.3.205:8080/rest/items/achterdeurtemp2', true)

request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    
   

    radial1.setValueAnimated(data.state);
    
  } else {
    //console.log('error')

    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)

  }
  

}

// Send request
request.send()                                

  // Let's set some values...
  //radial1.setValueAnimated(35);
  //itemValue('Weather_GIS_ConditionIcon')
 
}