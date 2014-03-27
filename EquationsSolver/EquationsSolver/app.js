function Number(number){
    return this;
}

function Unknown(id){
    return this;
}

function Multiply(array){
    return this;
}

function Divide(numerator, denominator){
    return this;
}

function Brackets(array){
    return this;
}

/*
 * Firstly I have to make the equation computer-readable
 * Algebraic expression:
 * 2 * 2 - ( 1 + x )
 * will look like:
 *  [ 
        Multiply( [
            Number(2),
            Number(2)
        ] ),
        Multiply( [
            Number(-1),
            Brackets( [
                Number(1),
                Unknown(1)
            ] ) 
        ] ) 
    ]
 */