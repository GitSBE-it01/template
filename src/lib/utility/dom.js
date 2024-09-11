export class DOM {
    static async init(page_role) {
        let user_dtl = JSON.parse(sessionStorage.getItem('userData'));
        const check = window.location.href.split("/");
        const newURL = 'http://'+check[2]+'/'+check[3]+'/'+check[4]+'/index.html';
        if(user_dtl !== null) {
            if(page_role === '') {page_role = 'user';}
            if(page_role !== 'user' && user_dtl.role === 'user') {
                window.location.replace(newURL);
                return;
            }
            if(page_role === 'super' && user_dtl.role ==='admin') {
                window.location.replace(newURL);
                return;
            }
            if (user_dtl.role === 'admin' && page_role !=='super') {
                const del_node = document.querySelectorAll('[data-role]');
                del_node.forEach(dt=>{
                    const role = dt.getAttribute('data-role')
                    if(role === 'super') {
                        dt.remove();
                    }
                })
            }
            if (user_dtl.role === 'user' && page_role === 'user') {
                const del_node = document.querySelectorAll('[data-role]');
                del_node.forEach(dt=>{
                    dt.remove();
                })
            }
            const screen = document.getElementById('loadscreen');
            screen.classList.toggle('opacity-75');
        }
        return;
    }

    static td_input_default() {
        document.addEventListener('click', function(event){
            if(event.target.tagName === 'TD' || event.target.closest('td')) {
                let td = event.target;
                if(event.target.tagName === 'LABEL') {
                    td = event.target.closest('td');
                }
                const inp = td.querySelector('input');
                const label = td.querySelector('label');
                if(inp !== null && !inp.disabled && inp.classList.contains('hidden')) {
                    inp.classList.toggle('hidden');
                    label.classList.toggle('hidden');
                    inp.focus();
                }
                const sel = td.querySelector('select');
                if(sel !== null && !sel.disabled && sel.classList.contains('hidden')) {
                    sel.classList.toggle('hidden');
                    label.classList.toggle('hidden');
                    sel.focus();
                }
            }
        })

        document.addEventListener('focusout', function(event) {
            if(event.target.closest('td') !== null) {
                if(event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
                    const curr = event.target;
                    const td = event.target.closest('td');
                    const label = td.querySelector('label');
                    if(!curr.classList.contains('hidden')) {
                        curr.classList.toggle('hidden');
                        label.textContent = curr.value;
                        label.classList.toggle('hidden');
                    }
                }
            }
        })

        document.addEventListener('change', function(event) {
            if(event.target.closest('td') !== null) {
                if(event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
                    const td = event.target.closest('td');
                    const tr = td.closest('tr');
                    if(!tr.hasAttribute('data-change') && tr.getAttribute('data-change') !== 'new' && event.target.getAttribute('data-current') !== event.target.value) {
                        tr.setAttribute('data-change', 'change');
                    }
                    if(tr.hasAttribute('data-change') && event.target.getAttribute('data-current') === event.target.value) {
                        tr.removeAttribute('data-change');
                    }
                }
            }
        })
        return;
    }
}