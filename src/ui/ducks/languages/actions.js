import config from '../../config/endpointsConf';
import fetchWrapper from '../../lib/fetchWrapper';
import types from './types';

export default {

  getLanguagesList: () => {
    const { languagesApi } = config;
    
    return {
      type: types.LANGUAGES_LIST,
      promise: fetchWrapper(languagesApi)
        .get({})
    };
  }  ,
  setLanguage: ({language}) => {    
    return {
      type: types.SET_LANGUAGE,
      language:language      
    };
  }  
}