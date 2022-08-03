



console.log("This is my postman project");
//hide the paramterBox initially
let parameterBox = document.getElementById('parameterBox');
let jsonBoxId = document.getElementById('jsonBoxId');
parameterBox.style.display = "none";
// if the user clicks the param box  hide the json box
let paramRadio = document.getElementById('paramRadio');
paramRadio.addEventListener('click', () => {
  jsonBoxId.style.display = "none";
  parameterBox.style.display = 'block';
})

// if the user clicks the json box  hide the param box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
  parameterBox.style.display = "none";
  jsonBoxId.style.display = 'block';
})

//if the clicks on the plus button add more paramters
let index = 2;
function ParamsAddition() {
  let str = ` <div class="form-row my-2">
    <label for="jsonBox" class="col-sm-2 col-form-label"
      >Parameter ${index}</label
    >
    <div class="col-md-4 mx-2">
      <input
        type="text"
        class="form-control"
        id="parameterKey${index}"
        placeholder="Enter Parameter key"/>
    </div>
    <div class="col-md-4 mx-2">
      <input
        type="text"
        class="form-control"
        id="parameterValue${index}"
        placeholder="Enter Parameter value"/>
    </div>
    <button  id=${index++} class="btn btn-primary deleteParam" >-</button>
  </div>`;
  parameterBox.innerHTML += str;
  // adding an event listener to the deleteparam class elements to remove the element when clicked
  let deleteParam = document.getElementsByClassName('deleteParam');

  for (item of deleteParam) {
    item.addEventListener('click', (e) => {
      if (confirm("Do you really want to remove ?")) {
        e.target.parentElement.remove();
        index--;
      }

    })
  }


}
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
  // tell the user to wait until  the api to get fetched
  let responseTxt = document.getElementById('responseTxt');
  responseTxt.innerHTML = "Please Wait...";
  // get the vlaue in the mandatory box
  let url = document.getElementById('url').value;
  let requestType = document.querySelector('input[name="requestType"]:checked').value;
  let contentType = document.querySelector('input[name="contentType"]:checked').value;
  let data;

  //if the contentType is parameter then collect all the values
  if (contentType == 'parameters') {
    let myObject = {};
    let key;
    let value;
    for (var i = 1; i < index; i++) {
      key = document.getElementById(`parameterKey${i}`).value;
      value = document.getElementById(`parameterValue${i}`).value;
      myObject[key] = value;
    }
    data = JSON.stringify(myObject);

  }
  else {
    data = document.getElementById('jsonBox').value;
  }
  // check if they get collected or not 
  // console.log(url);
  // console.log(requestType);
  // console.log(contentType);
  // console.log(data);

  //  if the requestType is get,invoke fetch api to create a get request
  if (requestType == "GET") {
    fetch(url, {
      method: "GET"
    }).then(response => response.text())
      .then((json) => {
        responseTxt.innerHTML = json;
       

      })


  }
  // if the requestType is post, invoke fetch api to create post request 
  else if (requestType == "POST") {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(response => response.text())
      .then((json) => {
        responseTxt.innerHTML = json;
       
        
      })


  }

})





