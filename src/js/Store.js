const defaultStore = {
    users: [],
  };
  
  class Store {
    data = JSON.parse(localStorage.getItem('dataStore')) || defaultStore;
    setValue = (key, value) => {
      this.data[key] = value;
      localStorage.setItem('dataStore', JSON.stringify(this.data));
    }
    getValue = (key) => {
      return this.data[key];
    }
  }
  
  const appStore = new Store();
  
  export default appStore;