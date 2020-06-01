import React from 'react';
import {  ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

export default ({language,getLanguages,languages,setLanguage}) => {
  const [lang, setLang] = React.useState(language);
  
  React.useEffect(() => {
    getLanguages()    
    // eslint-disable-next-line 
  },[])

  React.useEffect(() => {    
    setLanguage(lang);     
    // eslint-disable-next-line 
  },[languages])

  const handleLanguage = (event, newLanguage) => {   
      if(newLanguage){
        setLang(newLanguage);    
        setLanguage(newLanguage);    
      } 
  };

  return (
      <ToggleButtonGroup
      value={lang}
      exclusive
      onChange={handleLanguage}
      aria-label="text alignment"
      className="header-input-field"
    >
      <ToggleButton value="en" aria-label="English">
        EN
      </ToggleButton>
      <ToggleButton value="fr" aria-label="French">
        FR
      </ToggleButton>
      </ToggleButtonGroup>
  )
};
