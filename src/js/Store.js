const defaultStore = {
    comicsOwned: [],
    comicsToBuy: [],
  };
  
  class Store {
    data = JSON.parse(localStorage.getItem('comicsdb')) || defaultStore;
    setValue = (key, value) => {
      this.data[key] = value;
      localStorage.setItem('comicsdb', JSON.stringify(this.data));
    }
    getValue = (key) => {
      return this.data[key];
    }
  }
  
  const appStore = new Store();
  
  export default appStore;
