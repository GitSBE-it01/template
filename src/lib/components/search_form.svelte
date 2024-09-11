<script>
    export let form_array={
        id: '',
        list: '',
        btn_set: [
            //{method: 'test', name:'test_name'}
        ],
    };

</script>

<div id='{form_array.id}__container' class="flex flex-row gap-2 items-center">
    {#if form_array.list!==undefined} 
        <input id='{form_array.id}__input' type="text" placeholder="search" autocomplete="off" list={form_array.list} class="rounded px-2 text-sm h-[1.6rem] focus:ring focus:ring-blue-400 focus:ring-width-4 focus:outline focus:outline-blue-400 duration-300 right-10 shadow-md w-[40vw]">
    {:else}
        <input id='{form_array.id}__input' type="text" placeholder="search" autocomplete="off" list={form_array.list} class="rounded px-2 text-sm h-[1.6rem] focus:ring focus:ring-blue-400 focus:ring-width-4 focus:outline focus:outline-blue-400 duration-300 right-10 shadow-md w-[40vw]">
    {/if}
    {#if form_array.btn_set.length >0}
        {#each form_array.btn_set as item}
            {#if item.onClick !== undefined}
            <button id='{form_array.id}__{item.method}_btn' on:click={item.onClick} data-method={item.method} type="button" class="rounded bg-gray-300 w-[10vw] text-sm border-2 border-slate-400 shadow-md hover:font-semibold duration-300" >
                {item.name}
            </button>
            {:else}
            <button id='{form_array.id}__{item.method}_btn' data-method={item.method} type="button" class="rounded bg-gray-300 w-[10vw] text-sm border-2 border-slate-400 shadow-md hover:font-semibold duration-300" >
                {item.name}
            </button>
            {/if}
        {/each}
    {/if}
</div>