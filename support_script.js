function addItemRow(){
  const tbody = document.getElementById('itemTableBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `<td><input type="text" name="item_name[]" placeholder=""></td><td><input type="text" name="item_qty[]" placeholder=""></td>`;
  tbody.appendChild(tr);
}

function collectApplyData(){
  const form = document.getElementById('applyForm');
  const data = new FormData(form);
  const obj = {};
  for (const [k,v] of data.entries()){
    if (obj[k]) { obj[k] = Array.isArray(obj[k]) ? [...obj[k], v] : [obj[k], v]; }
    else { obj[k] = v; }
  }
  return obj;
}

let applyDraft = null;
function saveDraft(){
  applyDraft = collectApplyData();
  showApplyToast("The form was saved on this computer (for this session only).");
}
async function submitApplication(){
  const form = document.getElementById('applyForm');
  const data = collectApplyData();
  if (!data.full_name || !data.phone){
    showApplyToast("Fill in your name and phone number before submitting.");
    return;
  }
  if (!data.confirm_true || !data.confirm_use || !data.confirm_no_guarantee){
    showApplyToast('Confirm the items in #9 before submitting.');
    return;
  }
  showApplyToast(' We are submitting your application...');
  try {
    const fd = new FormData(form);
    fd.append('_subject', 'New Imbuto Seeds Support Fund application');
    const response = await fetch('https://formspree.io/f/xkoqnlvb', {
      method: 'POST',
      body: fd,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok){
      showApplyToast('Your application has been sent! We will get back to you soon.');
      form.reset();
    } else {
      throw new Error('failed');
    }
  } catch(e){
    showApplyToast('Something went wrong. You can try sending via contact@imbuto.org');
  }
}