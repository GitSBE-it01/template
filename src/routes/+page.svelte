<script>
  import {Nav, Table, api_access} from '$lib';

  let title = 'Jig Database';
  let nav_array = [
    {href:'index.html', text:'home'},
    {href:'about.html', text:'about'}
  ]

  //const data2 = api_access('get', 'role', '');
  //console.log(data2);
  let table_array={
    id: 'table_test',
    count: 50,
    field: [
        {header: 'app name', name:'apps'},
        {header: 'name', name:'abs_name'},
        {header: 'role', name:'role'},
    ],
  };
</script>

<svelte:head>
    <title>Homepage</title>
</svelte:head>

<Nav {nav_array} {title}/>
<main class="fixed flex flex-col top-[5vh] bg-slate-300 w-screen h-[95vh]">
  <Table {table_array}/>
</main>
