function Number(number){
    this.val = number;
    this.type = "number";

    this.solve = function(){
        return this;
    }

    return this;
}

function Unknown(id){
    this.id = id;
    this.val = "unknown";

    this.solve = function(){
        return this;
    }

    return this;
}

function Monomial(array){ //jednomian

    this.val = array;

    this.solve = function(){
        this.result = 1;
        for(var v in this.val){
            if(this.val[v].type === "number"){
                this.result *= this.val[v].val;
            } else {
                return this;
            }
        }

        return new Number(this.result);
    }

    return this;
}

function Divide(numerator, denominator){
    this.num = numerator;
    this.den = denominator;
    this.val = this.num/this.den;

    this.solve = function(){
        return new Number(this.num/this.den);
    }

    return this;
}

function Brackets(array){
    this.val = array;

    this.simplify = function(){
        this.newArray = [];
        for(var v in this.val){
            this.newArray.push(this.val[v].solve());
        }
        this.val = this.newArray;
    }

    this.solve = function(){
        this.simplify();

        this.result = [];
        this.sumOfNumbers = 0;
        for(var v in this.val){
            if(this.val[v].type === "number"){
                this.sumOfNumbers += this.val[v].val;
            } else {
                this.result.push(this.val[v]);
            }
        }
        this.result.push(new Number(this.sumOfNumbers));
    }

    return this;
}

/*
 * Firstly I have to make the equation computer-readable
 * Algebraic expression:
 * 2 * 2 - ( 1 + x )
 * will look like:
 *  [ 
        new Multiply( [
            new Number(2),
            new Number(2)
        ] ),
        new Multiply( [
            new Number(-1),
            new Brackets( [
                new Number(1),
                new Unknown(1)
            ] ) 
        ] ) 
    ]
 */

this.pretty = function(expression){
    this.result = "";

    this.getAllValues = function(arr){
        this.res = "";

        for(this.a in arr){
            if(arr[this.a] instanceof Number){
                this.res += (arr[this.a].val > 0) ? "+" + arr[this.a].val : arr[this.a].val;
            } else if(arr[this.a] instanceof Monomial){
                this.res += "unknown";
            } else if(arr[this.a] instanceof Unknown){
                this.res += "unknown";
            } else if(arr[this.a] instanceof Brackets){
                this.res += "(" + this.getAllValues(arr[this.a].val) + ")";
            } else {
                console.log("");
            }
        }

        return this.res;
    }

    this.result += this.getAllValues(expression.val);

    return this.result;
};

var equation = new Brackets([ 
        new Monomial( [
            new Number(2),
            new Number(2)
        ] ),
        new Monomial( [
            new Number(-1),
            new Brackets( [
                new Number(1),
                new Unknown(1)
            ] ) 
        ] ) 
    ]);

console.log("1: " + this.pretty(equation));
equation.solve();
console.log("2: " + this.pretty(equation));

console.log("end");