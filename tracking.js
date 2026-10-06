(() => {
  const c = window.SITE_CONFIG;
  const form=document.getElementById('trackingForm');
  const empty=document.getElementById('trackingEmpty');
  const result=document.getElementById('trackingResult');
  const msg=document.getElementById('trackingMessage');
  const status=document.getElementById('currentStatus');
  const meta=document.getElementById('trackingMeta');
  const timeline=document.getElementById('timeline');
  const map=document.getElementById('gpsMap');
  const steps=['Booking confirmed','Team assigned','Team en route','Loading in progress','In transit','Arrived / unloading','Move completed'];

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const ref=document.getElementById('bookingRef').value.trim().toUpperCase();
    const pc=document.getElementById('trackingPostcode').value.trim().toUpperCase();
    if (c.tracking.gpsApiEndpoint) {
      try {
        const r=await fetch(`${c.tracking.gpsApiEndpoint}?reference=${encodeURIComponent(ref)}&postcode=${encodeURIComponent(pc)}`);
        if(!r.ok) throw new Error('Booking not found');
        render(await r.json()); return;
      } catch(err) { if(msg) msg.textContent='We could not load tracking right now. Please contact us if you need an update.'; }
    }
    if(ref===c.tracking.demoReference && pc.startsWith(c.tracking.demoPostcode)) {
      render({currentStatus:'In transit',updatedAt:new Date().toLocaleString('en-GB'),vehicle:'Van 01',timeline:steps.map((label,i)=>({label,done:i<=4,current:i===4}))});
    } else if(msg) msg.textContent='No demo booking matched. Production tracking requires the secure booking/GPS backend.';
  });

  function render(data){
    empty.hidden=true; result.hidden=false;
    status.textContent=data.currentStatus||'Move update';
    meta.textContent=`${data.vehicle||'Removal team'} • Last update: ${data.updatedAt||'recently'}`;
    timeline.innerHTML=(data.timeline||steps.map((label,i)=>({label,done:i===0,current:i===0}))).map(s=>`<li class="${s.done?'done ':''}${s.current?'current':''}">${s.label}</li>`).join('');
    if(data.lat && data.lng){map.innerHTML=`<iframe src="https://www.google.com/maps?q=${data.lat},${data.lng}&z=14&output=embed" title="Vehicle location"></iframe>`;} else {map.innerHTML='<div class="small" style="padding:24px;text-align:center">Live GPS location will appear here when connected for this booking.</div>';}
  }
})();
