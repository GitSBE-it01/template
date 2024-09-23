<script>
  import {Nav, Table, Load, TableDOM, nav_array, api_access, SearchForm, Formset} from '$lib';
  import { onMount } from 'svelte';
  let title = 'Jig Database';
  let table_array={
        id: 'test',
        count: 50,
        field: [
            {header: 'Date', name:'trans_date'},
            {header: 'User', name:'sn_id'},
            {header: 'Lokasi', name:'test_name'},
            {header: 'Approval', name:'test_name'},
            {header: 'Decision', name:'test_name'},
            {header: 'Detail', name:'test_name'},
        ]
    };

  const open_input__alat_search = () =>{
    const input = document.getElementById('input__alat_search');
    if(input.classList.contains('hidden')) {
      input.classList.remove('hidden');
    } else {
      input.classList.add('hidden');
      if(input.value !== '') {

      }
    }
  }

  const searchValInp =async(e)=>{
    const val = e.target.value;
    const list = document.getElementById(e.target.getAttribute('list'));
    const option = list.querySelectorAll('option');
    if(val === '') {
      e.target.value = '';
    } else {
      for (let i=0; i<option.length; i++) {
          if(option[i].value.toLowerCase().includes(val.toLowerCase())) {
            e.target.value = option[i].value;
            break;
          }
      }
    }
    e.target.classList.add('hidden');
    return;
  }

  let test = '';
  onMount( async(test)=>{
    let start = performance.now();
    const [user_list, loc_list, master] = await Promise.all([
      api_access('get','user',''),
      api_access('get','vjs_loc',''),
      api_access('get','vjs_alat', '')
    ]);
    
    const [usr, loc, mstr, load] = [
      document.getElementById('user_list'),
      document.getElementById('loc_list'),
      document.getElementById('alat_list'),
      document.getElementById('load')
    ]

    user_list.forEach(dt=>{
      const opt = document.createElement('option');
      const val = dt.Name +'--'+ dt.Position +'--'+ dt.Grade;
      opt.value = val;
      opt.textContent = val;
      usr.appendChild(opt);
    })
    loc_list.forEach(dt=>{
      const opt = document.createElement('option');
      const val = dt.location;
      opt.value = val;
      opt.textContent = val;
      loc.appendChild(opt);
    })
    master.forEach(dt=>{
      const opt = document.createElement('option');
      const val = dt.sn_id +'--'+ dt.new_subcat +'--'+ dt.no_asset + '--'+ dt._desc;
      opt.value = val;
      opt.textContent = val;
      mstr.appendChild(opt);
    })

    let end = performance.now();
    console.log('total time user_list = ',(end-start) / 1000);
    load.classList.add('hidden');
    test = new TableDOM ('test', master, 'test_pagination');
    await test.table_parse_data();
    await test.table_pagination_init();
  })

</script>

<svelte:head>
    <title>Homepage</title>
</svelte:head>

<Load />
<datalist id='alat_list'></datalist>
<datalist id='user_list'></datalist>
<datalist id='loc_list'></datalist>
<Nav {nav_array} {title}/>
<header class="fixed top-[5vh] flex flex-col gap-4 w-screen h-[20vh] items-center pl-4 bg-slate-700">
  <h1 class="text-2xl underline w-full capitalize font-bold text-slate-200">
    Detail Form
  </h1>
  <input id="input__alat_search" type="text" list="alat_list" on:blur={(e)=>searchValInp(e)} placeholder="input alat disini" autocomplete="off" required="" class="rounded px-2 text-sm h-[1.6rem] focus:ring focus:ring-blue-400 focus:ring-width-4 focus:outline focus:outline-blue-400 fixed top-[6vh] z-30 duration-300 right-10 shadow-md w-[40vw] hidden">
  <form id="detail_form" class="flex flex-col w-full h-full overflow-y-auto">
    <div class="flex flex-row w-full">
      <label for="desc_alat" class="inline-block mt-1 w-[25vw] text-white text-xl">
        Deskripsi Alat
      </label>
      <input id="desc_alat" name="_desc" type="text" class="w-[50vw] bg-transparent text-white text-xl font-bold ml-4" disabled>
    </div>
    <div class="flex flex-row w-full">
      <label for="cat" class="inline-block mt-1 w-[25vw] text-white text-xl">
        Kategori
      </label>
      <input id="cat" name="new_subcat" type="text" class="w-[50vw] bg-transparent text-white text-xl font-bold ml-4" disabled>
    </div>
      <div class="flex flex-row w-full">
        <label for="seri" class="inline-block mt-1 w-[25vw] text-white text-xl">
          No Seri
      </label>
      <input id="seri" name="sn_id" type="text" class="w-[50vw] bg-transparent text-white text-xl font-bold ml-4" disabled>
    </div>
    <div class="flex flex-row w-full">
      <label for="asset" class="inline-block mt-1 w-[25vw] text-white text-xl">
        No Asset
      </label>
      <input id="asset" name="no_asset" type="text" class="w-[50vw] bg-transparent text-white text-xl font-bold ml-4" disabled>
    </div>
  </form>
  <button id="open_dtlist" on:click={open_input__alat_search} type="button" class="fixed z-20 right-2 top-[6vh] w-6 h-6 rounded bg-transparent open_white">
  </button>
  <button id="new__data" type="button" class="fixed z-20 right-2 top-[10vh] w-6 h-6 rounded bg-transparent opacity-50 plus" disabled>
  </button>
</header>
<main class="fixed flex flex-col top-[25vh] bg-slate-300 w-screen h-[75vh]">
  <Table {table_array}/>

</main>

