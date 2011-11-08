canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
Node.prototype.counter = 0;
function Node(x,y,lev){
	Node.prototype.counter++;
	var factorL = 0.55;
	var factorR = 0.65;

	var rotation = Math.PI/3.0 ;
	var pos = {x:x||0,y:y||0},
	    pos2 = {x:x||200,y:y||200},
	    leftNode = null,
	    rightNode = null,
	    level = lev || 0;
	
	this.addChilds = function(depth){

		//make unsymmethrical tree
		//var rnd = (Math.random()-0.5)*2;
		//rotation +=rnd;
		//factor *= Math.random()*0.5+0.8;
		//

		leftNode = new Node();
		var xd = (pos2.x - pos.x)*factorL;
		var yd = (pos2.y - pos.y)*factorL;
		
		var xdr = xd*Math.cos(rotation)-yd*Math.sin(rotation);
		var ydr = xd*Math.sin(rotation)+yd*Math.cos(rotation);

		leftNode.setPos(pos2,{x:xdr+pos2.x,y:ydr+pos2.y});


		rightNode = new Node();
		xd = (pos2.x - pos.x)*factorR;
		yd = (pos2.y - pos.y)*factorR;
		
		xdr = xd*Math.cos(-1*rotation)-yd*Math.sin(-1*rotation);
		ydr = xd*Math.sin(-1*rotation)+yd*Math.cos(-1*rotation);

		rightNode.setPos(pos2,{x:xdr+pos2.x,y:ydr+pos2.y});

		//recursion
		depth = depth || 0;
		if(depth>15){depth = 15;}
		if(depth>0){
			leftNode.addChilds(depth-1);
			rightNode.addChilds(depth-1);
		}
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
		ctx.strokeStyle = '#F30';
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
	this.info = function(){
		return({
			pos:pos,
			pos2:pos2,
			leftNode:leftNode,
			rightNode:rightNode
		});
	}
}

n = new Node();
n.setPos({x:500,y:600},{x:500,y:370});
n.addChilds(12);
n.draw(1);

var drawrec = 0;
var iv = setInterval(function(){
	drawrec++;
	n.draw(drawrec);
	if(drawrec>15){
		clearTimeout(iv);
	}
},400);



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

m1 = new Mapper();
m2 = new Mapper(0,1000);
