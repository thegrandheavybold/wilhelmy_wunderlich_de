export default {
  url: "https://www.zahnaerzte-in-ratingen.de",
  baseUrl: "/",
  name: "Wilhelmy-Wunderlich",
  author: "Christian Kriegsheim",
  metaImage: "1200/home_hero_01.jpg",
  metaTitle: "Zahnarztpraxis Wilhelmy-Wunderlich",
  metaDescription: "Zahnarztpraxis und Team Dr. Julia Wilhelmy-Wunderlich",
  locale: "de_DE",
  themeColor: "#CB0B0F",
  logo: "/assets/fav/android-chrome-512x512.png",
  contact: {
    email: "praxis@zahnaerzte-in-ratingen.de",
    telephone: "+49 2102 847373",
    faxNumber: "+49 2102 870805"
  },
  address: {
    streetAddress: "Lochnerstraße 43",
    postalCode: "40878",
    addressLocality: "Ratingen",
    addressCountry: "DE"
  },
  geo: {
    latitude: 51.28987,
    longitude: 6.83994
  },
  openingHours: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Thursday"],
      opens: "07:00",
      closes: "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Wednesday"],
      opens: "07:30",
      closes: "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "07:00",
      closes: "14:00"
    }
  ]
};
