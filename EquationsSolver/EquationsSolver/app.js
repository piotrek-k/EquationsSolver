function Number(number){
    this.val = number;
    this.type = "number";

    this.solve = function(){
        return this;
    }
    
    this.translate = function(){
        //if(this.val > 0){
        //    return "+" + this.val;
        //} else {
        //    return "" + this.val;
        //}
        return "" + this.val;
    }

    return this;
}

function Unknown(letter){
    this.id = letter;
    this.val = "unknown";

    this.solve = function(){
        return this;
    }

    this.translate = function(){
        return "" + this.id;
    }

    return this;
}

function Monomial(array){ //jednomian

    this.val = array;

    this.solve = function(){
        this.result = 1;
        this.nonNumbers = [];
        for(var v in this.val){
            if(this.val[v] instanceof Number){
                this.result *= this.val[v].val;
            } else {
                this.val[v] = this.val[v].solve();
                this.nonNumbers.push(v);
            }
        }

        if(this.nonNumbers.length > 0){
            this.components = [];
            this.components.push(new Number(this.result));
            for(var a in this.nonNumbers){
                this.components.push(this.val[this.nonNumbers[a]]);
            }
            return new Monomial(this.components);
        }

        return new Number(this.result);
    }

    this.translate = function(){
        this.result = "";
        for(var a=0;a<this.val.length;a++){
            this.result += this.val[a].translate();
            if(a<this.val.length-1){
                this.result += "*";
            }
        }

        return this.result;
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
            if(this.val[v] instanceof Number){
                this.sumOfNumbers += this.val[v].val;
            } else {
                this.result.push(this.val[v]);
            }
        }
        this.result.push(new Number(this.sumOfNumbers));

        return new Brackets(this.result);
    }

    this.translate = function(){
        this.result = "(";
        for(var a=0;a<this.val.length;a++){
            this.result += this.val[a].translate();
            if(a<this.val.length-1){
                this.result += "+";
            }
        }

        return this.result+")";
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

var equation = new Brackets([ 
        new Monomial( [
            new Number(2),
            new Number(2)
        ] ),
        new Monomial( [
            new Number(-1),
            new Brackets( [
                new Number(1),
                new Number(3),
                new Number(4),
                new Unknown("x")
            ] ) 
        ] ) 
    ]);

console.log("1: " + equation.translate());
equation.solve();
console.log("2: " + equation.translate());

console.log("end");