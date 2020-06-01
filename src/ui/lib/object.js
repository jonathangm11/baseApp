export class ObjectBuilder {
    constructor() {
      this._data = {};
    }
  
    build() {
      return this._data;
    }
  
    add(data) {
      if (!(data && Object.keys(data).length)) {
        return this;
      }
  
      this._data = {
        ...this._data,
        ...data
      };
      return this;
    }
  }
  
  
  export default {
    ObjectBuilder
  };
  