class Validator {
  constructor() {
    this._errors = [];
  }

  get Errors() {
    return this._errors;
  }

  isNullable(schema, dataToValidate) {
    if(schema.nullable) {
      return true;
    } else {
      if(dataToValidate === null) {
        return false;
      }
    }
  }

  isTypeCorrect(typeSchema, dataToValidate) {
    if((Array.isArray(dataToValidate) ? 'array' : typeof dataToValidate) === typeSchema.type) {
      return true;
    } else {
      if(typeof typeSchema['nullable'] !== "undefined") {
        if(this.isNullable(typeSchema, dataToValidate)){
          return true;
        } else {
          this._errors.unshift('Value is null, but nullable false');
          return false;
        }
      }
      this._errors.unshift('Type is incorrect');
      return false;
    }
  }

  isNumber(schema, dataToValidate) {
    for(let key in schema){
      switch(key){
        case 'type':
          if(this.isTypeCorrect(schema, dataToValidate)) {
            break;
          } else {
            return false;
          }

        case 'minimum':
          if(schema.minimum < dataToValidate) {
            break;
          } else {
            this._errors.unshift('Value is less than it can be');
            return false;
          } 
        
        case 'maximum':
          if(schema.maximum > dataToValidate) {
            break;
          } else {
            this._errors.unshift('Value is greater than it can be');
            return false;
          } 
        
        case 'enum':
          if(schema.enum.includes(dataToValidate)) {
            break;
          } else {
            this._errors.unshift('The enum does not support value');
            return false;
          } 
      }
    }

    return true;
  }

  isBoolean(schema, dataToValidate) {
    for(let key in schema){
      switch(key){
        case 'type':
          if(this.isTypeCorrect(schema, dataToValidate)) {
            break;
          } else {
            return false;
          }
      }
    }

    return true;
  }

  isString(schema, dataToValidate) {
    for(let key in schema){
      switch(key){
        case 'type':
          if(this.isTypeCorrect(schema, dataToValidate)) {
            break;
          } else {
            return false;
          }

        case 'minLength':
          if(schema.minLength < dataToValidate.length) {
            break;
          } else {
            this._errors.unshift('Too short string');
            return false;
          } 

        case 'maxLength':

          if(schema.maxLength > dataToValidate.length) {
            break;
          } else {
            this._errors.unshift('Too long string');
            return false;
          } 

        case 'pattern':
          if(dataToValidate.match(schema.pattern)) {
            break;
          } else {
            this._errors.unshift('String does not match pattern');
            return false;
          }

        case 'enum':
        if(schema.enum.includes(dataToValidate)) {
          break;
        } else {
          this._errors.unshift('The enum does not support value');
          return false;
        }

        case 'format':
          if(schema.format === 'email') {
            if(dataToValidate.match(/\S+@\S+\.\S+/)) {
              break;
            } else {
              this._errors.unshift('Format of string is not valid');
              return false;
            }
          } else {
            if(dataToValidate.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/)) {
              break;
            } else {
              this._errors.unshift('Format of string is not valid');
              return false;
            }
          }
      }
    }

    return true;

  }

  isArray(schema, dataToValidate) {
    for(let key in schema){
      switch(key){
        case 'type': 
          if(this.isTypeCorrect(schema, dataToValidate)) {
            break;
          } else {
            return false;
          }
          
        case 'minItems':
          if(schema.minItems < dataToValidate.length) {
            break;
          } else {
            this._errors.unshift('Items count less than can be');
            return false;
          } 

        case 'maxItems':
          if(schema.maxItems > dataToValidate.length) {
            break;
          } else {
            this._errors.unshift('Items count more than can be');
            return false;
          } 

        case 'items':
          for (let i = 0; i < dataToValidate.length; i++) {
            let typeItems = schema.items.type;
            if(this.isTypeCorrect(schema.items, arr)) {
            } else {
              return false;
            }
          }
      }
    }
    return true;
  }

  isObject(schema, dataToValidate) {
    for(let key in schema){
      switch(key){
        case 'type': 
          if(this.isTypeCorrect(schema, dataToValidate)) {
            break;
          } else {
            return false;
          }
      }
    }

    return true;
  }


  /**
   *
   * @param schema
   * @param dataToValidate
   * @returns {boolean}
   */
  isValid(schema = {}, dataToValidate) {
    switch(schema.type) {
      case 'number':
        return this.isNumber(schema, dataToValidate);
      case 'string':
        return this.isString(schema, dataToValidate);
      case 'array':
        return this.isArray(schema, dataToValidate);
      case 'object':
        return this.isObject(schema, dataToValidate);
      case 'boolean':
        return this.isBoolean(schema, dataToValidate);
      default:
        this._errors.unshift('Unknown type');
        return false;
    }
  }
}
