export const AllowedOperation = Object.freeze({
  Equals: "===",
  IsPresent: "!!",
});

/** Logical entity for a dependency */
export class DependencyModel {
  constructor(id, operation, value, operator) {
    this.dependencyUUID = uniqueid();
    this.operation = operation ? operation : AllowedOperation.Equals
    this.value = value ?  value.replace(/["']+/g, '' ) : value
    this.operator = operator
    this.id = id
  }  
  
  isDependencyComplete = function(){
    let retval = false
    if (this.operation === AllowedOperation.Equals){
      retval = this.value && this.value.trim().length > 0
    }else{
      retval =  this.operation === AllowedOperation.IsPresent
    }
    return retval
  }

  expression = function(){
    let retval = null
    if (this.operation == AllowedOperation.Equals && this.id && this.value){
      retval = 's.'+this.id+' === '+"'" + this.value + "'"
    }

    if (this.operation == AllowedOperation.IsPresent && this.id){
      retval = '!!s.'+this.id
    }
    console.log('<<<< retval ' + this.id + ' ---- ' + retval)
    return retval
  }
}

/**function to generte unique ids for dependencies */
function uniqueid(){
    // always start with a letter (for DOM friendlyness)
    var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
    do {                
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode=Math.floor((Math.random()*42)+48);
        if (ascicode<58 || ascicode>64){
            // exclude all chars between : (58) and @ (64)
            idstr+=String.fromCharCode(ascicode);    
        }                
    } while (idstr.length<32);

    return (idstr);
}

/** parser for dependency expression */
export class DependencyExpressionParser{
    constructor(expression){
        this.expression = expression
        this.id = null
        this.value = null
        this.operation = null
        this.loadValues()
    }

    loadValues(){
        this.id = this.parseId()
        this.value = this.parseValue()
        this.operation =  this.parseOperation()
    }

    parseOperation() {
        if (this.expression && this.expression.includes("===")) {
          return AllowedOperation.Equals;
        }
    
        if (this.expression && this.expression.includes("!!")) {
          return AllowedOperation.IsPresent;
        }
        return AllowedOperation.Equals;
      }
    
      parseValue() {
        if (this.expression && this.expression.includes("===")) {
          return this.expression.split("===")[1].trim();
        }
    
        if (this.expression && this.expression.includes("!!")) {
          return null;
        }
        return null;
      }
    
      parseId() {
        if (this.expression && this.expression.includes("===")) {
          return this.expression.split("===")[0].trim().replace("s.", "");
        }
    
        if (this.expression && this.expression.includes("!!")) {
          return this.expression.trim().replace("!!s.", "");
        }
        return this.expression;
      }
}

export default DependencyModel