window.onload = function(){
    let response,
        xhr = new XMLHttpRequest(),
        url = '/data/devices_atm';
    xhr.open('GET', url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            response = JSON.parse(xhr.responseText);
            console.log(response);
            document.querySelector('#result').innerHTML = `${response}`;
        }
    };
};
