var obj = {
    num: 123,
    str: "testString",
    bln: true,
    arr: [ 1, 2, 3 ],
    fnc: function(){ return "moooo"; },
    rxp: /^.*$/gi,
    dt: new Date(),
    obj: {
        num: 123,
        str: "testString",
        bln: true,
        arr: [ 1, 2, 3 ],
        fnc: function(){ return "moooo"; },
        rxp: /^.*$/gi
    }
}

obj.obj.obj = obj;

// Doesn't include the methods/properties declared in a objects prototype.
obj.dump( false )

// Iterate throught the first object and also dump evrything (not native) of the prototype.
obj.dump( true, 1 );


function odump(obj, depth, max){
    return obj.dump( true, max );
}

