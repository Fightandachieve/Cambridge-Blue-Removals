# Cambridge Blue Removals — GitHub-ready website

Static prototype website for **Cambridge Blue Removals**.

## Main editable file

Edit:

`assets/js/config.js`

This controls the business contact details, address, opening hours, discounts, booking/deposit policy, quote prices, VAT wording and integration endpoints.

## Current automatic quote pricing

### Fixed moving price — includes up to 30 miles

- 1 bedroom: £350
- 2 bedrooms: £550
- 3 bedrooms: £700
- 4+ bedrooms: £850

### Packing

- 1 bedroom: £150
- 2 bedrooms: £200
- 3 bedrooms: £300
- 4+ bedrooms: £400

### Dismantling & Reassembly

- £100 combined

### Mileage over 30 miles

- £2 per mile after the included 30 miles

The calculator formula is:

`base price + extra miles over 30 + packing (if selected) + dismantling & reassembly (if selected)`

## Manual-review items — not automatically priced

The website records these details but does not add a price automatically:

- floors at old/new property
- lift availability
- boxes
- unpacking
- fragile items
- large/specialist items
- storage
- end-of-tenancy cleaning partner
- moving-day passenger transport partner

Large/specialist items are an optional free-text field and can be skipped.

## Quote-request flow

1. Customer fills in the calculator.
2. Live estimated moving cost is displayed.
3. Customer clicks **Continue & Request My Quote**.
4. A popup opens.
5. Only Full Name and Email are required.
6. Telephone, customer budget, preferred timeframe, comments and contact checkbox are optional.
7. The complete calculator summary is attached automatically to the enquiry.
8. The team confirms the final quote later.
9. Booking is secured with a 20% deposit.

## Storage

Storage can be selected from 1 day up to 12 months. It is not automatically priced. The business can obtain a current partner offer and confirm it with the customer.

## Partner services

- End-of-tenancy cleaning: old property only; independent cleaning partner; not auto-priced.
- Moving-day passenger transport/taxi: independent transport partner; not auto-priced.

## Current booking policy

- 20% deposit upfront to secure booking.
- Cancel at least 7 calendar days before the move: deposit refundable.
- Cancel less than 7 days before: deposit non-refundable.
- Rescheduling: subject to availability.

All policy wording is editable in `assets/js/config.js`.

## Business details

- Cambridge Blue Removals
- 07459 220092
- info@cambridgeblueremovals.co.uk
- 64 St Bedes Crescent, Cambridge, CB1 3UB
- Mon–Sat 08:00–19:00
- Sun 09:00–19:00

## Quote form backend

GitHub Pages is static and has no server-side form processing.

Set `quote.formEndpoint` in `assets/js/config.js` to a secure form backend such as Formspree (or your own endpoint). If left blank, the current prototype falls back to opening the customer's email application with the full quote summary.

Do not store secret keys in the public repository.

## Distance calculation

The quote page can use the public UK postcodes.io endpoint to resolve postcodes, then applies an editable approximation factor to estimate road miles. The customer can manually correct the mileage before sending the request.

For production accuracy, connect a proper road-routing API/backend later.

## Live GPS tracking

The tracking UI is ready for a future secure backend/fleet provider. The demo reference is:

- Reference: `CBR-DEMO`
- Postcode: `CB1`

Never expose GPS provider secrets in public front-end code.

## Google Maps

The current address/map URL is stored in `assets/js/config.js` and can be changed from one place.

## Reviews

Do not publish invented reviews or ratings. Replace placeholders with genuine customer feedback.

## Before launch

- confirm VAT status
- set final discount conditions
- add real About Us copy
- verify insurance wording
- add genuine reviews
- decide waiting-time/key-delay policy
- configure a production quote form backend
- configure GPS backend if live tracking will be used
- review Privacy / Cookies / Terms
- test mobile and desktop

## GitHub Pages deployment

1. Create a GitHub repository.
2. Upload all files/folders from this project to the repository root.
3. Commit to `main`.
4. Open **Settings → Pages**.
5. Select **Deploy from a branch**.
6. Select `main` and `/ (root)`.
7. Save.
8. Add the custom domain later when ready.
