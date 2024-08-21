// LanguageSwitcher.js;

import React from 'react';
import { supportedLanguages } from './config';

const LanguageSwitcher = () => {
  const handleChangeLanguage = (language) => {
    // Logique pour changer la langue dans l'application
    // Peut-être stocker la langue sélectionnée dans le state ou les cookies
  };

  return (
    <div>
      <label>Choisir la Langue:</label>
      <select onChange={(e) => handleChangeLanguage(e.target.value)}>
        {supportedLanguages.map((lang) => (
          <option key={lang} value={lang}>{lang.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
