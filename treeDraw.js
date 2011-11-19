function drawTrees() {

	//clear canvas
	var c = document.getElementsByTagName('canvas')[0];
	c.width = c.width;

	var n = new Node();
	n.setPos({x:500,y:600},{x:500,y:370});
	n.setColor('#050');
	n.setRandomness({
		factorLrand : 0,
		factorRrand : 0,
		rotationLrand : 5,
		rotationRrand : 5
	});
	n.addChilds(13);
	n.draw(13);


	n = new Node();
	n.setPos({x:200,y:600},{x:200,y:500});
	n.setColor('#490');
	n.setRandomness({
		factorLrand : 5,
		factorRrand : 5,
		rotationLrand : 10,
		rotationRrand : 10
	});
	n.addChilds(12);
	n.draw(13);




	n = new Node();
	n.setPos({x:600,y:600},{x:610,y:470});
	n.setColor('#CA0');
	n.setRandomness({
		factorLrand : 3,
		factorRrand : 3,
		rotationLrand : 3,
		rotationRrand : 3
	});
	n.addChilds(10);
	n.draw(10);

	n = new Node();
	n.setPos({x:600,y:600},{x:610,y:470});
	n.setColor('#F51');
	n.setRandomness({
		factorLrand : 4,
		factorRrand : 4,
		rotationLrand : 6,
		rotationRrand : 6
	});
	n.addChilds(13);
	n.draw(13);
}
drawTrees();
