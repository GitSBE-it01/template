<script>
    export let table_array={
        id: '',
        count: 50,
        field: [
            {header: 'test', name:'test_name'}
        ],
    };

    let td_class = 'w-full rounded h-full focus:ring focus:ring-blue-600 focus:ring-width-1 focus:outline focus:bg-slate-200 focus:outline-blue-600 bg-transparent px-4 hidden';
    let elements = Array(table_array.count).fill(0);
</script>

<table id={table_array.id} class="h-[95vh] w-full">
    <thead class='h-[10%] w-full'>
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
    <tbody class='h-[80%] w-full'>
        {#each elements as _, i}
            <tr data-id="{table_array.id}__{i}">
            {#each table_array.field as item, ii}
                {#if ii===0}
                    <td data-field={item.name} class="bg-slate-400 whitespace-normal border-2 text-center text-sm font-semibold border-black p-2 sticky left-0 z-10">
                        <label for="{item.name}__{i}" data-field={item.name} class="p-2"></label>
                        <input type="text" name={item.name} id='{item.name}__{i}' class={td_class}>
                    </td>
                {:else}
                    <td data-field={item.name} class="bg-slate-300 whitespace-normal border-2 text-sm p-2 border-black" >
                        <label for="{item.name}__{i}" data-field={item.name} class="p-2"></label>
                        <input type="text" name={item.name} id='{item.name}__{i}' class={td_class}>
                    </td>
                {/if}
            {/each}
        {/each}
    </tbody>
    <tfoot class='h-[10%] w-full bg-slate-800'>
        <div>
            testing
        </div>
    </tfoot>
</table>

