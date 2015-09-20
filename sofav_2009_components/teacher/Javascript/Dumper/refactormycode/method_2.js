Object.prototype.dump = function( excludePrototype, maxDepth, depth ){
    depth    = depth || [];
    maxDepth = maxDepth >= 0 ? maxDepth : -1;
    excludePrototype = !!excludePrototype;

    // some working vars
    var output = [ "" ],
        key = "",
        indent = "";

    for( var i = 0; i < depth.length; i++ ){
        indent += "  ";}

    if( maxDepth === -1 || depth.length < maxDepth ){
        for( key in this ) if( ( this.hasOwnProperty( key ) || excludePrototype ) ){

            if( depth.contains( this[ key ] ) ){
              output[ 0 ] = "{circular reference}";

            } else {
                depth.push( this[ key ] );
                output.push(
                    indent + key + ": " +
                    this[ key ].dump( excludePrototype, maxDepth, depth )
                );
                depth.pop( this[ key ] );

            }
        }
    } else {
       output[ 0 ] = "{object}";
    }

    return output.join("\n");
};

Array.prototype.contains = function( obj ){
    for( var i = 0; i < this.length; i++ ){
        if( this[ i ] === obj ){
            return true; }
    }

    return false;
};

// default dumpster method
var defaultDumpster = function(){ return this.toString(); };

String.prototype.dump =
Number.prototype.dump =
RegExp.prototype.dump =
Boolean.prototype.dump = defaultDumpster;

Function.prototype.dump = function(){ return "{function}"; };
Date.prototype.dump = function(){ return "{" + this.getTime() + "}"; };