<script>
    export let formset_array = {
        id: '',
        column: 1,
        form: [
            {field: '', label:'', type:'', class:''}
        ]
    };

    let i = 1;
    let ii = 0;
    let cek = true;
    let elements = [];
    formset_array.form.forEach(dt=>{
        /*
            id
            class
            type
            value
            placeholder
            disable
            require
            data-attribute
        */
        if(cek) {
            ii++;
            dt['col']=ii;
            elements.push(ii);
            cek = false;
        } else {
            dt['col']=ii;
        }
            if(i%formset_array.column === 0) {
                cek = true;
            } else {
                cek = false;
            }
        i++;
    })
    console.log({formset_array, elements});
</script>

<div id='{formset_array.id}__container' class='flex flex-col h-full w-full gap-3'>
    {#each elements as i}
        <div id='{formset_array.id}_{i}__row' class='flex flex-row w-full gap-4 px-2'>
            {#each formset_array.form as item}
                {#if item.col === i && item.type !== 'hidden'}
                    <div id='{item.field}__{formset_array.id}__container' class="flex-1 flex flex-row gap-2 items-center">
                        <label for="{item.field}__{formset_array.id}" data-field={item.field} class="w-[20%]">{item.label}</label>
                        {#if item.disable !== undefined }
                            <input type={item.type} name={item.field} id='{item.field}__{formset_array.id}' disabled autocomplete="off" placeholder="" class='w-[60%] rounded focus:ring focus:ring-blue-600 focus:ring-width-1 focus:outline focus:bg-slate-200 focus:outline-blue-600 px-4'>
                        {:else}
                            <input type={item.type} name={item.field} id='{item.field}__{formset_array.id}' autocomplete="off" placeholder="" class='w-[60%] rounded focus:ring focus:ring-blue-600 focus:ring-width-1 focus:outline focus:bg-slate-200 focus:outline-blue-600 px-4'>
                        {/if}
                    </div>
                {/if}
                {#if item.type === 'hidden'}
                    <input type={item.type} name={item.field} id='{item.field}__{formset_array.id}'>
                {/if}
            {/each}
        </div>
    {/each}
</div>