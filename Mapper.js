//maps an interval to a [low,high] interval
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
