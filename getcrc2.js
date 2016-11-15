function flag(){
	FlagCount = FlagCount+1;
	A1 = a1();
	crcTurttle += (A1+13)*FlagCount;
	crcWorm += (A1+13)*FlagCount;
	crc2 += A1*FlagCount;
}

function R(){
	xpos.unshift(xpos[0]+1);
	xpos.pop();
	ypos.unshift(ypos[0]);
	ypos.pop();
	wormAndCrc();
}

function L(){
	xpos.unshift(xpos[0]-1);
	ypos.unshift(ypos[0]);
	xpos.pop();
	ypos.pop();
	wormAndCrc();
}

function U(){
	ypos.unshift(ypos[0]-1);
	xpos.unshift(xpos[0]);
	ypos.pop();
	xpos.pop();
	wormAndCrc();
}

function D(){
	ypos.unshift(ypos[0]+1);
	xpos.unshift(xpos[0]);
	ypos.pop();
	xpos.pop();
	wormAndCrc();
}

function pos(char){
	if (char == 'R') R();
	if (char == 'L') L();
	if (char == 'U') U();
	if (char == 'D') D();
	if (char == 'RU' || char == 'UR') {
		xpos.unshift(xpos[0]+1);
		ypos.unshift(ypos[0]-1);
		ypos.pop();
		xpos.pop();
		wormAndCrc();
	} 
	if (char == 'RD' || char == 'DR') {
		xpos.unshift(xpos[0]+1);
		ypos.unshift(ypos[0]+1);
		ypos.pop();
		xpos.pop();
		wormAndCrc();
	}
	if (char == 'LU' || char == 'UL') {
		xpos.unshift(xpos[0]-1);
		ypos.unshift(ypos[0]-1);
		ypos.pop();
		xpos.pop();
		wormAndCrc();
	}
	if (char == 'LD' || char == 'DL') {
		xpos.unshift(xpos[0]-1);
		ypos.unshift(ypos[0]+1);
		ypos.pop();
		xpos.pop();
		wormAndCrc();
	}
	if (char == 'JZ') {
		xpos.unshift(xpos[0]);
		xpos.pop();
		ypos.unshift(ypos[0]);
		ypos.pop();
		wormAndCrc();
		xpos.unshift(0);
		xpos.pop();
		ypos.unshift(0);
		ypos.pop();
	}
	if (char == 'J'){
		xpos.unshift(xpos[0]);
		xpos.pop();
		ypos.unshift(ypos[0]);
		ypos.pop();
		wormAndCrc();
		xpos.unshift(xpos[0]+1);
		xpos.pop();
	}
	if (char == 'F'){
		xpos.unshift(xpos[0]);
		xpos.pop();
		ypos.unshift(ypos[0]);
		ypos.pop();
		flag();
	}
	if (char == 'JD'){
		xpos.unshift(xpos[0]);
		xpos.pop();
		ypos.unshift(ypos[0]);
		ypos.pop();
		wormAndCrc();
		ypos.unshift(ypos[0]+1);
		ypos.pop();
	}
	if (char == 'C'){
		xpos.unshift(xpos[0]);
		xpos.pop();
		ypos.unshift(ypos[0]);
		ypos.pop();
		wormAndCrc();
		crco();
	}
	if (char == 'B' || char == 'P'){
		Turttle();
	}
} 

function a1(){
	var A1 = xpos[1]*100+ypos[1];
	return A1;
}

function a2(){
	var A2 = xpos[0]*100+ypos[0];
	return A2;
}

function Turttle(){
	var  A2 = a2();
	if (!(turt.has(A2))){
    crcTurttle = crcTurttle+31*(A2+7); 
    crc2 =crc2+A2; 
    turt.add(A2);
	}
}

function wormAndCrc(){
	A1 = a1(); A2 = a2();
	var c = 0;
	if (A1 != A2){
		if (A1>A2){
			c = A1;
			A1 = A2;
			A2 = c;
		} 
		if ((!setA1.has(A1)) || (!setA2.has(A2)) ){
			setA1.add(A1);
			setA2.add(A2);
			crcWorm += (A1+7)*(A2+7)+A1+A2;
			crc2 += A1+A2;
		}
	}
}

function crco(){
	var A1 = a1(), A2 = a2();
	crcO += (A1+7)*(A2+7)+A1+A2+1;
}

function getcrc2(){
	var getcrc = 0;
	getcrc = ((crcWorm+crc2+crcO+crcTurttle) % 10000000+47)*31;
	return getcrc;
}
var setA1 = new Set();
var setA2 = new Set();
var turt = new Set();
var str = '', s = '', FlagCount = 0, xpos = [0,0], ypos = [0,0];
var crcWorm = 0, crc2 = 0, crcO=0, crcTurttle=0; 

str = prompt('','');

for (var i = 0; i<str.length; i++){
	if (str[i] == '('){
		i++;
		while (str[i] != ')'){
			s += str[i];
			i++;
		} 
		pos(s);
		s = '';
	} else if (!isNaN(str[i])){
		for(var j = 0; j<((+str[i])-1); j++) pos(str[i-1]);
	} else pos(str[i]);
}	

alert(getcrc2());