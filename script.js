/** Create a full CRUD application of your choice using an API or JSON Server.
- Use JQuery/AJAX to interact with the API. 
- Use a form to post new entities.
- Build a way for users to update or delete entities.
- Include a way to get entities from the API.
- Use Bootstrap and CSS to style your project.
 */

const MOCKAPI_URL = 'https://689ab195e727e9657f624e24.mockapi.io/'


$(document).ready(function (){
    const getUsers = () => {
        console.log('Getting all users from the API!')
        return $.get(`${MOCKAPI_URL}/users`)
    }
    //Function that deletes a user
    const deleteUser = (id) => {
    console.log('Deleting user...')
    $.ajax({
        type: 'DELETE',
        url: `${MOCKAPI_URL}/users/${id}`,
        success: getUsers().done(renderData()),
    })
    }

//Function that POSTS' a new user
const postUser = (event) => {
    event.preventDefault()


//Create an object ...a new user...to POST

const userObject = {
    name: $('#fullName').val(),
    jobTitle: $('#jobTitle').val(), 
    companyName: $('#companyName').val(),
  }

  //Do the ajax 'PUT' method with the updated info
  $.ajax({
    type: 'POST',
    url: `${MOCKAPI_URL}/users`,
    data: userObject,
    dataType: 'application/json',
    success: getUsers().done(renderData()),

  })

//Reset the form values to empty

$('#fullName').val('')
$('#jobTitle').val('')
$('#companyName').val('')

}


//Function that updates a users name

const updateUser = (user) => {
  console.log(user)
  user.name = $(`#updateUser${user.id}`).val(),
  console.log(user)


    $.ajax({
        type: 'PUT',
        url: `$(MOCKAPI_URL)/users/${user.id}`.val(),
        data: user, 
        dataType: 'application/json',
        success: getUsers().done(renderData()),
    })
}



//Function to render our user data from the mockAPI url
    const renderData = () => {
    getUsers().then((users) => {
        console.log(users)
       for (let user of users) {
        //this is prepending our users 1 by 1....
         $(`#tBody`).prepend(`
            <tr>
              <td>${user.name}</td>
              <td>${user.jobTitle}</td>
              <td>${user.companyName}</td>
              <td>
              <input class="input" type="text" id="updateUser${user.id}"/>
              <button class="btn btn-info" id="updateButton">Update User</button></td>
              <td><button id="delete${user.id}" class="btn btn-danger">Delete User</button></td>
              </tr>
            `)

            //Add an event listener for every delete button... pass their user.id so
            //We can use that user.id as a target in our function
            $(`#delete${user.id}`).click(() => deleteUser(user.id))



            //Add an event listener for every update button. But we will pass in
            //the entire object this time, instead of just the ID
             $(`updateButton`).click(() => updateUser(user))
         }
 
      })
    }


    $('#formSubmit').click(postUser)
    renderData()
})