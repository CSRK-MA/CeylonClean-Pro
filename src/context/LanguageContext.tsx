import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'si' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.workers': 'Workers',
    'nav.pricing': 'Pricing',
    'nav.testimonials': 'Testimonials',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.book': 'Book Now',
    
    // Hero Section
    'hero.title': 'Book a Trusted Cleaner Anywhere in Sri Lanka',
    'hero.subtitle': 'Daily or Hourly | Homes, Offices, Events',
    'hero.cta.book': 'Book Now',
    'hero.cta.quote': 'Get a Quote',
    'hero.feature.verified': 'Background Verified',
    'hero.feature.rated': 'Customer-Rated',
    'hero.feature.flexible': 'Flexible Timing',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Discover our range of professional cleaning and maintenance services tailored to your specific needs.',
    'services.all': 'All Services',
    'services.home': 'Home Cleaning',
    'services.office': 'Office Cleaning',
    'services.event': 'Event Cleanup',
    'services.garden': 'Garden Maintenance',
    'services.elderly': 'Elderly Help',
    'services.laundry': 'Laundry & Ironing',
    'services.viewDetails': 'View Details',
    'services.bookNow': 'Book Now',
    
    // Workers
    'workers.title': 'Available Helpers Today',
    'workers.subtitle': 'Meet our trusted and highly-rated cleaning professionals available for booking today.',
    'workers.viewAll': 'View All Cleaners',
    'workers.specializes': 'Specializes in:',
    'workers.book': 'Book',
    
    // How it works
    'howItWorks.title': 'How It Works',
    'howItWorks.subtitle': 'Booking a cleaner with CeylonClean Pro is quick and easy. Follow these simple steps.',
    'howItWorks.step1.title': 'Choose Your Service',
    'howItWorks.step1.desc': 'Browse through our range of cleaning services and select the one that fits your needs.',
    'howItWorks.step2.title': 'Book a Time',
    'howItWorks.step2.desc': 'Select your preferred date and time, along with any specific requirements you might have.',
    'howItWorks.step3.title': 'Relax & Enjoy',
    'howItWorks.step3.desc': 'Our professional cleaners will arrive at your doorstep ready to transform your space.',
    
    // Testimonials
    'testimonials.title': 'What Our Customers Say',
    'testimonials.from': 'from',
    'testimonials.reviews': 'reviews',
    'testimonials.writeReview': 'Write a Review',
    'testimonials.shareExperience': 'Share Your Experience',
    'testimonials.shareDesc': 'We value your feedback! Let us know about your experience with our cleaning services.',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDesc': 'Subscribe for special offers and updates',
    'footer.subscribe': 'Subscribe',
    'footer.copyright': 'All rights reserved.',
    'footer.businessReg': 'Business Registration: LK1234567890',
    
    // Common
    'common.price': 'Price:',
    'common.duration': 'Duration:',
    'common.rating': 'rating',
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    
    // Booking
    'booking.title': 'Book Your Cleaning Service',
    'booking.subtitle': 'Complete the steps below to book your preferred service, date, and cleaner.',
    'booking.step.service': 'Service',
    'booking.step.cleaner': 'Cleaner',
    'booking.step.datetime': 'Date & Time',
    'booking.step.confirm': 'Confirm',
    'booking.selectService': 'Select a Service',
    'booking.selectCleaner': 'Select a Cleaner',
    'booking.selectDate': 'Select Date',
    'booking.selectTime': 'Select Time',
    'booking.duration': 'Duration (hours)',
    'booking.location': 'Your Location',
    'booking.summary': 'Booking Summary',
    'booking.total': 'Total:',
    'booking.confirm': 'Confirm Booking',
    'booking.previous': 'Previous',
    'booking.next': 'Next',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions or need a custom quote? We\'re here to help. Reach out to our team.',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.office': 'Office',
    'contact.name': 'Your Name',
    'contact.emailAddress': 'Email Address',
    'contact.phoneNumber': 'Phone Number',
    'contact.subject': 'Subject',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    
    // CTA
    'cta.title': 'Ready to Experience the Best Cleaning Service?',
    'cta.subtitle': 'Join thousands of satisfied customers across Sri Lanka who trust CeylonClean Pro for all their cleaning needs.',
    'cta.book': 'Book Now',
    'cta.contact': 'Contact Us',
  },
  
  si: {
    // Header
    'nav.home': 'මුල් පිටුව',
    'nav.services': 'සේවා',
    'nav.workers': 'සේවකයින්',
    'nav.pricing': 'මිල ගණන්',
    'nav.testimonials': 'සාක්ෂි',
    'nav.faq': 'නිතර අසන ප්‍රශ්න',
    'nav.contact': 'සම්බන්ධතා',
    'nav.book': 'වෙන්කරවන්න',
    
    // Hero Section
    'hero.title': 'ශ්‍රී ලංකාවේ ඕනෑම තැනක විශ්වාසදායක පිරිසිදුකරන්නෙකු වෙන්කරවන්න',
    'hero.subtitle': 'දිනපතා හෝ පැයකට | නිවාස, කාර්යාල, උත්සව',
    'hero.cta.book': 'වෙන්කරවන්න',
    'hero.cta.quote': 'මිල ගණන් ලබාගන්න',
    'hero.feature.verified': 'පසුබිම් සත්‍යාපිත',
    'hero.feature.rated': 'පාරිභෝගික ශ්‍රේණිගත',
    'hero.feature.flexible': 'නම්‍යශීලී වේලාව',
    
    // Services
    'services.title': 'අපගේ සේවා',
    'services.subtitle': 'ඔබගේ විශේෂ අවශ්‍යතා සඳහා සකස් කරන ලද වෘත්තීය පිරිසිදුකිරීම් සහ නඩත්තු සේවා පරාසය සොයාගන්න.',
    'services.all': 'සියලුම සේවා',
    'services.home': 'නිවාස පිරිසිදුකිරීම',
    'services.office': 'කාර්යාල පිරිසිදුකිරීම',
    'services.event': 'උත්සව පිරිසිදුකිරීම',
    'services.garden': 'උයන නඩත්තුව',
    'services.elderly': 'වැඩිහිටි උපකාර',
    'services.laundry': 'රෙදි සේදීම සහ ඇදීම',
    'services.viewDetails': 'විස්තර බලන්න',
    'services.bookNow': 'වෙන්කරවන්න',
    
    // Workers
    'workers.title': 'අද ලබාගත හැකි උපකාරකයින්',
    'workers.subtitle': 'අද වෙන්කරවීම සඳහා ලබාගත හැකි අපගේ විශ්වාසදායක සහ ඉහළ ශ්‍රේණිගත පිරිසිදුකිරීමේ වෘත්තිකයන් හමුවන්න.',
    'workers.viewAll': 'සියලුම පිරිසිදුකරන්නන් බලන්න',
    'workers.specializes': 'විශේෂඥතාව:',
    'workers.book': 'වෙන්කරවන්න',
    
    // How it works
    'howItWorks.title': 'එය ක්‍රියා කරන ආකාරය',
    'howItWorks.subtitle': 'CeylonClean Pro සමඟ පිරිසිදුකරන්නෙකු වෙන්කරවීම ඉක්මන් සහ පහසුය. මෙම සරල පියවර අනුගමනය කරන්න.',
    'howItWorks.step1.title': 'ඔබගේ සේවාව තෝරන්න',
    'howItWorks.step1.desc': 'අපගේ පිරිසිදුකිරීමේ සේවා පරාසය පිරික්සා ඔබගේ අවශ්‍යතාවන්ට ගැලපෙන එක තෝරන්න.',
    'howItWorks.step2.title': 'වේලාවක් වෙන්කරවන්න',
    'howItWorks.step2.desc': 'ඔබගේ කැමති දිනය සහ වේලාව, ඔබට ඇති විශේෂ අවශ්‍යතා සමඟ තෝරන්න.',
    'howItWorks.step3.title': 'විවේක ගෙන සතුටින් සිටින්න',
    'howItWorks.step3.desc': 'අපගේ වෘත්තීය පිරිසිදුකරන්නන් ඔබගේ ස්ථානය පරිවර්තනය කිරීමට සූදානම්ව ඔබගේ දොරටුවට පැමිණෙනු ඇත.',
    
    // Testimonials
    'testimonials.title': 'අපගේ පාරිභෝගිකයින් කියන දේ',
    'testimonials.from': 'සිට',
    'testimonials.reviews': 'සමාලෝචන',
    'testimonials.writeReview': 'සමාලෝචනයක් ලියන්න',
    'testimonials.shareExperience': 'ඔබගේ අත්දැකීම් බෙදාගන්න',
    'testimonials.shareDesc': 'අපි ඔබගේ ප්‍රතිපෝෂණය අගය කරමු! අපගේ පිරිසිදුකිරීමේ සේවා සමඟ ඔබගේ අත්දැකීම් ගැන අපට කියන්න.',
    
    // Footer
    'footer.quickLinks': 'ඉක්මන් සබැඳි',
    'footer.contact': 'අප සමඟ සම්බන්ධ වන්න',
    'footer.newsletter': 'පුවත්පත',
    'footer.newsletterDesc': 'විශේෂ පිරිනැමීම් සහ යාවත්කාලීන සඳහා දායක වන්න',
    'footer.subscribe': 'දායක වන්න',
    'footer.copyright': 'සියලුම හිමිකම් ඇවිරිණි.',
    'footer.businessReg': 'ව්‍යාපාර ලියාපදිංචිය: LK1234567890',
    
    // Common
    'common.price': 'මිල:',
    'common.duration': 'කාලසීමාව:',
    'common.rating': 'ශ්‍රේණිගතකිරීම',
    'common.close': 'වසන්න',
    'common.cancel': 'අවලංගු කරන්න',
    'common.submit': 'ඉදිරිපත් කරන්න',
    'common.loading': 'පූරණය වෙමින්...',
    'common.error': 'දෝෂය',
    'common.success': 'සාර්ථකත්වය',
    
    // Booking
    'booking.title': 'ඔබගේ පිරිසිදුකිරීමේ සේවාව වෙන්කරවන්න',
    'booking.subtitle': 'ඔබගේ කැමති සේවාව, දිනය සහ පිරිසිදුකරන්නා වෙන්කරවීම සඳහා පහත පියවර සම්පූර්ණ කරන්න.',
    'booking.step.service': 'සේවාව',
    'booking.step.cleaner': 'පිරිසිදුකරන්නා',
    'booking.step.datetime': 'දිනය සහ වේලාව',
    'booking.step.confirm': 'තහවුරු කරන්න',
    'booking.selectService': 'සේවාවක් තෝරන්න',
    'booking.selectCleaner': 'පිරිසිදුකරන්නෙකු තෝරන්න',
    'booking.selectDate': 'දිනය තෝරන්න',
    'booking.selectTime': 'වේලාව තෝරන්න',
    'booking.duration': 'කාලසීමාව (පැය)',
    'booking.location': 'ඔබගේ ස්ථානය',
    'booking.summary': 'වෙන්කරවීමේ සාරාංශය',
    'booking.total': 'මුළු එකතුව:',
    'booking.confirm': 'වෙන්කරවීම තහවුරු කරන්න',
    'booking.previous': 'පෙර',
    'booking.next': 'ඊළඟ',
    
    // Contact
    'contact.title': 'අප සමඟ සම්බන්ධ වන්න',
    'contact.subtitle': 'ප්‍රශ්න තිබේද හෝ අභිරුචි මිල ගණනක් අවශ්‍යද? අපි උදව් කිරීමට මෙහි සිටිමු. අපගේ කණ්ඩායම සමඟ සම්බන්ධ වන්න.',
    'contact.phone': 'දුරකථනය',
    'contact.email': 'විද්‍යුත් තැපෑල',
    'contact.office': 'කාර්යාලය',
    'contact.name': 'ඔබගේ නම',
    'contact.emailAddress': 'විද්‍යුත් තැපැල් ලිපිනය',
    'contact.phoneNumber': 'දුරකථන අංකය',
    'contact.subject': 'විෂයය',
    'contact.message': 'ඔබගේ පණිවිඩය',
    'contact.send': 'පණිවිඩය යවන්න',
    
    // CTA
    'cta.title': 'හොඳම පිරිසිදුකිරීමේ සේවාව අත්විඳීමට සූදානම්ද?',
    'cta.subtitle': 'ඔවුන්ගේ සියලුම පිරිසිදුකිරීමේ අවශ්‍යතා සඳහා CeylonClean Pro විශ්වාස කරන ශ්‍රී ලංකාව පුරා සිටින සෑහීමකට පත් පාරිභෝගිකයින් දහස් ගණනකට සම්බන්ධ වන්න.',
    'cta.book': 'වෙන්කරවන්න',
    'cta.contact': 'අප සමඟ සම්බන්ධ වන්න',
  },
  
  ta: {
    // Header
    'nav.home': 'முகப்பு',
    'nav.services': 'சேவைகள்',
    'nav.workers': 'பணியாளர்கள்',
    'nav.pricing': 'விலை நிர்ணயம்',
    'nav.testimonials': 'சாட்சியங்கள்',
    'nav.faq': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    'nav.contact': 'தொடர்பு',
    'nav.book': 'இப்போது பதிவு செய்யுங்கள்',
    
    // Hero Section
    'hero.title': 'இலங்கையில் எங்கும் நம்பகமான சுத்தம் செய்பவரை பதிவு செய்யுங்கள்',
    'hero.subtitle': 'தினசரி அல்லது மணிநேர அடிப்படையில் | வீடுகள், அலுவலகங்கள், நிகழ்வுகள்',
    'hero.cta.book': 'இப்போது பதிவு செய்யுங்கள்',
    'hero.cta.quote': 'மேற்கோள் பெறுங்கள்',
    'hero.feature.verified': 'பின்னணி சரிபார்க்கப்பட்டது',
    'hero.feature.rated': 'வாடிக்கையாளர் மதிப்பிட்டது',
    'hero.feature.flexible': 'நெகிழ்வான நேரம்',
    
    // Services
    'services.title': 'எங்கள் சேவைகள்',
    'services.subtitle': 'உங்கள் குறிப்பிட்ட தேவைகளுக்கு ஏற்ப வடிவமைக்கப்பட்ட எங்கள் தொழில்முறை சுத்தம் மற்றும் பராமரிப்பு சேவைகளின் வரம்பைக் கண்டறியுங்கள்.',
    'services.all': 'அனைத்து சேவைகள்',
    'services.home': 'வீட்டு சுத்தம்',
    'services.office': 'அலுவலக சுத்தம்',
    'services.event': 'நிகழ்வு சுத்தம்',
    'services.garden': 'தோட்ட பராமரிப்பு',
    'services.elderly': 'முதியோர் உதவி',
    'services.laundry': 'சலவை மற்றும் இஸ்திரி',
    'services.viewDetails': 'விவரங்களைப் பார்க்கவும்',
    'services.bookNow': 'இப்போது பதிவு செய்யுங்கள்',
    
    // Workers
    'workers.title': 'இன்று கிடைக்கும் உதவியாளர்கள்',
    'workers.subtitle': 'இன்று பதிவு செய்வதற்கு கிடைக்கும் எங்கள் நம்பகமான மற்றும் உயர் மதிப்பிடப்பட்ட சுத்தம் செய்யும் நிபுணர்களை சந்திக்கவும்.',
    'workers.viewAll': 'அனைத்து சுத்தம் செய்பவர்களையும் பார்க்கவும்',
    'workers.specializes': 'நிபுணத்துவம்:',
    'workers.book': 'பதிவு செய்யுங்கள்',
    
    // How it works
    'howItWorks.title': 'இது எவ்வாறு செயல்படுகிறது',
    'howItWorks.subtitle': 'CeylonClean Pro உடன் சுத்தம் செய்பவரை பதிவு செய்வது விரைவானது மற்றும் எளிதானது. இந்த எளிய படிகளைப் பின்பற்றவும்.',
    'howItWorks.step1.title': 'உங்கள் சேவையைத் தேர்ந்தெடுக்கவும்',
    'howItWorks.step1.desc': 'எங்கள் சுத்தம் செய்யும் சேவைகளின் வரம்பைப் பார்த்து உங்கள் தேவைகளுக்கு ஏற்றதைத் தேர்ந்தெடுக்கவும்.',
    'howItWorks.step2.title': 'நேரத்தை பதிவு செய்யுங்கள்',
    'howItWorks.step2.desc': 'உங்கள் விருப்பமான தேதி மற்றும் நேரத்தை, உங்களுக்கு இருக்கும் குறிப்பிட்ட தேவைகளுடன் தேர்ந்தெடுக்கவும்.',
    'howItWorks.step3.title': 'ஓய்வெடுத்து மகிழுங்கள்',
    'howItWorks.step3.desc': 'எங்கள் தொழில்முறை சுத்தம் செய்பவர்கள் உங்கள் இடத்தை மாற்றுவதற்கு தயாராக உங்கள் வீட்டு வாசலுக்கு வருவார்கள்.',
    
    // Testimonials
    'testimonials.title': 'எங்கள் வாடிக்கையாளர்கள் சொல்வது',
    'testimonials.from': 'இலிருந்து',
    'testimonials.reviews': 'மதிப்புரைகள்',
    'testimonials.writeReview': 'மதிப்புரை எழுதுங்கள்',
    'testimonials.shareExperience': 'உங்கள் அனுபவத்தைப் பகிருங்கள்',
    'testimonials.shareDesc': 'நாங்கள் உங்கள் கருத்துக்களை மதிக்கிறோம்! எங்கள் சுத்தம் செய்யும் சேவைகளுடனான உங்கள் அனுபவத்தைப் பற்றி எங்களுக்குத் தெரியப்படுத்துங்கள்.',
    
    // Footer
    'footer.quickLinks': 'விரைவு இணைப்புகள்',
    'footer.contact': 'எங்களைத் தொடர்பு கொள்ளுங்கள்',
    'footer.newsletter': 'செய்திமடல்',
    'footer.newsletterDesc': 'சிறப்பு சலுகைகள் மற்றும் புதுப்பிப்புகளுக்கு குழுசேருங்கள்',
    'footer.subscribe': 'குழுசேருங்கள்',
    'footer.copyright': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    'footer.businessReg': 'வணிக பதிவு: LK1234567890',
    
    // Common
    'common.price': 'விலை:',
    'common.duration': 'கால அளவு:',
    'common.rating': 'மதிப்பீடு',
    'common.close': 'மூடு',
    'common.cancel': 'ரத்து செய்',
    'common.submit': 'சமர்ப்பிக்கவும்',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    
    // Booking
    'booking.title': 'உங்கள் சுத்தம் செய்யும் சேவையை பதிவு செய்யுங்கள்',
    'booking.subtitle': 'உங்கள் விருப்பமான சேவை, தேதி மற்றும் சுத்தம் செய்பவரை பதிவு செய்ய கீழே உள்ள படிகளை முடிக்கவும்.',
    'booking.step.service': 'சேவை',
    'booking.step.cleaner': 'சுத்தம் செய்பவர்',
    'booking.step.datetime': 'தேதி மற்றும் நேரம்',
    'booking.step.confirm': 'உறுதிப்படுத்து',
    'booking.selectService': 'ஒரு சேவையைத் தேர்ந்தெடுக்கவும்',
    'booking.selectCleaner': 'ஒரு சுத்தம் செய்பவரைத் தேர்ந்தெடுக்கவும்',
    'booking.selectDate': 'தேதியைத் தேர்ந்தெடுக்கவும்',
    'booking.selectTime': 'நேரத்தைத் தேர்ந்தெடுக்கவும்',
    'booking.duration': 'கால அளவு (மணிநேரங்கள்)',
    'booking.location': 'உங்கள் இடம்',
    'booking.summary': 'பதிவு சுருக்கம்',
    'booking.total': 'மொத்தம்:',
    'booking.confirm': 'பதிவை உறுதிப்படுத்து',
    'booking.previous': 'முந்தைய',
    'booking.next': 'அடுத்து',
    
    // Contact
    'contact.title': 'எங்களைத் தொடர்பு கொள்ளுங்கள்',
    'contact.subtitle': 'கேள்விகள் உள்ளதா அல்லது தனிப்பயன் மேற்கோள் தேவையா? நாங்கள் உதவ இங்கே இருக்கிறோம். எங்கள் குழுவைத் தொடர்பு கொள்ளுங்கள்.',
    'contact.phone': 'தொலைபேசி',
    'contact.email': 'மின்னஞ்சல்',
    'contact.office': 'அலுவலகம்',
    'contact.name': 'உங்கள் பெயர்',
    'contact.emailAddress': 'மின்னஞ்சல் முகவரி',
    'contact.phoneNumber': 'தொலைபேசி எண்',
    'contact.subject': 'விஷயம்',
    'contact.message': 'உங்கள் செய்தி',
    'contact.send': 'செய்தி அனுப்பு',
    
    // CTA
    'cta.title': 'சிறந்த சுத்தம் செய்யும் சேவையை அனுபவிக்க தயாரா?',
    'cta.subtitle': 'அவர்களின் அனைத்து சுத்தம் செய்யும் தேவைகளுக்காக CeylonClean Pro ஐ நம்பும் இலங்கை முழுவதும் உள்ள ஆயிரக்கணக்கான திருப்தியான வாடிக்கையாளர்களுடன் சேருங்கள்.',
    'cta.book': 'இப்போது பதிவு செய்யுங்கள்',
    'cta.contact': 'எங்களைத் தொடர்பு கொள்ளுங்கள்',
  }
};