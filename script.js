let form = document.forms.repositoriesSearch;
let queryString
let div = document.querySelector(".result")
let result

let inputName = document.querySelector('input[name="name"]')

inputName.onblur = function () {
    if (inputName.value.length < 3) {
        document.querySelector("#errorName").innerHTML = 'Название должно состоять из 3 цифр и больше'
    }
};
inputName.onfocus = function () {
    document.querySelector("#errorName").innerHTML = "";
};

const formDataObj = {};
form.onsubmit = () => {
    let formData = new FormData(form)
    formData.forEach((value, key) => (formDataObj[key] = value));
    queryString = 'q=' + encodeURIComponent(formDataObj["name"]);
    div.innerHTML = ''
    if (formDataObj["name"].length < 3) {
        document.querySelector("#errorName").innerHTML = 'Название должно состоять из 3 символов и больше'
        return false
    } else {
        document.querySelector("#errorName").innerHTML = ''
    }
    searchUsers(queryString).then(r => {
        for (let i = 0; i < 10; i++) {
            if (!result["items"][0]) div.innerHTML += `<p>Ничего не найдено</p>`
            if (!result["items"][i]) break
            console.log(result["items"][i])
            div.innerHTML += `<div class="resultItem"><p> Название: <a target="_blank" href="https://github.com/${result['items'][i]['full_name']}">${result['items'][i]['full_name']}</a></p>
                               <img width="150px" src="${result['items'][i]['owner']['avatar_url']}"><p> Владелец: ${result['items'][i]['owner']['login']}</p></div>`;

        }

    })
    return false
}

async function searchUsers(search) {
    div.innerHTML = `<img src="load.webp">`
    let response = await fetch('https://api.github.com/search/repositories?' + queryString)
    result = await response.json();
    div.innerHTML = ""
}

