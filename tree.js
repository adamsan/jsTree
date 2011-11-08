var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
Node.prototype.counter = 0;
function Node(x,y,lev){
	Node.prototype.counter++;
	var color = '#F00';
	var factorL = 0.65;//62
	var factorR = 0.65;//62

	var rotationL = Math.PI/3.0 ;
	var rotationR = -1.0*Math.PI/3.0 ;
	var pos = {x:x||0,y:y||0},
	    pos2 = {x:x||200,y:y||200},
	    leftNode = null,
	    rightNode = null,
	    level = lev || 0;

	var rotationLrand = 0;
	var rotationRrand = 0;
	var factorLrand = 0;//0-10
	var factorRrand = 0;//0-10
	var randomOption = {};
	
	this.addChilds = function(depth){

		//make unsymmethrical tree
		rotationL += ((Math.random()-0.5)*(rotationLrand/10));
		rotationR += ((Math.random()-0.5)*(rotationRrand/10));
		factorL *= ((Math.random()*0.5+0.75)*(factorLrand/50)+1);
		factorR *= ((Math.random()*0.5+0.75)*(factorRrand/50)+1);
		//

		leftNode = new Node();
		var xd = (pos2.x - pos.x)*factorL;
		var yd = (pos2.y - pos.y)*factorL;
		
		var xdr = xd*Math.cos(rotationL)-yd*Math.sin(rotationL);
		var ydr = xd*Math.sin(rotationL)+yd*Math.cos(rotationL);

		leftNode.setRandomness(randomOption);
		leftNode.setColor(color);
		leftNode.setPos(pos2,{x:xdr+pos2.x,y:ydr+pos2.y});


		rightNode = new Node();
		xd = (pos2.x - pos.x)*factorR;
		yd = (pos2.y - pos.y)*factorR;
		
		xdr = xd*Math.cos(rotationR)-yd*Math.sin(rotationR);
		ydr = xd*Math.sin(rotationR)+yd*Math.cos(rotationR);

		rightNode.setRandomness(randomOption);
		rightNode.setColor(color);
		rightNode.setPos(pos2,{x:xdr+pos2.x,y:ydr+pos2.y});

		//recursion
		depth = depth || 0;
		if(depth>15){depth = 15;}
		if(depth>0){
			leftNode.addChilds(depth-1);
			rightNode.addChilds(depth-1);
		}
	}
	this.setRandomness = function(options){
		randomOption = options;
		if('factorLrand' in options){factorLrand = options.factorLrand;}
		if('factorRrand' in options){factorRrand = options.factorRrand;}
		if('rotationLrand' in options){rotationLrand = options.rotationLrand;}
		if('rotationRrand' in options){rotationRrand = options.rotationRrand;}
		/*
		if(depth && depth > 0){
			if(leftNode){leftNode.setRandomness(options,depth-1);}
			if(rightNode){rightNode.setRandomness(options,depth-1);}
		}*/
	}
	this.setFactors = function(fL,fR){
		factorL = fL;
		factorR = fR;
	}
	this.setPos = function(p1,p2){
		pos = p1;
		pos2 = p2;
	}
	this.draw = function(depth){
		ctx.strokeStyle =color;
		ctx.beginPath();
		ctx.moveTo(pos.x,pos.y);
		ctx.lineTo(pos2.x,pos2.y);		
		ctx.closePath();
		ctx.stroke();

		depth = depth || 0;
		if(depth>0){
			depth--;
			if(leftNode){leftNode.draw(depth);}
			if(rightNode){rightNode.draw(depth);}
		}
	}
	this.setColor = function(c){
		color= c || '#F00';		
	}
	this.info = function(){
		return({
			pos:pos,
			pos2:pos2,
			leftNode:leftNode,
			rightNode:rightNode
		});
	}
}

var n = new Node();
n.setPos({x:500,y:600},{x:500,y:370});
n.setColor('#050');
n.setRandomness({
	factorLrand : 0,
	factorRrand : 0,
	rotationLrand : 0,
	rotationRrand : 0
});
n.addChilds(13);
n.draw(1);


n.draw(15);

/*
var drawrec = 0;
var iv = setInterval(function(){
	drawrec++;
	n.draw(drawrec);
	if(drawrec>15){
		clearTimeout(iv);
	}
},100);
*/
















function circle(x,y,r,fill){
	ctx.fillStyle= fill || "#FF3";
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI,true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}
function log(msg){
	var o = document.getElementById('out');
	o.innerHTML = msg + "<br /> " + o.innerHTML;

}
//x'    cos -sin   x
//   =           *  
//y'    sin  cos   y



//helper classes 

//maps a [0,1] interval to a [low,high] interval
function Mapper(l,h){
	var fromRange = {low:0,high:1.0};
	var range = {
		low: l || 0,
		high: h || 100.0
	};
	this.setFromRange = function(l,h){
		fromRange.low = l;
	        fromRange.high = h;	
	}
	this.setRange = function(l,h){
		range.low = l;
	        range.high = h;	
	}
	//inverse mapping
	function _imap(y){
		var norm = (y-range.low)/(range.high-range.low);
		return(norm*(fromRange.high-fromRange.low)+fromRange.low);
	}	
	function _map(y){
		var norm = (y-fromRange.low)/(fromRange.high-fromRange.low);
		return(norm*(range.high-range.low)+range.low);
	}

	this.imap = function(y,propertiesTomap){
		if(typeof(y)=='number'){
			return _imap(y);
		}else if(typeof(y)=='object'){
			propertiesTomap = propertiesTomap || ['x','y'];
			for(var i=0;i<propertiesTomap.length;i++){
				pname = propertiesTomap[i];
				if(pname in y){
					y[pname] = _imap(y[pname]);
				}
			}
			return(y);
		}
	}
	this.map = function(y,propertiesTomap){
		if(typeof(y)=='number'){
			return _map(y);
		}else if(typeof(y)=='object'){
			propertiesTomap = propertiesTomap || ['x','y'];
			for(var i=0;i<propertiesTomap.length;i++){
				pname = propertiesTomap[i];
				if(pname in y){
					y[pname] = _map(y[pname]);
				}
			}
			return(y);
		}
	}

	this.info = function(){
		return({
			fromRange:fromRange,
			range:range
		});
	}
}

var m1 = new Mapper();
var m2 = new Mapper(0,1000);
