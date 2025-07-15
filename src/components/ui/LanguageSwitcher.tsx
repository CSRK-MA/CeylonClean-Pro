import React from 'react';
import { useLanguage, Language } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'si' as Language, name: 'Sinhala', nativeName: 'සිංහල' },
    { code: 'ta' as Language, name: 'Tamil', nativeName: 'தமிழ்' },
  ];
  
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 transition">
        <Globe size={16} />
        <span className="text-sm">
          {languages.find(lang => lang.code === language)?.nativeName}
        </span>
      </button>
      
      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1 min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition ${
                language === lang.code ? 'bg-teal-50 text-teal-600' : 'text-gray-700'
              }`}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;