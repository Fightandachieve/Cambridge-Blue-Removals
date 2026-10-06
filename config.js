window.SITE_CONFIG = {
  business: {
    name: "Cambridge Blue Removals",
    phone: "07459220092",
    phoneDisplay: "07459 220092",
    whatsapp: "447459220092",
    email: "info@cambridgeblueremovals.co.uk",
    address: "64 St Bedes Crescent, Cambridge, CB1 3UB",
    openingHours: {
      monSat: "08:00–19:00",
      sun: "09:00–19:00"
    }
  },

  brand: {
    navy: "#0A2342",
    cambridgeBlue: "#79B9D1",
    skyBlue: "#BFE3EE",
    white: "#FFFFFF",
    warmGold: "#C99A3D"
  },

  contact: {
    googleMapsEmbedUrl: "https://www.google.com/maps?q=64%20St%20Bedes%20Crescent%2C%20Cambridge%2C%20CB1%203UB&output=embed"
  },

  discounts: {
    moveDiscountMax: 150,
    cleaningDiscountMaxPercent: 20,
    taxiLabel: "Discounted moving-day passenger transport"
  },

  booking: {
    depositPercent: 20,
    cancellationDaysForRefund: 7,
    depositPolicy: "A 20% deposit is required upfront to secure the booking.",
    cancellationPolicy: "If you cancel at least 7 days before the agreed moving date, the deposit is refundable. If you cancel less than 7 days before the moving date, the deposit is non-refundable.",
    reschedulingPolicy: "Rescheduling is subject to availability. Please contact us as early as possible if your moving date changes."
  },

  quote: {
    // Only these items affect the automatic estimate.
    // All values can be edited here later without changing quote.js.
    basePriceUpTo30Miles: {
      "1": 350,
      "2": 550,
      "3": 700,
      "4+": 850
    },
    packingPrice: {
      "1": 150,
      "2": 200,
      "3": 300,
      "4+": 400
    },
    dismantlingReassembly: 100,
    includedMiles: 30,
    extraMilePrice: 2,

    // This is only used to turn straight-line postcode distance into a rough
    // road-mile estimate. The customer can overwrite the distance manually.
    postcodeRoadFactor: 1.22,

    // Services below are intentionally not auto-priced.
    manualQuoteItems: {
      unpacking: true,
      fragileItems: true,
      largeSpecialistItems: true,
      storage: true,
      cleaning: true,
      passengerTransport: true
    },

    vatNoteEnabled: false,
    vatNote: "",

    // Optional form backend (e.g. Formspree). Leave blank for mailto fallback.
    formEndpoint: ""
  },

  tracking: {
    gpsApiEndpoint: "",
    demoReference: "CBR-DEMO",
    demoPostcode: "CB1"
  },

  reviews: {
    googleReviewsUrl: "",
    leaveReviewUrl: ""
  }
};
