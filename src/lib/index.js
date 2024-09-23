export {auth} from './utility/auth.js';
export {api_access} from './utility/data_access.js';
export {DOM} from './utility/dom.js';
export {TableDOM} from './utility/DOM/table.js';
// place files you want to import through the `$lib` alias in this folder.

export { default as Formset } from './components/formset.svelte';
export { default as Load } from './components/load.svelte';
export { default as Nav } from './components/nav.svelte';
export { default as SearchForm } from './components/search_form.svelte';
export { default as Table } from './components/table.svelte';

export const nav_array = [
    {href:'index.html', text:'Home'},
    {href: 'tool.html', text: 'Tool Data'},
    //{href: 'point.html', text: 'Checklist'}, // point pengecekan
    //{href: 'reff_vjs.html', text: 'Reference Data', data_attr:['role::admin']}, //reference
    {href: 'http://informationsystem.sbe.co.id:8080/mra/vjs_online/index.php', text: 'Old Data'},
  ]
