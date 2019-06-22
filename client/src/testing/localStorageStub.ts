export class LocalStorageStub {
  constructor() {
    Object.defineProperty(this, 'getItem', {
      enumerable: false,
      value: key => this[key] || null
    });
    Object.defineProperty(this, 'setItem', {
      enumerable: false,
      value: (key, val = '') => {
        this[key] = val + '';
      }
    });
    Object.defineProperty(this, 'removeItem', {
      enumerable: false,
      value: key => {
        delete this[key];
      }
    });
    Object.defineProperty(this, 'clear', {
      enumerable: false,
      value: () => {
        Object.keys(this).map(key => delete this[key]);
      }
    });
    Object.defineProperty(this, 'toString', {
      enumerable: false,
      value: () => {
        return '[object Storage]';
      }
    });
    Object.defineProperty(this, 'key', {
      enumerable: false,
      value: idx => Object.keys(this)[idx] || null
    });
  }

  get length() {
    return Object.keys(this).length;
  }
}
