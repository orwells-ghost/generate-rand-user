var btn = document.getElementById('btn');
var fullnameDisplay = document.getElementById('fullname');
var avatar = document.getElementById('avatar');
var username = document.getElementById('username');
var city = document.getElementById('city');
var email = document.getElementById('email');
var url = 'https://randomuser.me/api/';

btn.addEventListener('click', function() {
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(displayErrors);
});

function handleErrors(res) {
    if (!res.ok) {
        throw Error(res.status);
    }
    return res;
}

function displayErrors(error){
    console.log(error);
}

function parseJSON(res) {
    return res.json().then(function(parsedData){
        return parsedData.results[0]; 
        //parsing json will be object called results with only one relevant item [0]
    });
}

function updateProfile(data){
    var fullname = capitalize(data.name.first) + ' ' + capitalize(data.name.last);
    fullnameDisplay.innerText = fullname;
    avatar.src = data.picture.large;
    username.innerText = data.login.username;
    city.innerText = capitalize(data.location.city);
    email.innerText = data.email;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}