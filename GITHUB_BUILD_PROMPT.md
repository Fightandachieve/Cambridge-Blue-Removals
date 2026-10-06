# CAMBRIDGE BLUE REMOVALS — MASTER GITHUB BUILD SCRIPT

Use this file as the source-of-truth implementation brief for GitHub Copilot or another coding agent.

## 1. Project goal

Build a modern, responsive website for **Cambridge Blue Removals**, a Cambridge-based removal company.

The website should feel:

- trustworthy
- punctual
- experienced
- professional
- simple to use
- easy to maintain

Use a blue-led visual identity with deep navy, Cambridge blue, white, and a restrained warm-gold CTA accent.

## 2. Editable central configuration

Keep business information, prices, discounts and integrations in one central config file:

`assets/js/config.js`

Do not hard-code changing business values across multiple pages.

Editable items must include:

- business name
- phone
- WhatsApp
- email
- address
- opening hours
- Google Maps URL
- discount amounts
- deposit/cancellation rules
- all automatic quote prices
- VAT wording
- form endpoint
- GPS endpoint

## 3. Business details

- Business name: **Cambridge Blue Removals**
- Phone: **07459 220092**
- Email: **info@cambridgeblueremovals.co.uk**
- WhatsApp: same phone number
- Address: **64 St Bedes Crescent, Cambridge, CB1 3UB**
- Mon–Sat: **08:00–19:00**
- Sunday: **09:00–19:00**

Keep every value editable in config.

## 4. Navigation

Top navigation:

- Home
- Services
- About
- FAQs
- Reviews
- Discounts
- Blog
- Contact
- Track Your Move
- CTA: Instant Quote

## 5. Homepage structure

Use this order:

1. Hero + Instant Quote CTA
2. Why Choose Us
3. Services
4. How It Works
5. Instant Quote teaser
6. Partner Discounts
7. Track Your Move
8. Gallery / Our Moves
9. Areas We Cover
10. Reviews
11. About Us placeholder
12. FAQs
13. Blog / moving advice
14. Contact + Google Maps
15. Footer

## 6. Hero

Use the supplied branded vehicle image.

Suggested headline:

> Professional removals with clear estimates and move tracking.

Include:

- Get an Instant Estimate
- Track Your Move
- click-to-call
- floating WhatsApp button
- promotion badge: **Save up to £150 on your move**

Discount amount must stay editable.

## 7. Services

Include:

- Home Removals
- Packing Services
- Unpacking — manually confirmed price unless later configured
- Storage Services — partner/manual quote
- Specialist & Vintage Item Removals
- Long Distance Removals
- Commercial Removals
- Dismantling & Reassembly

Cleaning at the **new property must NOT be offered**.

## 8. Automatic Instant Quote pricing

The calculator displays an **estimated moving cost**, not a guaranteed final quotation.

### Base moving price — includes up to 30 miles

- 1 bedroom: **£350**
- 2 bedrooms: **£550**
- 3 bedrooms: **£700**
- 4+ bedrooms: **£850**

### Extra mileage

- First 30 miles: included in the fixed property price
- Every mile over 30 miles: **£2 per mile**

Formula:

`base property price + max(distance - 30, 0) × £2 + selected priced services`

### Packing service

- 1 bedroom: **£150**
- 2 bedrooms: **£200**
- 3 bedrooms: **£300**
- 4+ bedrooms: **£400**

### Dismantling & Reassembly

- Combined service: **£100**

Do not split this into two separate automatic charges.

### Items NOT automatically priced

The following should be collected for manual review but must NOT change the automatic estimate unless prices are added later in config:

- floors at old property
- floors at new property
- lift availability at both properties
- approximate number of boxes
- unpacking
- fragile items
- large/specialist items
- storage
- partner cleaning
- partner passenger transport/taxi

## 9. Quote calculator inputs

### Journey

- moving-from postcode
- moving-to postcode
- approximate distance in miles
- button to calculate approximate distance from UK postcodes
- allow manual mileage correction

### Property

- 1 bedroom
- 2 bedrooms
- 3 bedrooms
- 4+ bedrooms

### Access

At both old and new properties:

- floor / number of floors
- lift available: Yes / No

Also show the total of the selected floor counts across both locations.

These details currently do **not** change automatic pricing; they are used during final confirmation.

### Boxes

Optional approximate number of boxes:

- 0–10
- 11–20
- 21–40
- 41–60
- 61+

No automatic box charge at present.

### Moving date and time

- Moving day/date
- Preferred pickup time

Do not make these mandatory unless the owner later requests it.

### Priced optional services

- Packing
- Dismantling & Reassembly

### Manual-price optional services

- Unpacking
- Fragile items

Clearly mark these as requiring final confirmation.

## 10. Large / specialist items

Do NOT assign prices automatically.

Do NOT make this mandatory.

Use one optional free-text box where the customer can describe items such as:

- piano
- American fridge/freezer
- safe
- large wardrobe
- large/corner sofa
- large TV
- artwork
- antiques
- gym equipment
- other heavy/unusual items

If left blank, allow the customer to continue normally.

## 11. Cleaning partner

At the end of the calculator ask:

> Would you like end-of-tenancy cleaning for the property you are leaving?

Options:

- No
- Yes — tell me about the partner discount

Important:

- old property/end-of-tenancy only
- independent cleaning partner
- do not auto-price
- current marketing wording can say **up to 20% off**, editable in config

## 12. Moving-day passenger transport partner

Ask:

> Would you like discounted passenger transport between properties?

Options:

- No
- Yes — tell me about the partner offer

Important:

- supplied by an independent partner
- do not auto-price

## 13. Storage

Add an optional storage selector.

Customer can choose from **1 day up to 12 months**.

Suggested options:

- No storage
- 1 day
- 2–7 days
- 1–2 weeks
- 3–4 weeks
- 1 month
- 2 months
- 3 months
- ...
- 12 months

Storage must NOT be automatically priced.

Display wording similar to:

> Storage pricing depends on the required period and availability. After we receive your quote request, we will check current offers with our storage partners and discuss the available option with you when confirming the final details.

## 14. Instant estimate display

Show a live price panel next to the calculator.

Example:

**Your Estimated Moving Cost**

**£750**

Breakdown example:

- 2 bedroom fixed price (up to 30 miles): £550
- Extra mileage: £0
- Packing: £200
- Dismantling & Reassembly: £0

Do not add unpriced/manual-review items to this total.

Use wording explaining that the final quotation may change after checking access, volume, specialist items and manual-price services.

## 15. Quote-request popup after calculator

The main calculator button should be:

**Continue & Request My Quote**

On click, open a modal/popup.

At the top show the calculator result as a read-only field:

**Your Estimated Moving Cost: £XXX**

This is different from the customer's own budget.

### Final form fields

Only these two fields are mandatory:

- **Full Name***
- **Email***

All of the following are optional:

- Telephone
- Your Budget
- Preferred timeframe
- Additional comments
- checkbox: “I agree to be contacted regarding this quote request.”

Do not make the contact-consent checkbox technically mandatory because the owner requested only Full Name and Email as required fields.

### Customer budget

Use:

**Your Budget (optional)**

Helper text:

> Your own target budget for the move.

Do not confuse this with the website estimate.

### Automatic hidden quote data

When the customer sends the request, also include all calculator information automatically:

- estimate
- bedroom size
- from/to postcodes
- distance
- floors at both properties
- total floors
- lift availability
- boxes
- moving date
- pickup time
- packing
- dismantling & reassembly
- unpacking
- fragile items
- large/specialist item notes
- cleaning interest
- passenger transport interest
- storage duration
- customer's own budget
- additional comments

The customer should not have to type the calculator details twice.

## 16. Quote notice

Use original wording, not copied wording from another business.

Recommended direction:

> Get an instant estimated price for your move in just a few minutes. The automatic estimate is based on the details you provide and the current pricing settings. It is not a final confirmed quotation. Your final price may change after we check access, parking, actual volume, specialist items and any services that require manual pricing. After you submit your request, a member of the Cambridge Blue Removals team will contact you to confirm the move details, apply any eligible discounts and finalise the quotation.

VAT wording must remain disabled/configurable until the business VAT status is confirmed.

## 17. Booking process

Use this customer journey:

**Instant Estimate → Quote Request → Final Quote Confirmation → Booking → 20% Deposit → Move**

Do not treat the initial estimate as a confirmed booking.

## 18. Deposit, cancellation and rescheduling

Keep all wording editable in config.

Current policy:

- **20% deposit upfront** to secure the booking
- cancellation at least **7 calendar days before** the moving date: deposit refundable
- cancellation less than **7 calendar days before** the moving date: deposit non-refundable
- rescheduling: subject to availability; customer should contact the business as early as possible

Do not invent extra fees.

## 19. Track Your Move

Provide both:

### Status tracking

Customer enters:

- booking reference
- postcode

Timeline:

- Booking confirmed
- Team assigned
- Team en route
- Loading in progress
- In transit
- Arrived / unloading
- Move completed

### Live GPS ready

Prepare the front-end for a secure GPS/backend integration.

Message direction:

> Not at the property? No problem. Follow the progress of your move with status updates and live vehicle tracking where available.

Never put secret GPS/API credentials in public GitHub code.

## 20. Reviews

Include:

- homepage Reviews section
- dedicated Reviews page
- future Google Reviews link
- Leave a Review button

Do not invent testimonials or star ratings. Use placeholders until genuine reviews are available.

## 21. About Us

Create the section and page but leave the main company story as an editable placeholder.

Do not invent:

- years of experience
- insurance cover
- accreditations
- team history

## 22. Why Choose Us

Use safe/planned features such as:

- Transparent Estimates
- Move Status Updates
- Live GPS Ready
- Packing & Storage Options
- Clear Add-ons
- Partner Discounts
- Cambridge Focus

Only display claims such as “Fully Insured” once verified.

## 23. Areas We Cover

Starter areas:

- Cambridge
- Trumpington
- Cherry Hinton
- Histon
- Milton
- Cambourne
- Ely
- Newmarket
- long-distance UK moves

Keep easy to expand for SEO landing pages.

## 24. Gallery

Use supplied logo and branded van/team images from `assets/images/`.

Make them easy to replace later with genuine business photography.

## 25. Blog starter topics

- Moving House in Cambridge: Complete Checklist
- How Much Does a Removal Company Cost in Cambridge?
- Moving from Cambridge to London: What to Expect
- Packing and End-of-Tenancy Cleaning Around Moving Day

## 26. Contact / Reach Out

Display:

- Phone: 07459 220092
- Email: info@cambridgeblueremovals.co.uk
- Address: 64 St Bedes Crescent, Cambridge, CB1 3UB
- Mon–Sat: 08:00–19:00
- Sun: 09:00–19:00
- embedded Google Maps location

All editable from config.

## 27. Legal/customer resources

Create:

- Moving Checklist
- Privacy Policy
- Cookie Policy
- Terms & Conditions
- cookie banner

Terms page must include editable sections for:

- estimates and final quotes
- booking/deposit
- cancellation
- rescheduling
- waiting time/delays
- parking/access
- prohibited items
- fragile/specialist items
- liability/insurance
- partner services
- VAT

## 28. Technical requirements

- GitHub Pages compatible
- responsive/mobile-first
- semantic HTML
- accessible form labels/buttons
- click-to-call
- click-to-email
- WhatsApp deep link
- central config
- no secrets in repository
- live calculator updates
- manual distance override
- secure configurable form endpoint
- mailto fallback when no backend exists
- GPS endpoint placeholder only
- SEO page titles/descriptions
- keep visual design clean and uncluttered

## 29. Visual direction

Current palette:

- Deep navy: `#0A2342`
- Cambridge blue: `#79B9D1`
- Light blue: `#BFE3EE`
- White: `#FFFFFF`
- Warm gold CTA: `#C99A3D`

Desired style:

- modern
- clean
- premium but approachable
- trustworthy
- spacious
- readable
- strong quote panel
- rounded cards/buttons
- professional rather than flashy

## 30. Before public launch

Confirm or complete:

- VAT status
- final discount eligibility/expiry terms
- About Us text
- verified insurance wording
- real reviews
- waiting-time policy
- accepted payment methods
- production quote form backend
- production GPS backend if used
- Privacy/Cookies/Terms review
- Google Business Profile/social links
- mobile/browser testing

Never automatically convert placeholders into unverified claims.
