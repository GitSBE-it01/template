export class TableDOM {
    constructor(key, src, pagination_id) {
        this.id = key;
        this.pagination_id = pagination_id;
        this.table = document.getElementById(this.id);
        this.data = src;
        this.page_node = document.getElementById(pagination_id);
        this.page = 1;
        this.show_data = this.data;
        this.counter = 0;
    }

    async table_parse_data() {
        try {
            const tr = this.table.querySelectorAll('tbody tr');
            let count = 0;
            if(this.page >1) {
                count = (tr.length-1) * (this.page-1);
            }
            tr.forEach(dt=>{
                if(!dt.getAttribute('data-id').includes('template') && !dt.classList.contains('hidden')) {
                    dt.classList.toggle('hidden');
                }
                let fltr = '';
                if(!dt.getAttribute('data-id').includes('template') && this.show_data[count]) {
                    const fld = dt.querySelectorAll("[name]");
                    if(dt.classList.contains('hidden')) {
                        dt.classList.toggle('hidden');
                    }
                    dt.setAttribute('data-value', count);
                    fld.forEach(d2=>{
                        const key_fld = d2.getAttribute('name');
                        const currVal = this.show_data[count][`${key_fld}`] ? this.show_data[count][`${key_fld}`] : '';
                        fltr += currVal + "----";
                        if(d2.tagName === 'INPUT')
                            if(d2.getAttribute('type')==='text' || d2.getAttribute('type')==='date') {
                                d2.value = currVal;
                                d2.setAttribute('data-current', currVal);
                                const lbl = this.table.querySelector(`[for="${d2.id}"]`);
                                lbl.textContent= currVal;
                            }   
                            if(d2.getAttribute('type')==='hidden') {
                                d2.value = currVal;
                                d2.setAttribute('data-current', currVal);
                            }
                        if(d2.tagName === 'SELECT') {
                            d2.setAttribute('data-current', currVal);
                            d2.value = currVal;
                            const opt = d2.querySelectorAll('option');
                            opt.forEach(dt=>{
                                if(dt.value === currVal){
                                    dt.setAttribute("selected", true);
                                }
                            })
                            const lbl = this.table.querySelector(`[for="${d2.id}"]`);
                            lbl.textContent= currVal;
                        }
                        if(d2.tagName === 'TD') {
                            d2.textContent = currVal;
                            d2.setAttribute('data-current', currVal);
                        }
                    })
                    count++;
                }
            })
            return;
        } catch(error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    }

    async table_clear() {
        try {
            const tr = this.table.querySelectorAll('tbody tr');
            tr.forEach(dt=>{
                if(!dt.getAttribute('data-id').includes('template')) {
                    const td = dt.querySelectorAll("[name]");
                    dt.removeAttribute('data-value');
                    if(!dt.classList.contains('hidden')) {
                        dt.classList.toggle('hidden');
                    }
                    td.forEach(d2=>{
                        if(d2.tagName === 'INPUT' && d2.getAttribute('type')==='text') {
                            d2.setAttribute('value', '');
                            d2.removeAttribute('data-current');
                            const lbl = document.querySelector(`[for="${d2.id}"]`);
                            lbl.textContent = '';
                        }
                        if(d2.tagName === 'INPUT' && d2.getAttribute('type')==='hidden') {
                            d2.value = '';
                            d2.removeAttribute('data-current');
                        }
                        if(d2.tagName === 'SELECT') {
                            d2.removeAttribute('data-current');
                            const opt = d2.querySelectorAll('option');
                            opt.forEach(dt=>{
                                if(dt.hasAttribute('selected')){
                                    dt.removeAttribute('selected');
                                }
                            })
                            const lbl = table.querySelector(`[for="${d2.id}"]`);
                            lbl.textContent= '';
                        }
                        if(d2.tagName === 'TD') {
                            d2.removeAttribute('data-current');
                            d2.textContent = '';
                        }
                    })
                }
                if(dt.getAttribute('data-id').includes('new')) {
                    dt.remove();
                } 
            })
            return;
        } catch(error) {
            console.error('Error:', error);
            return Promise.reject(error);
        }
    }

    async table_new_row(post = 'upper') {
        const template = this.table.querySelector('[data-id *="template"]');
        const new_row = template.cloneNode(true);
        new_row.setAttribute('data-id', `new__${this.id}__${this.counter}`);
        new_row.setAttribute('data-change', `new`);
        const name = new_row.querySelectorAll('[name]');
        new_row.classList.remove('hidden');
        name.forEach(dt=>{
            if(dt.tagName === 'INPUT' || dt.tagName === 'SELECT') {
                const name = dt.getAttribute('name');
                let td = '';
                if(dt.disabled) {dt.disabled = false;}
                if(dt.closest('td') !== null) {
                    td = dt.closest('td');
                    const label = td.querySelector('label');
                    if(dt.hasAttribute('id')) {
                        dt.id = `${name}__${this.id}__new__${this.counter}`;
                        label.setAttribute('for', `${name}__${this.id}__new__${this.counter}`)
                    }
                }
            }
        })
        this.counter++;
        const tbody = this.table.querySelector('tbody');
        if(post === 'upper') {
            tbody.insertBefore(new_row,tbody.rows[0]);
        } else {
            tbody.appendChild(new_row);
        }
        return;
    }

    async table_pagination_init(cls = '') {
        let mute = [
            'hover:font-bold',
            'hover:bg-blue-700',
            'hover:text-white',
            'hover:border-black',
            'cursor-pointer'
        ];
        let dflt = 'border-2 border-slate-400 p-1 w-8 h-8 justify-center items-center duration-300 flex bg-slate-200';
        let active = ['text-white', 'font-bold', 'bg-blue-700', 'bg-slate-200'];
        if (!cls === '') {
            mute = cls;
        }
        const dt_cnt = this.show_data.length;
        const tr = this.table.querySelectorAll('tbody tr');
        const tr_cnt = tr.length - 1; // -1 utk template
        const max_page = Math.ceil(dt_cnt/tr_cnt);

        const maxi = max_page +1 
        const pagi = this.page_node.querySelectorAll('[data-group]');
        pagi.forEach(dt=>{
            const id_pg = dt.getAttribute('data-id');
            dt.setAttribute('data-page', `${id_pg}`); 
            dt.disabled = false;
            dt.textContent = id_pg;
            dt.setAttribute('class', dflt);
            const pg = dt.getAttribute('data-page');
            const pg_val = parseInt(pg);
            if(id_pg === '1') {
                dt.setAttribute('data-pagi','active');
                active.forEach(cls=>{
                    dt.classList.toggle(cls);   
                })
            }
            if(!dt.classList.contains("hidden")) {
                dt.classList.toggle('hidden');
            }
            if(max_page<8) {
                if(pg_val < maxi) {
                    dt.textContent = id_pg;
                    if(dt.classList.contains('hidden')){
                        dt.classList.toggle('hidden');
                    }
                }
            } else {
                if(pg==='6') {
                    dt.disabled = true;
                    dt.textContent="...";
                    mute.forEach(cls=>{
                        if(!dt.classList.contains(cls)) {
                            dt.classList.toggle(cls);
                        }
                    })
                };
                if(pg==='7'){
                    dt.setAttribute('data-page', `${max_page}`); 
                    dt.textContent=max_page;
                }
                if(dt.classList.contains('hidden') ){
                    dt.classList.toggle('hidden');
                }
            }
        })
        return;
    }

    async table_pagination_response() {
        let mute = [
            'hover:font-bold',
            'hover:bg-blue-700',
            'hover:text-white',
            'hover:border-black',
            'cursor-pointer'
        ];
        let active = ['text-white', 'font-bold', 'bg-blue-700', 'bg-slate-200'];
        if(this.page_node.nodeType) {
            this.page_node.addEventListener('click', async (event) => {
                if(event.target.getAttribute('data-group') === this.pagination_id) {
                    this.page = parseInt(event.target.getAttribute('data-page'));
                    this.table_parse_data();
                    const div = event.target.closest('div');
                    const pagi = div.querySelectorAll('[data-id]');
                    const max = div.querySelector('[data-id = "7"]').getAttribute('data-page');

                    pagi.forEach(dt=>{
                        const id = dt.getAttribute('data-id');
                        if(dt.hasAttribute('data-pagi')) {dt.removeAttribute('data-pagi')}
                        if(!dt.disabled) {
                            active.forEach(cls=>{
                                if(cls !== 'bg-slate-200' && dt.classList.contains(cls)) {
                                    dt.classList.toggle(cls);
                                }
                                if(cls === 'bg-slate-200' && !dt.classList.contains(cls)) {
                                    dt.classList.toggle(cls);
                                }
                            })
                            mute.forEach(cls=>{
                                if(!dt.classList.contains(cls)) {
                                    dt.classList.toggle(cls);
                                }
                            })
                        }
                        if(id==="1") {
                            if(this.page === 1) {
                                active.forEach(cls=>{
                                    if(cls === 'bg-slate-200'&& dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                    if(cls !== 'bg-slate-200' && !dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                })
                            }
                        }
                        if(id==="2"){
                            if(this.page === 2) {
                                dt.disabled = false;
                                dt.textContent="2";
                                active.forEach(cls=>{
                                    if(cls === 'bg-slate-200'&& dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                    if(cls !== 'bg-slate-200' && !dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                })
                            }
                            if(parseInt(max)>8) {
                                if(this.page<=4 && dt.textContent!=="2") {
                                    dt.disabled = false;
                                    dt.textContent="2";
                                    dt.setAttribute('data-page', "2");
                                }
                                if(this.page>4 && dt.textContent!=="...") {
                                    dt.disabled = true;
                                    dt.textContent = "...";
                                    mute.forEach(cls=>{
                                        if(dt.classList.contains(cls)) {
                                            dt.classList.toggle(cls);
                                        }
                                    })
                                }
                            }
                        }
                        if(id==="3"){
                            if(this.page === 3) {
                                dt.textContent="3";
                                active.forEach(cls=>{
                                    if(cls === 'bg-slate-200'&& dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                    if(cls !== 'bg-slate-200' && !dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                })
                            }
                            if(this.page >3 && this.page<=(parseInt(max)-4)) {
                                dt.setAttribute('data-page', `${this.page-1}`);
                                dt.textContent = this.page-1;
                            }
                            if(this.page>(parseInt(max)-4)) {
                                dt.setAttribute('data-page', `${parseInt(max)-4}`);
                                dt.textContent = parseInt(max)-4;
                            }
                            if(this.page<5) {
                                dt.setAttribute('data-page', "3");
                                dt.textContent = 3;
                            }
                        }
                        if(id==="4"){
                            dt.setAttribute('data-pagi', 'active');
                            if(this.page<(parseInt(max)-2) && this.page>3) {
                                dt.textContent=this.page;
                                dt.setAttribute('data-page', `${this.page}`);
                                active.forEach(cls=>{
                                    if(cls === 'bg-slate-200'&& dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                    if(cls !== 'bg-slate-200' && !dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                })
                            } 
                            if(this.page<4) {
                                dt.textContent=4;
                                dt.setAttribute('data-page', "4");
                            }
                            if(this.page>=(parseInt(max)-1) ) {
                                const curPage = parseInt(max)-3;
                                dt.textContent= curPage;
                                dt.setAttribute('data-page', `${curPage}`);
                            }
                        }
                        if(id==="5"){
                            if(this.page === parseInt(max)-2) {
                                const curPage = parseInt(max)-2;
                                dt.textContent = curPage;
                                dt.setAttribute('data-page', `${curPage}`);
                                active.forEach(cls=>{
                                    if(cls === 'bg-slate-200'&& dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                    if(cls !== 'bg-slate-200' && !dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                })
                            }
                            if(this.page<(parseInt(max)-2) && this.page>4) {
                                dt.setAttribute('data-page', `${parseInt(this.page)+1}`);
                                dt.textContent = parseInt(this.page)+1;
                            }
                            if(this.page>=(parseInt(max)-2)) {
                                dt.setAttribute('data-page', `${parseInt(max)-2}`);
                                dt.textContent = parseInt(max)-2;
                            }
                            if(this.page<5) {
                                dt.setAttribute('data-page', "5");
                                dt.textContent = 5;
                            }
                        }
                        if(id==="6"){
                            if(this.page === (parseInt(max)-1)) {
                                dt.disabled = false;
                                dt.textContent= this.page;
                                dt.setAttribute('data-page', `${this.page}`);
                                active.forEach(cls=>{
                                    if(cls === 'bg-slate-200'&& dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                    if(cls !== 'bg-slate-200' && !dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                })
                            }
                            if(parseInt(max)>8) {
                                if(this.page<(parseInt(max)-3) && dt.textContent!=="...") {
                                    dt.disabled = true;
                                    dt.textContent = "...";
                                    mute.forEach(cls=>{
                                        if(dt.classList.contains(cls)) {
                                            dt.classList.toggle(cls);
                                        }
                                    })
                                }
            
                                if(this.page>=(parseInt(max)-3)) {
                                    dt.disabled = false;
                                    const curPage = parseInt(max)-1;
                                    dt.textContent= curPage;
                                    dt.setAttribute('data-page', `${curPage}`);
                                }
                            }
                        }
                        if(id==="7") {
                            if(this.page === parseInt(max)) {
                                active.forEach(cls=>{
                                    if(cls === 'bg-slate-200'&& dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                    if(cls !== 'bg-slate-200' && !dt.classList.contains(cls)) {
                                        dt.classList.toggle(cls);
                                    }
                                })
                            }
                        }
                    })
                    return;
                }
            })
        }
    }

    async table_filter_data_on_click(button_key, input_key) {
        let btn = '';
        if(button_key.nodeType) {
            btn = button_key
        } else {
            btn = document.querySelector(button_key);
        }
        let inp = '';
        if(input_key.nodeType) {
            inp = input_key
        } else {
            inp = document.querySelector(input_key);
        }
        if(btn) {
            btn.addEventListener('click', async()=>{
                DOM.rmv_class('#load',"hidden");
                this.show_data = this.data.filter(obj=>obj.filter.toLowerCase().includes(inp.value.toLowerCase()));
                this.page = 1;
                this.table_parse_data();
                DOM.add_class('#load',"hidden");
            })
        }
        if(inp) {
            inp.addEventListener('keyup', async(e)=>{
                if(e.key === 'Enter') {
                    DOM.rmv_class('#load',"hidden");
                    this.show_data = this.data.filter(obj=>obj.filter.toLowerCase().includes(inp.value.toLowerCase()));
                    this.page = 1;
                    this.table_parse_data();
                    DOM.add_class('#load',"hidden");
                }
            })
        }
        return;
    }

    async table_filter_data(filter_val) {
        this.show_data = this.data.filter(obj=>obj.filter.includes(filter_val));
        console.log(this.show_data);
        this.page = 1;
        this.table_parse_data();
        return;
    }

    async submit_change_style_table(button_key) {
        let btn = '';
        if(button_key.nodeType) {
            btn = button_key;
        } else {
            btn = document.querySelector(button_key);
        }
        if(btn) {
            this.table.addEventListener('change', async(e)=>{
                if(e.target.hasAttribute('name')) {
                    const td = e.target.closest('td');
                    const tr = td.closest('tr');
                    if(!tr.hasAttribute('data-change') && tr.getAttribute('data-change') !== 'new' && e.target.getAttribute('data-current') !== e.target.value) {
                        tr.setAttribute('data-change', 'change');
                        DOM.add_class(btn, 'font-bold', 'bg-red-400');
                        DOM.rmv_class(btn, 'bg-gray-300', 'text-slate-200');
                        DOM.rmv_attr(btn, 'disabled');
                        DOM.set_attr(btn, 'data-method', 'submit');
                        return;
                  } else {
                    DOM.rmv_attr(tr,'data-change');
                  }
                  const tr_all = this.table.querySelectorAll('tr');
                  let valid = false;
                  tr_all.forEach(dt=>{
                      if(dt.hasAttribute('data-change')) {
                            console.log(dt)
                          valid = true;
                      }
                  })
                  if(!valid) {
                      DOM.rmv_class(btn, 'font-bold', 'bg-red-400');
                      DOM.add_class(btn, 'bg-gray-300', 'text-slate-200');
                      DOM.set_attr(btn, 'disabled', 'true');
                      DOM.rmv_attr(btn, 'data-method');
                  }
                }
            })
        }
        return;
      }
}