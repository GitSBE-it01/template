export const auth = async() =>{
    //sessionStorage.clear();
    //const check = window.location.href.split("/");
    let url =`http://informationsystem.sbe.co.id:8080/wbd/2.backend/auth.php`;
    let ori =`http://localhost:5173`;
    try {
        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Ori': ori,
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //const check = window.location.href.split("/");
        const newURL = 'http://informationsystem.sbe.co.id:8080/sbe/index.php';
        if(typeof data === 'string' && data.includes('failed')) {
            window.location.replace(newURL);
            return;
        } else {
            //sessionStorage.setItem('userData', JSON.stringify(data));
            return;
        }
    } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
}