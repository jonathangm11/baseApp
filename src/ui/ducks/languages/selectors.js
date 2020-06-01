
export default {
    getWordsList: state => state.selectedData||[],
    getLanguagesList: state => state.data||[],
    getLanguage:state => state.language,
    getWordById:(state,id) => state.selectedData ? state.selectedData[id] : null
  };
  