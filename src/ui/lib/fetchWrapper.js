import fetch from 'isomorphic-fetch';
import qs from 'query-string';
import { ObjectBuilder } from './object.js';

const getDefaultHeaders = () => ({
    headers: {      
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'      
    }
  });
  const defaultResponseHandler = (response) => {
    if (!response.ok) {
      return Promise.resolve(
        response.text()
      ).then(
        text => {
          const serverError = new Error(text);
          serverError.status = response.status;
          throw serverError;
        }
      );
    }
    return response.text();
  };

  const defaultErrorHandler = (error) => {
    if (error.status === 401 || error.status === 403) {
      window.location.href = '/home';
      return 0;
    }
    throw error;
  };

  const activator = (query) => new Promise((resolve, reject) => {  
    setInterval(() => { 
      if(query.length<250){
        resolve();
      }        
    }, 400);
  });

 const fetchWrapper =()=> (endPointAddress) => ({
    get: (data, init) => {          
      const query = qs.stringify(data, { encode: false });      
      const input = `${endPointAddress}?${query}`;
      const requestInitBuilder = new ObjectBuilder();
      requestInitBuilder
        .add(getDefaultHeaders())
        .add({ method: 'GET' })
        .add(init);      
      return activator(query).then(() =>fetch(
        input,
        requestInitBuilder.build()
      )).then(defaultResponseHandler).catch(defaultErrorHandler);
    },
    post: (data, init) => {            
      const payload = JSON.stringify(data);
      const input = endPointAddress;
      const requestInitBuilder = new ObjectBuilder();
      requestInitBuilder
        .add(getDefaultHeaders())
        .add({ method: 'POST' })
        .add({ body: payload })
        .add(init);
      return activator().then(() =>fetch(
        input,
        requestInitBuilder.build()      
    )).then(defaultResponseHandler).catch(defaultErrorHandler);
    }
    
  });
  const constructor = () => {    
    return fetchWrapper();
  };

  export default constructor();