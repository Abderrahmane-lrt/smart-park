export const languages = {
  en: {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    dir: "ltr",
  },
  fr: {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
    dir: "ltr",
  },
  ar: {
    code: "ar",
    name: "العربية",
    flag: "🇲🇦",
    dir: "rtl",
  },
} as const

export type Language = keyof typeof languages

export const translations = {
  en: {
    // Navigation
    findParking: "Find Parking",
    myBookings: "My Bookings",
    history: "History",
    signUp: "Sign Up",
    signIn: "Sign In",
    logout: "Logout",

    // Main page
    searchPlaceholder: "Search parking spots in Morocco...",
    filters: "Filters",
    map: "Map",
    list: "List",
    availableSpots: "Available Spots",
    avgDistance: "Avg. Distance",
    avgPrice: "Avg. Price",

    // Map
    yourLocation: "Your Location",
    myLocation: "My Location",
    showNearby: "Show Nearby",
    radius: "Radius",
    searchRadius: "Search Radius",
    legend: "Legend",
    nearbyParking: "Nearby parking (within radius)",
    distantParking: "Distant parking",
    limitedSpots: "Limited spots (1-5)",
    full: "Full",

    // Parking details
    rating: "Rating",
    distance: "Distance",
    perHour: "per hour",
    features: "Features",
    availability: "Availability",
    high: "High",
    medium: "Medium",
    low: "Low",
    bookThisSpot: "Book This Spot",
    fullyBooked: "Fully Booked",
    bookNearbySpot: "Book Nearby Spot",
    bookNow: "Book Now",

    // Booking modal
    bookParkingSpot: "Book Parking Spot",
    bookingDetails: "Booking Details",
    date: "Date",
    startTime: "Start Time",
    endTime: "End Time",
    duration: "Duration",
    hours: "hours",
    rate: "Rate",
    total: "Total",
    paymentMethod: "Payment Method",
    creditCard: "Credit Card",
    comingSoon: "Coming soon",
    cancel: "Cancel",
    signInToBook: "Sign In to Book",

    // Authentication
    welcomeToParksmart: "Welcome to ParkSmart",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot your password?",
    continueWithGoogle: "Continue with Google",
    continueWithFacebook: "Continue with Facebook",
    createAccount: "Create Account",
    creatingAccount: "Creating Account...",
    signingIn: "Signing In...",

    // Footer
    aboutUs: "About Us",
    howItWorks: "How It Works",
    careers: "Careers",
    press: "Press",
    helpCenter: "Help Center",
    contactUs: "Contact Us",
    safety: "Safety",
    communityGuidelines: "Community Guidelines",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    cookiePolicy: "Cookie Policy",
    accessibility: "Accessibility",
    downloadOurApp: "Download Our App",
    followUs: "Follow Us",
    madeInMorocco: "Made in Morocco",
    poweredByOpenStreetMap: "Powered by OpenStreetMap",

    // Cities
    casablanca: "Casablanca",
    rabat: "Rabat",
    marrakech: "Marrakech",
    fez: "Fez",
    tangier: "Tangier",
    agadir: "Agadir",

    // Status
    active: "Active",
    upcoming: "Upcoming",
    completed: "Completed",
    confirmed: "Confirmed",

    // Common
    close: "Close",
    done: "Done",
    loading: "Loading",
    error: "Error",
    success: "Success",
    noResults: "No results found",
    tryAgain: "Try Again",
  },

  fr: {
    // Navigation
    findParking: "Trouver un Parking",
    myBookings: "Mes Réservations",
    history: "Historique",
    signUp: "S'inscrire",
    signIn: "Se connecter",
    logout: "Déconnexion",

    // Main page
    searchPlaceholder: "Rechercher des places de parking au Maroc...",
    filters: "Filtres",
    map: "Carte",
    list: "Liste",
    availableSpots: "Places Disponibles",
    avgDistance: "Distance Moy.",
    avgPrice: "Prix Moyen",

    // Map
    yourLocation: "Votre Position",
    myLocation: "Ma Position",
    showNearby: "Afficher à Proximité",
    radius: "Rayon",
    searchRadius: "Rayon de Recherche",
    legend: "Légende",
    nearbyParking: "Parking à proximité (dans le rayon)",
    distantParking: "Parking distant",
    limitedSpots: "Places limitées (1-5)",
    full: "Complet",

    // Parking details
    rating: "Note",
    distance: "Distance",
    perHour: "par heure",
    features: "Caractéristiques",
    availability: "Disponibilité",
    high: "Élevée",
    medium: "Moyenne",
    low: "Faible",
    bookThisSpot: "Réserver cette Place",
    fullyBooked: "Complet",
    bookNearbySpot: "Réserver Place Proche",
    bookNow: "Réserver Maintenant",

    // Booking modal
    bookParkingSpot: "Réserver une Place",
    bookingDetails: "Détails de la Réservation",
    date: "Date",
    startTime: "Heure de Début",
    endTime: "Heure de Fin",
    duration: "Durée",
    hours: "heures",
    rate: "Tarif",
    total: "Total",
    paymentMethod: "Méthode de Paiement",
    creditCard: "Carte de Crédit",
    comingSoon: "Bientôt disponible",
    cancel: "Annuler",
    signInToBook: "Se connecter pour Réserver",

    // Authentication
    welcomeToParksmart: "Bienvenue sur ParkSmart",
    email: "Email",
    password: "Mot de passe",
    fullName: "Nom Complet",
    phoneNumber: "Numéro de Téléphone",
    confirmPassword: "Confirmer le Mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    continueWithGoogle: "Continuer avec Google",
    continueWithFacebook: "Continuer avec Facebook",
    createAccount: "Créer un Compte",
    creatingAccount: "Création du compte...",
    signingIn: "Connexion...",

    // Footer
    aboutUs: "À Propos",
    howItWorks: "Comment ça Marche",
    careers: "Carrières",
    press: "Presse",
    helpCenter: "Centre d'Aide",
    contactUs: "Nous Contacter",
    safety: "Sécurité",
    communityGuidelines: "Règles de la Communauté",
    termsOfService: "Conditions d'Utilisation",
    privacyPolicy: "Politique de Confidentialité",
    cookiePolicy: "Politique des Cookies",
    accessibility: "Accessibilité",
    downloadOurApp: "Télécharger notre App",
    followUs: "Nous Suivre",
    madeInMorocco: "Fabriqué au Maroc",
    poweredByOpenStreetMap: "Propulsé par OpenStreetMap",

    // Cities
    casablanca: "Casablanca",
    rabat: "Rabat",
    marrakech: "Marrakech",
    fez: "Fès",
    tangier: "Tanger",
    agadir: "Agadir",

    // Status
    active: "Actif",
    upcoming: "À venir",
    completed: "Terminé",
    confirmed: "Confirmé",

    // Common
    close: "Fermer",
    done: "Terminé",
    loading: "Chargement",
    error: "Erreur",
    success: "Succès",
    noResults: "Aucun résultat trouvé",
    tryAgain: "Réessayer",
  },

  ar: {
    // Navigation
    findParking: "البحث عن موقف",
    myBookings: "حجوزاتي",
    history: "التاريخ",
    signUp: "إنشاء حساب",
    signIn: "تسجيل الدخول",
    logout: "تسجيل الخروج",

    // Main page
    searchPlaceholder: "البحث عن مواقف السيارات في المغرب...",
    filters: "المرشحات",
    map: "الخريطة",
    list: "القائمة",
    availableSpots: "الأماكن المتاحة",
    avgDistance: "متوسط المسافة",
    avgPrice: "متوسط السعر",

    // Map
    yourLocation: "موقعك",
    myLocation: "موقعي",
    showNearby: "إظهار القريب",
    radius: "نصف القطر",
    searchRadius: "نطاق البحث",
    legend: "وسيلة الإيضاح",
    nearbyParking: "مواقف قريبة (ضمن النطاق)",
    distantParking: "مواقف بعيدة",
    limitedSpots: "أماكن محدودة (1-5)",
    full: "ممتلئ",

    // Parking details
    rating: "التقييم",
    distance: "المسافة",
    perHour: "في الساعة",
    features: "المميزات",
    availability: "التوفر",
    high: "عالي",
    medium: "متوسط",
    low: "منخفض",
    bookThisSpot: "احجز هذا المكان",
    fullyBooked: "محجوز بالكامل",
    bookNearbySpot: "احجز مكان قريب",
    bookNow: "احجز الآن",

    // Booking modal
    bookParkingSpot: "حجز مكان وقوف",
    bookingDetails: "تفاصيل الحجز",
    date: "التاريخ",
    startTime: "وقت البداية",
    endTime: "وقت النهاية",
    duration: "المدة",
    hours: "ساعات",
    rate: "السعر",
    total: "المجموع",
    paymentMethod: "طريقة الدفع",
    creditCard: "بطاقة ائتمان",
    comingSoon: "قريباً",
    cancel: "إلغاء",
    signInToBook: "سجل الدخول للحجز",

    // Authentication
    welcomeToParksmart: "مرحباً بك في بارك سمارت",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    confirmPassword: "تأكيد كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    continueWithGoogle: "المتابعة مع جوجل",
    continueWithFacebook: "المتابعة مع فيسبوك",
    createAccount: "إنشاء حساب",
    creatingAccount: "جاري إنشاء الحساب...",
    signingIn: "جاري تسجيل الدخول...",

    // Footer
    aboutUs: "من نحن",
    howItWorks: "كيف يعمل",
    careers: "الوظائف",
    press: "الصحافة",
    helpCenter: "مركز المساعدة",
    contactUs: "اتصل بنا",
    safety: "الأمان",
    communityGuidelines: "إرشادات المجتمع",
    termsOfService: "شروط الخدمة",
    privacyPolicy: "سياسة الخصوصية",
    cookiePolicy: "سياسة ملفات تعريف الارتباط",
    accessibility: "إمكانية الوصول",
    downloadOurApp: "حمل تطبيقنا",
    followUs: "تابعنا",
    madeInMorocco: "صنع في المغرب",
    poweredByOpenStreetMap: "مدعوم بواسطة OpenStreetMap",

    // Cities
    casablanca: "الدار البيضاء",
    rabat: "الرباط",
    marrakech: "مراكش",
    fez: "فاس",
    tangier: "طنجة",
    agadir: "أكادير",

    // Status
    active: "نشط",
    upcoming: "قادم",
    completed: "مكتمل",
    confirmed: "مؤكد",

    // Common
    close: "إغلاق",
    done: "تم",
    loading: "جاري التحميل",
    error: "خطأ",
    success: "نجح",
    noResults: "لا توجد نتائج",
    tryAgain: "حاول مرة أخرى",
  },
} as const

export type TranslationKey = keyof typeof translations.en
