var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.lineJoin = 'Round';
Node.prototype.counter = 0;
function Node(x,y,lev){
	Node.prototype.counter++;
	var color = '#F00';
	var factorL = 0.65;//62
	var factorR = 0.65;//62

	var leafs = 0.96;

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
		
//x'    cos -sin   x
//   =           *  
//y'    sin  cos   y
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
		level = depth;
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
		ctx.lineWidth = Math.round(level/3);
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
		if(depth == 0 && Math.random() > leafs ){circle(pos2.x,pos2.y,4,'rgba(0,200,0,0.5)');}//'#0C0');}
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
//x'    cos -sin   x
//   =           *  
//y'    sin  cos   y
