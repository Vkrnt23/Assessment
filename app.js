const searchBox = document.querySelector('.search-box');
const tableBody=document.querySelector('.table-body');
const message=document.querySelector('.message');
const table=document.querySelector('.table')
// selecting loading div
const loader = document.querySelector("#loading");

// showing loading
function displayLoading() {
    loader.classList.add("display");
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}

displayLoading();
setTimeout(()=>{
    hideLoading()
},1000)
//detecting multiple key presses and setting seach box to focus--
let keysPressed = {};

 document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;

    console.log(keysPressed);
    if ((keysPressed['Meta'] || keysPressed['Control'] )&& event.key == '/') {
        searchBox.focus();
    }
 });
 
 document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });
 ///////////////////////////////

 document.addEventListener('keydown',(event)=>{
     if(event.key == 'Enter'){
            displayLoading();
            console.log("value of searchBox>>>>>>",searchBox.value);
            searchBox.blur();
            getApiData();
            
    }
 })

 //////////////////

 function getApiData(){
    if(searchBox.value !== "" && searchBox.value !== null){
        message.classList.add('hide')
        var options = {
            method: 'GET',
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
            params: {namePrefix:searchBox.value},
            headers: {
              'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
              'x-rapidapi-key': '4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data.data);
              let apiData= response.data.data

              makeHtmlUsingData(apiData);
              hideLoading();
              table.classList.remove('hide')
          }).catch(function (error) {
              console.error(error);
          });
    
    }
    else{
        message.classList.remove('hide');
        table.classList.add('hide');
        hideLoading();
    }
 }

//Tpo generate the html from html template
 function makeHtmlUsingData(data){
        let html=``;
        data.forEach((element,index)=> 
            html+=`
    
                <tr>
                    <td>${index+1}</td>
                    <td>${element.city}</td>
                    <td>${element.country}</td>
                </tr>`
        )

        tableBody.innerHTML=html;
        console.log("html>>>>>>",html);
 }
