export const api_access = async(action, table, data) =>{
    // const check = window.location.href.split("/");
    let url =`http://informationsystem.sbe.co.id:8080/wbd/2.backend/api_test.php`;
    let resp = '';
    if(action.includes('get')) {resp = await get(url, table, action, "GET")}
    else if(action.includes('fetch')) {resp = await execute(url, table, action, "POST", data);}
    else if(action.includes('insert')) {resp = await execute(url, table, action, "POST", data)}
    else if(action.includes('update')) {resp = await execute(url, table, action, "PUT", data)}
    else if(action.includes('delete')) {resp = await execute(url, table, action, "DELETE", data)}
    else {resp = await execute(url, table, action, "POST", data)}
    return resp;
}

const get = async(url, table, action, method) => {
    try {
        let fix_action = action;
        let cache = 'no-cache';
        if(action.includes("cache")) {
            let splt = action.split("__");
            fix_action = splt[0];
            cache = 'cache';
        }
        const response = await fetch(url, {
            method: method, 
            headers: {
              'Content-Type': 'application/json',
              'Req-Detail': table,
              'Req-Method': fix_action,
              'Cache-Control': cache
          },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
}

const execute = async(url, table, action, method, data)=>{
    try {
        let fix_action = action;
        let cache = 'no-cache';
        if(action.includes("cache")) {
            let splt = action.split("__");
            fix_action = splt[0];
            cache = 'cache';
        }
        const response = await fetch(url, {
            method: method, 
            headers: {
              'Content-Type': 'application/json',
              'Req-Detail': table,
              'Req-Method': fix_action,
              'Cache-Control': cache
          },
          body: JSON.stringify({Data:data})
        });
        if (!response.ok) {
            console.log(response)
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
}

