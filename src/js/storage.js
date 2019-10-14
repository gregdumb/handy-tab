import defaults from './defaults';

class Storage {
  constructor(key, defaults) {
    this.key = key;
    this.defaults = defaults;
    this.cache = null;
  }

  async get() {
    return new Promise(resolve => {
      if (this.cache) {
        resolve(this.cache);
      } else {
        chrome.storage.sync.get(this.key, result => {
          const resultValue = result[this.key];
          if (resultValue) {
            this.cache = resultValue;
            resolve(resultValue);
          } else {
            resolve(this.defaults);
          }
        });
      }
    });
  }

  async save(values) {
    return new Promise(resolve => {
      const data = { [this.key]: values };
      chrome.storage.sync.set(data, () => {
        this.cache = values;
        resolve();
      });
    })
  }
}

export const linkStorage = new Storage('links', defaults.links);
