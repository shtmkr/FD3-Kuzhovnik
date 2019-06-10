window.onload = function(){
    let data = {
            "first": {
                "driver": {
                    "phone": "375296123456",
                },
                "insurancePolicy": {
                    "series": "PP",
                    "num": "12345",
                }
            },
            "second": {
                "driver": {
                    "phone": "375296234567",
                },
                "insurancePolicy": {
                    "series": "TT",
                    "num": "987456",
                }
            }
        }
        ,
        response,
        xhr = new XMLHttpRequest(),
        url = '/test',
        input = ``;
    for (v in data){
        input += `${v}: ${data[v]}` + '\n ';
    }
    xhr.open('POST', url, true );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            response = JSON.parse(xhr.responseText);
            var output = ``;
            for (i in response){
                output += `${i}: ${response[i]}` + '\n ';
            }
            document.querySelector('#result').innerHTML = `request: \n ${input}\nstatus: ${xhr.status}\n\nresponse: \n ${output}`;
        }
    };
};
