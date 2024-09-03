import React from "react";
import { useState } from "react";
import useTranslations from '../../translations/useTranslations';


export default function LanguageSelector() {
    const translations = useTranslations();
    const [language, setLanguage] = useState(() => localStorage.getItem('@languageCinestream') || 'portuguese');
    const [languageDisabled, setLanguageDisabled] = useState(true);

    const handleEditLanguage = () => {
        setLanguageDisabled(false);
    };

    const handleSaveLanguage = () => {
        localStorage.setItem('@languageCinestream', language);
        window.location.reload();
    };
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label style={{ marginTop: '1vh' }}>{translations.language}</label>
            <select name='language' value={language} onChange={(e) => setLanguage(e.target.value)} disabled={languageDisabled}>
                <option value='portuguese'>{translations.portuguese}</option>
                <option value='english'>{translations.english}</option>
            </select>
            {languageDisabled ? (
                <button type='button' onClick={handleEditLanguage} className='button'>
                    {translations.changeLanguage}
                </button>
            ) : (
                <button type='button' onClick={handleSaveLanguage} className='button'>
                    {translations.save}
                </button>
            )}
        </form>
    )
}