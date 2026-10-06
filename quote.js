(() => {
  const c = window.SITE_CONFIG;
  const q = c.quote;
  const $ = id => document.getElementById(id);
  const quoteForm = $('quoteForm');
  const requestForm = $('requestForm');
  const modal = $('quoteModal');
  const closeModal = $('closeQuoteModal');
  let latestEstimate = 0;
  let latestBreakdown = [];

  const money = n => `£${Math.round(Number(n || 0)).toLocaleString('en-GB')}`;
  const bedroomKey = () => $('bedrooms').value;

  function calculateEstimate() {
    const key = bedroomKey();
    const distance = Math.max(0, Number($('distanceMiles').value) || 0);
    const base = Number(q.basePriceUpTo30Miles[key] || 0);
    const extraMiles = Math.max(0, distance - q.includedMiles);
    const extraMileageCost = extraMiles * q.extraMilePrice;
    const packingCost = $('packing').checked ? Number(q.packingPrice[key] || 0) : 0;
    const drCost = $('dismantlingReassembly').checked ? Number(q.dismantlingReassembly || 0) : 0;

    latestEstimate = base + extraMileageCost + packingCost + drCost;
    latestBreakdown = [
      [`${key === '4+' ? '4+ bedroom' : key + ' bedroom'} fixed price (up to ${q.includedMiles} miles)`, base],
      [`Extra mileage (${extraMiles.toFixed(1)} miles × ${money(q.extraMilePrice)})`, extraMileageCost],
      ['Packing service', packingCost],
      ['Dismantling & Reassembly', drCost]
    ];

    $('estimatePrice').textContent = money(latestEstimate);
    $('breakdown').innerHTML = latestBreakdown
      .filter(([,value],i) => i===0 || value>0)
      .map(([label,value]) => `<div class="breakdown-row"><span>${label}</span><strong>${money(value)}</strong></div>`).join('');

    $('packingPriceLabel').textContent = `+${money(q.packingPrice[key])} for this property size`;
    $('modalEstimate').textContent = money(latestEstimate);
    $('vatNote').textContent = q.vatNoteEnabled ? q.vatNote : '';
    updateTotalFloors();
  }

  function updateTotalFloors(){
    const oldF = Number($('oldFloor').value) || 0;
    const newF = Number($('newFloor').value) || 0;
    $('totalFloors').textContent = oldF + newF;
  }

  async function lookupPostcode(postcode) {
    const r = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode.trim())}`);
    if (!r.ok) throw new Error('Postcode not found');
    const j = await r.json();
    return {lat:j.result.latitude, lon:j.result.longitude};
  }

  function haversineMiles(a,b){
    const R = 3958.7613;
    const rad = d => d * Math.PI / 180;
    const dLat = rad(b.lat-a.lat), dLon=rad(b.lon-a.lon);
    const x=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2;
    return 2*R*Math.asin(Math.sqrt(x));
  }

  $('calculateDistance')?.addEventListener('click', async () => {
    const from=$('fromPostcode').value.trim(), to=$('toPostcode').value.trim();
    if(!from || !to){$('distanceStatus').textContent='Please enter both postcodes first.';return;}
    $('distanceStatus').textContent='Calculating approximate distance…';
    try{
      const [a,b]=await Promise.all([lookupPostcode(from),lookupPostcode(to)]);
      const straight=haversineMiles(a,b);
      const road=Math.max(0, straight * Number(q.postcodeRoadFactor || 1.22));
      $('distanceMiles').value=road.toFixed(1);
      $('distanceStatus').textContent=`Approximate road distance: ${road.toFixed(1)} miles. Please correct it manually if you know the actual route distance.`;
      calculateEstimate();
    }catch(err){$('distanceStatus').textContent='We could not calculate that postcode distance. Please enter the mileage manually.';}
  });

  ['bedrooms','distanceMiles','packing','dismantlingReassembly','oldFloor','newFloor'].forEach(id => {
    $(id)?.addEventListener('input', calculateEstimate);
    $(id)?.addEventListener('change', calculateEstimate);
  });

  quoteForm?.addEventListener('submit', e => {
    e.preventDefault();
    calculateEstimate();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    setTimeout(()=>$('fullName')?.focus(),50);
  });

  function hideModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}
  closeModal?.addEventListener('click',hideModal);
  modal?.addEventListener('click',e=>{if(e.target===modal)hideModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')hideModal();});

  function collectQuoteDetails(){
    const key=bedroomKey();
    return {
      'Estimated moving cost': money(latestEstimate),
      'Property size': key === '4+' ? '4+ bedrooms' : `${key} bedroom${key==='1'?'':'s'}`,
      'Moving from postcode': $('fromPostcode').value || 'Not provided',
      'Moving to postcode': $('toPostcode').value || 'Not provided',
      'Distance': `${Number($('distanceMiles').value||0).toFixed(1)} miles`,
      'Old property floors/level': $('oldFloor').selectedOptions[0].text,
      'Lift at old property': $('oldLift').value,
      'New property floors/level': $('newFloor').selectedOptions[0].text,
      'Lift at new property': $('newLift').value,
      'Total selected floors': $('totalFloors').textContent,
      'Approximate boxes': $('boxes').value,
      'Moving day': $('movingDate').value || 'Not provided',
      'Preferred pickup time': $('pickupTime').value || 'Not provided',
      'Packing': $('packing').checked ? `Yes (${money(q.packingPrice[key])})` : 'No',
      'Dismantling & Reassembly': $('dismantlingReassembly').checked ? `Yes (${money(q.dismantlingReassembly)})` : 'No',
      'Unpacking': $('unpacking').checked ? 'Yes — manual quote' : 'No',
      'Fragile items': $('fragile').checked ? 'Yes — details to confirm' : 'No',
      'Large / specialist items': $('largeItems').value.trim() || 'None stated',
      'End-of-tenancy cleaning': $('cleaning').value === 'yes' ? 'Interested — partner offer requested' : 'No',
      'Passenger transport': $('transport').value === 'yes' ? 'Interested — partner offer requested' : 'No',
      'Storage': $('storage').value === 'none' ? 'No' : `${$('storage').value} — partner quote required`,
      'Price breakdown': latestBreakdown.filter(([,v],i)=>i===0||v>0).map(([k,v])=>`${k}: ${money(v)}`).join(' | ')
    };
  }

  function makeReference(){
    const d=new Date();
    return `CBR-${d.getFullYear().toString().slice(-2)}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  }

  requestForm?.addEventListener('submit', async e => {
    e.preventDefault();
    if(!requestForm.reportValidity()) return;
    const details=collectQuoteDetails();
    const reference=makeReference();
    const payload={
      reference,
      name:$('fullName').value.trim(),
      email:$('requestEmail').value.trim(),
      telephone:$('telephone').value.trim(),
      budget:$('budget').value ? `£${$('budget').value}` : 'Not provided',
      preferredTimeframe:$('preferredTimeframe').value,
      additionalComments:$('additionalComments').value.trim() || 'None',
      contactConsent:$('contactConsent').checked ? 'Yes' : 'Not ticked',
      ...details
    };

    const msg=$('submitMessage');
    if(q.formEndpoint){
      try{
        msg.textContent='Sending…';
        const r=await fetch(q.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});
        if(!r.ok) throw new Error('Submit failed');
        msg.textContent=`Thank you. Your quote request has been received. Reference: ${reference}. We will contact you to confirm the final quotation, discounts and any partner/manual-price services.`;
        return;
      }catch(err){msg.textContent='The online form could not be sent. Your email app will open instead.';}
    }

    const subject=encodeURIComponent(`Quote request ${reference} — ${payload.name}`);
    const body=encodeURIComponent(Object.entries(payload).map(([k,v])=>`${k}: ${v}`).join('\n'));
    window.location.href=`mailto:${c.business.email}?subject=${subject}&body=${body}`;
    msg.textContent=`Your email app should open with the quote request. Reference: ${reference}. Connect a form backend in config.js before launch for direct website submission.`;
  });

  calculateEstimate();
})();
