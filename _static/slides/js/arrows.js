    function generateNodeSet() {
      var spans = document.getElementsByTagName("span");
      var retarr = [];
      for(var i=0;i<spans.length; i++) { 
         retarr[retarr.length] = spans[i].id; 
      } 
      return retarr; 
    } 
 
    function generateLinks(nodeIds) { 
      var retarr = []; 
      for(var i=0; i<nodeIds.length; i++) { 
      	var id = nodeIds[i];
        var span = document.getElementById(id); 
        var atts = span.attributes; 
        var ids_str = false; 
        if((atts.getNamedItem) && (atts.getNamedItem('ids'))) { 
          ids_str = atts.getNamedItem('ids').value; 
        } 
        if(ids_str) { 
          retarr[id] = ids_str.split(" ");
        }
      } 
      return retarr; 
    } 
        
    // degrees to radians, because most people think in degrees
    function degToRad(angle_degrees) {
       return angle_degrees/180*Math.PI;
    }
    // draw a horizontal arc
    //   ctx: canvas context;
    //   inax: first x point
    //   inbx: second x point
    //   y: y value of start and end
    //   alpha_degrees: (tangential) angle of start and end
    //   upside: true for arc above y, false for arc below y.
    function drawHorizArc(ctx, inax, inbx, y, alpha_degrees, upside)
    {
      var alpha = degToRad(alpha_degrees);
      var startangle = (upside ? ((3.0/2.0)*Math.PI + alpha) : ((1.0/2.0)*Math.PI - alpha));
      var endangle = (upside ? ((3.0/2.0)*Math.PI - alpha) : ((1.0/2.0)*Math.PI + alpha));

      var ax=Math.min(inax,inbx);
      var bx=Math.max(inax,inbx);
//      if(upside) {
//        var startangle = (3.0/2.0)*Math.PI + alpha; //North plus alpha west
//        var endangle = (3.0/2.0)*Math.PI - alpha; //North minus alpha east
//      } else {
//        var startangle = (1.0/2.0)*Math.PI - alpha; //South minus alpha west
//        var endangle = (1.0/2.0)*Math.PI + alpha; //North plus alpha east
//      }
      // tan(alpha) = o/a = ((bx-ax)/2) / o
      // o = ((bx-ax)/2/tan(alpha))
      // centre of circle is (bx+ax)/2, y-o
      var circleyoffset = ((bx-ax)/2)/Math.tan(alpha);
      var circlex = (ax+bx)/2.0;
      var circley = y + (upside ? 1 : -1) * circleyoffset;
      var radius = Math.sqrt(Math.pow(circlex-ax,2) + Math.pow(circley-y,2));

      ctx.beginPath();
      if(upside) {
	      ctx.moveTo(bx,y);
        ctx.arc(circlex,circley,radius,startangle,endangle,1);
      } else {
      	ctx.moveTo(bx,y);
        ctx.arc(circlex,circley,radius,startangle,endangle,0);
      }
      ctx.stroke();
   }


    // draw the head of an arrow (not the main line)
    //  ctx: canvas context
    //  x,y: coords of arrow point
    //  angle_from_north_clockwise: angle of the line of the arrow from horizontal
    //  upside: true=above the horizontal, false=below
    //  barb_angle: angle between barb and line of the arrow
    //  filled: fill the triangle? (true or false)
    function drawArrowHead(ctx, x, y, angle_from_horizontal_degrees, upside, //mandatory
                           barb_length, barb_angle_degrees, filled) {        //optional
       (barb_length==undefined) && (barb_length=13);
       (barb_angle_degrees==undefined) && (barb_angle_degrees = 20);
       (filled==undefined) && (filled=true);
       var alpha_degrees = (upside ? -1 : 1) * angle_from_horizontal_degrees; 
      
       //first point is end of one barb
       var plus = degToRad(alpha_degrees - barb_angle_degrees);
       a = x + (barb_length * Math.cos(plus));
       b = y + (barb_length * Math.sin(plus));
       
       //final point is end of the second barb
       var minus = degToRad(alpha_degrees + barb_angle_degrees);
       c = x + (barb_length * Math.cos(minus));
       d = y + (barb_length * Math.sin(minus));

       ctx.beginPath();
       ctx.moveTo(a,b);
       ctx.lineTo(x,y);
       ctx.lineTo(c,d);
       if(filled) {
       	ctx.fill();
       } else {
       	ctx.stroke();
       }
       return true;
    }

    // draw a horizontal arcing arrow
    //  ctx: canvas context
    //  inax: start x value
    //  inbx: end x value
    //  y: y value
    //  alpha_degrees: angle of ends to horizontal (30=shallow, >90=silly)
    function drawHorizArcArrow(ctx, inax, inbx, y,                 //mandatory
                               alpha_degrees, upside, barb_length) { //optional
       (alpha_degrees==undefined) && (alpha_degrees=45);
       (upside==undefined) && (upside=true);
       drawHorizArc(ctx, inax, inbx, y, alpha_degrees, upside);
       if(inax>inbx) { 
       	drawArrowHead(ctx, inbx, y, alpha_degrees*0.9, upside, barb_length); 
       } else { 
       	drawArrowHead(ctx, inbx, y, (180-alpha_degrees*0.9), upside, barb_length); 
       }
       return true;
    }


    function drawArrow(ctx,fromelem,toelem,    //mandatory
                         above, angle) {        //optional
      (above==undefined) && (above = true);
      (angle==undefined) && (angle = 45); //degrees 
      midfrom = fromelem.offsetLeft + (fromelem.offsetWidth / 2) - left - tofromseparation/2; 
      midto   =   toelem.offsetLeft + (  toelem.offsetWidth / 2) - left + tofromseparation/2;
      //var y = above ? (fromelem.offsetTop - top) : (fromelem.offsetTop + fromelem.offsetHeight - top);
      var y = fromelem.offsetTop + (above ? 0 : fromelem.offsetHeight) - canvasTop;
      drawHorizArcArrow(ctx, midfrom, midto, y, angle, above);
    }

var canvasTop = 0;
    function arrowsdraw() { 
      var canvasdiv = document.getElementById("canvas");
      var spanboxdiv = document.getElementById("spanbox");
      var ctx = canvasdiv.getContext("2d");

      nodeset = generateNodeSet(); 
      linkset = generateLinks(nodeset);
      tofromseparation = 20;

      left = canvasdiv.offsetLeft - spanboxdiv.offsetLeft;
      canvasTop = canvasdiv.offsetTop - spanboxdiv.offsetTop; 
      for(var key in linkset) {  
        for (var i=0; i<linkset[key].length; i++) {  
          fromid = key; 
          toid = linkset[key][i]; 
          var above = (i%2==1);
          drawArrow(ctx,document.getElementById(fromid),document.getElementById(toid),above);
        } 
      } 
    } 

