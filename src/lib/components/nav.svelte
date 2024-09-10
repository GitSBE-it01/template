<script>
    export let nav_array =[];
    export let title = 'Default';
</script>

<nav class="fixed flex flex-row top-0 bg-slate-950 w-screen h-[5vh]">
    <div class="list-none flex justify-center items-center w-[7vw] h-full hover:pt-2 hover:bg-slate-700 duration-200 pt-2 ease-in-out hover:border-b-4 hover:border-blue-500">
        <a href="http://informationsystem.sbe.co.id:8080/sbe/index.php">
            <button type="button" class="home h-8 w-8 bg-transparent"></button>
        </a>
    </div>
    <div class="w-[63vw] h-full">
        <ul class="w-full h-full flex flex-row">
            {#each nav_array as item, i}
                {#if i===0}
                <li class="h-full w-[10vw] justify-center items-center flex">
                    <a href={item.href} class="h-full w-[10vw] text-white justify-center items-center flex hover:bg-slate-700 duration-200 ease-in-out hover:border-blue-500 hover:font-semibold hover:border-b-4 bg-blue-800 border-blue-300 border-b-4 font-semibold">{item.text}</a>
                </li>
                {:else}
                <li data-role="admin" class="h-full w-[10vw] justify-center items-center flex">
                    <a href={item.href}  data-role="admin" class="flex justify-center items-center hover:bg-slate-700 duration-200 ease-in-out hover:border-blue-500 hover:font-semibold hover:border-b-4 h-full w-full text-white ease-in-out duration-200">{item.text}</a>
                </li>
                {/if}
            {/each}
        </ul>
    </div>
    <div class="w-[30vw] h-full flex">
        <h1 class="text-2xl underline h-full w-full pt-2 capitalize font-bold italic text-slate-200 text-right mr-[1vw]">{title}
        </h1>
    </div>
</nav>