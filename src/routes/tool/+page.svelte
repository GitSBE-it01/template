<script>
    import {Nav, Table, nav_array, api_access, SearchForm, Formset} from '$lib';
  
    let title = 'Detail Tool';
  
  
    let form_array={
          id: 'id_wo_search',
          list:'list_id',
          btn_set: [
              {
                method: 'search', 
                name:'search',
                onClick: (e) =>{
                    console.log(e.target);
                  }
              }
          ],
      };
  
    let formset_array={
        id: 'detail_form',
        column: 2,
        form: [
          {field: 'id', label:'ID Number', type:'text', list:'list_id'},
          {field: 'wo', label:'Work Order', type:'text',disable:''},
          {field: 'item_number', label:'Item Number', type:'text',disable:''},
          {field: 'desc', label:'Deskripsi', type:'text',disable:''},
          {field: 'rel_dt', label:'Release Date', type:'date',disable:''},
          {field: 'qty_ord', label:'Qty Order', type:'text',disable:''},
          {field: 'due_dt', label:'Due Date', type:'date',disable:''},
          {field: 'qty_opn', label:'Qty Open', type:'text',disable:''},
          {field: 'status', label:'Status', type:'text',disable:''},
          {field: 'eff_dt', label:'Effective Date', type:'date',disable:''},
          {field: 'receipt', label:'Receipt', type:'checkbox'},
          {field: 'backflush', label:'Backflush', type:'checkbox'},
        ]
    };
  
  </script>
  
  <svelte:head>
      <title>Tool</title>
  </svelte:head>
  
  <datalist id='list_id'></datalist>
  <Nav {nav_array} {title}/>
  <header class="fixed top-[5vh] flex flex-row gap-4 w-screen bg-slate-700 h-[5vh] items-center pl-4">
    <SearchForm {form_array}/>
  </header>
  <main class="fixed flex flex-col top-[10vh] p-2 bg-slate-300 w-screen h-[90vh]">
    <Formset {formset_array}/>
  
  </main>