function circle(x,y,r,fill){
	ctx.save();

	ctx.fillStyle= fill || "#FF3";
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = '#000';
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI,true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	
	ctx.restore();
}
function log(msg){
	var o = document.getElementById('out');
	o.innerHTML = msg + "<br /> " + o.innerHTML;

}
