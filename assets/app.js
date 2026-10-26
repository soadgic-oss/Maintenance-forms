const forms = {
  maintenance: { title: 'نموذج طلب صيانة', prefix: 'M', fields: [['department','الإدارة أو المكتب','text',true],
    ['requester','اسم الموظف أو المستخدم','text',true],['device_type','نوع الجهاز','text',true],['asset_number',
      'الرقم التعريفي أو رقم الأصل','text',true],['issue_description','وصف العطل أو المشكلة',
        'textarea',true],['request_date','تاريخ الطلب','date',true],['urgency',
          'درجة الاستعجال','select',false],['maintenance_notes','ملاحظات فريق الصيانة','textarea',false]] },
  external: { title: 'نموذج إحالة إلى صيانة خارجية', prefix: 'E', 
    fields: [['device_details','بيانات الجهاز','textarea',true],
    ['fault_description','وصف العطل','textarea',true],['inspection_result','نتيجة الفحص الداخلي','textarea',true]
    ,['internal_repair_reason','سبب تعذر الإصلاح داخل المركز','textarea',true],
    ['proposed_vendor','الجهة المقترح الإحالة إليها','text',true],
    ['required_work_parts','الأعمال أو قطع الغيار المطلوبة','textarea',true],
    ['referral_date','تاريخ الإحالة','date',true],['followup_notes','ملاحظات المتابعة','textarea',false],['official_approval','اعتماد المسؤول المختص','text',false]] }
};
let type = 'maintenance';
const fieldBox = document.querySelector('#fields'), form = document.querySelector('#service-form');
function numberForCurrentForm() { const key = `gic-form-number-${type}`; let number = localStorage.getItem(key); if (!number) { number = `${forms[type].prefix}-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${String(Date.now()).slice(-5)}`; localStorage.setItem(key, number); } return number; }
function render() { const spec = forms[type]; document.querySelector('#page-title').textContent = spec.title; document.querySelector('#form-title').textContent = spec.title; document.querySelector('#form-number').textContent = numberForCurrentForm(); document.querySelectorAll('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.type === type)); fieldBox.replaceChildren(...spec.fields.map(([name,label,kind,required]) => { const wrap = document.createElement('div'); wrap.className = `field ${kind === 'textarea' ? 'field-wide' : ''}`; const labelEl = document.createElement('label'); labelEl.htmlFor = name; labelEl.textContent = label; if (required) { const mark = document.createElement('em'); mark.textContent = '*'; labelEl.append(mark); } let control; if (kind === 'textarea') { control = document.createElement('textarea'); control.rows = 4; } else if (kind === 'select') { control = document.createElement('select'); ['عادية','عاجلة','عاجلة جداً'].forEach(v => control.add(new Option(v,v))); } else { control = document.createElement('input'); control.type = kind; } control.id = control.name = name; control.required = required; wrap.append(labelEl, control); return wrap; })); }
document.querySelectorAll('.nav-link').forEach(button => button.addEventListener('click', () => { type = button.dataset.type; render(); }));
document.querySelector('#print').addEventListener('click', () => window.print());
document.querySelector('#pdf').addEventListener('click', () => window.print());
render();
