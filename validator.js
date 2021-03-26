class Validator {
  constructor() {
    this._errors = [];
  }

  get Errors() {
    return this._errors;
  }

  // isNullable(schema = {}, dataToValidate) {
  //   if(schema.nullable && dataToValidate === null) {
  //     return true;
  //   }
  //   this._errors.unshift('Value is null, but nullable false');
  // }

  // isNumber(schema = {}, dataToValidate) {
  //   if((schema.type === typeof dataToValidate) && typeof dataToValidate !== 'object') {
  //     console.log('da');
  //     return true;
  //   }
  //   this._errors.unshift('Type is incorrect');
  // }


  isNumber(schema, dataToValidate) {
    return new Promise(function(resolve, reject) {
      for (let key in schema) {
        switch(key) {
          case 'type': 
            if(typeof dataToValidate === 'number') {
              resolve(true);
            } else {
              this._errors.unshift('Type is incorrect');
              reject(false);
            }
            break;
          case 'minimum':
            break;
          case 'maximum':
            break;
          case 'enum':
            if(arr.includes(schema.enum, dataToValidate)) {
              resolve(true);
            } else {
              this._errors.unshift('The enum does not support value');
              reject(false);
            }
            break;
          default:
            this._errors.unshift('The enum does not support value');
            reject(false);
            break;
        }
      }  
  }); 
  }


  // isString() {}

  // isArray(schema, dataToValidate) {
  //   if(schema.type === 'array' && Array.isArray(dataToValidate)) {
  //     return true;
  //   }
  //   this._errors.unshift('Type is incorrect');
  // }
  
  // isObject() {}

  
  // inArray(schema = {}, dataToValidate) {
  //   if(schema.type === 'array' && arr.includes(schema.contains, dataToValidate)) {
  //     return true;
  //   }
  //   this._errors.unshift('Must contain a value, but does not');
  // }

  /**
   *
   * @param schema
   * @param dataToValidate
   * @returns {boolean}
   */
  isValid(schema = {}, dataToValidate) {
    switch(schema.type) {
      case 'number':
      console.log(schema.type);
      this.isNumber(schema, dataToValidate).then(function(value) {
        return true; // Успех!+
      }, function(reason) {
        return false; // Ошибка!
      });
      console.log(schema.type);
        // return this.isNumber(schema, dataToValidate);
      case 'string':
        return this.isString(schema, dataToValidate);
      case 'array':
        return this.isArray(schema, dataToValidate);
      case 'object':
        return this.isObject(schema, dataToValidate);
      default:
        return false;
    }
    // console.log(schema.contains);

    // if(this.isNullable(schema, dataToValidate) || this.isNumber(schema, dataToValidate) || this.isArray(schema, dataToValidate)) {
    //   return true;
    // }
    // console.log(schema.nullable);  
  }
}
