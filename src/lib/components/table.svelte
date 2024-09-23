<script>
    export let table_array= {
        id: '',
        count: 50,
        field: [
            {header: 'test', name:'test_name'}
        ],
    };
    let td_inp_class = 'w-full rounded h-full focus:ring focus:ring-blue-600 focus:ring-width-1 focus:outline focus:bg-slate-200 focus:outline-blue-600 bg-transparent px-4 hidden';
    let elements = Array(table_array.count).fill(0);


</script>

<div id="{table_array.id}__container" class='h-full w-full'>
    <div id="{table_array.id}__card" class='h-[95%] w-full overflow-auto'>
        <table id={table_array.id} class="w-full">
            <thead>
                <tr data-id="{table_array.id}__header">
                    {#each table_array.field as item, i}
                        {#if i===0}
                            <th class="bg-blue-700 border-2 text-white uppercase border-black p-2 sticky left-0 top-0 z-20">{item.header}</th>
                        {:else}
                            <th class="bg-blue-600 border-2 text-white uppercase border-black p-2 sticky top-0 z-10">{item.header}</th>
                        {/if}
                    {/each}
                </tr>
            </thead>
            <tbody>
                <tr data-id="{table_array.id}__template" class='hidden'>
                {#each table_array.field as item, ii}
                    {#if ii===0}
                        <td data-field={item.name} class="bg-slate-400 whitespace-normal border-2 text-center text-sm font-semibold border-black p-2 sticky left-0 z-10">
                            <label for="{item.name}__template" data-field={item.name} class="p-2"></label>
                            <input type="text" name={item.name} id='{item.name}__template' class={td_inp_class} autocomplete="off">
                        </td>
                    {:else}
                        <td data-field={item.name} class="bg-slate-300 whitespace-normal border-2 text-sm p-2 border-black" >
                            <label for="{item.name}__template" data-field={item.name} class="p-2"></label>
                            <input type="text" name={item.name} id='{item.name}__template' class={td_inp_class} autocomplete="off">
                        </td>
                    {/if}
                    {/each}
                </tr>
                {#each elements as _, i}
                    <tr data-id="{table_array.id}__{i}" class='hidden'>
                    {#each table_array.field as item, ii}
                        {#if ii===0}
                            <td data-field={item.name} class="bg-slate-400 whitespace-normal border-2 text-center text-sm font-semibold border-black p-2 sticky left-0 z-10">
                                <label for="{item.name}__{i}" data-field={item.name} class="p-2"></label>
                                <input type="text" name={item.name} id='{item.name}__{i}' class={td_inp_class}>
                            </td>
                        {:else}
                            <td data-field={item.name} class="bg-slate-300 whitespace-normal border-2 text-sm p-2 border-black" >
                                <label for="{item.name}__{i}" data-field={item.name} class="p-2"></label>
                                <input type="text" name={item.name} id='{item.name}__{i}' class={td_inp_class}>
                            </td>
                        {/if}
                    {/each}
                {/each}
            </tbody>
        </table>
    </div>
    <div id='{table_array.id}_pagination_div' class="h-[5%] w-full bg-slate-700 flex items-center">
        <div id="{table_array.id}_pagination" class="flex flex-row m-2 w-full items-center justify-center">
            <button type="button" data-group={table_array.id} data-page="1" data-id="1" data-pagi="active" class="border-2 border-slate-400 p-1 w-8 h-8 justify-center items-center duration-300 flex text-white font-bold bg-blue-700">1</button>
            <button type="button" data-group={table_array.id} data-page="2" data-id="2" class="border-2 border-slate-400 p-1 w-8 h-8 justify-center items-center duration-300 flex bg-slate-200">2</button>
            <button type="button" data-group={table_array.id} data-page="3" data-id="3" class="border-2 border-slate-400 p-1 w-8 h-8 justify-center items-center duration-300 flex bg-slate-200">3</button>
            <button type="button" data-group={table_array.id} data-page="4" data-id="4" class="border-2 border-slate-400 p-1 w-8 h-8 justify-center items-center duration-300 flex bg-slate-200">4</button>
            <button type="button" data-group={table_array.id} data-page="5" data-id="5" class="border-2 border-slate-400 p-1 w-8 h-8 justify-center items-center duration-300 flex bg-slate-200">5</button>
            <button type="button" data-group={table_array.id} data-page="6" data-id="6" class="border-2 border-slate-400 p-1 w-8 h-8 justify-center items-center duration-300 flex bg-slate-200 hover:font-bold hover:bg-blue-700 hover:text-white hover:border-black cursor-pointer">6</button>
            <button type="button" data-group={table_array.id} data-page="7" data-id="7" class="border-2 border-slate-400 p-1 w-8 h-8 justify-center items-center duration-300 flex bg-slate-200">7</button>
        </div>
    </div>
</div>

