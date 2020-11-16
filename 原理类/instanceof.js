function instanceOf(left, right){
    left = left.__proto__;
    let prototype = right.prototype;
    while(true){
        if(left === prototype){
            return true;
        }
        if(left === null){
            return false;
        }
        left = left.__proto__;
    }
}