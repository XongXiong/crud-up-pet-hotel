$(document).ready(main);

function main() {
    console.log('JS/jQ working');
    getPets();
    getOwner();
    $('#ownerForm').on('submit',newOwner);
    $('#tBody').on('click','.deletebtn', deleteData);
    $('#tBody').on('click','.updatebtn', updateData);
    $('#updateAddBtn').on('click', '#updatePet', sendUpdated)
    $('#form').on('submit', postPets);

}

var petid = 0;


function getPets() {
    $.ajax({
        method: 'GET',
        url: '/pet'
    }) .done(function (response) {
        appendPetData(response);
    }) .fail(function(error) {
        console.log('We ran into a problem', error);
    })
}

function newOwner(event){
    event.preventDefault();
    var newOwner = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val()
    };
    console.log('Submitting new owner:',newOwner);
    $.ajax({
        method: 'POST',
        url: '/pet/owner',
        data: newOwner
    })
    .done(function(response){
        console.log('New owner posted');
        $('#ownerForm input').val('');
        getOwner();
    })
    .fail(function(error){
        alert('Error POSTing new owner:',error);
    });
}

function getOwner() {
    $.ajax({
        method: 'GET',
        url: '/pet/owner'
    }).done(function (response) {
        appendOwnerData(response);
        console.log(response);
    }).fail(function (error) {
        console.log('We ran into a problem', error);
    })
}




function appendOwnerData(response) {
    $('#ownerSelect').empty();
    for (var i = 0; i < response.length; i += 1) {
        var data = response[i];
        console.log('looking at data', data);
        var $option = $('<option value="' + data.id + '"></option>');
        $option.append(data.first_name);
        $option.append(data.last_name);
        console.log(data.id);
        $option.append(data.id);
        $('#ownerSelect').append($option);
    }
}


function appendPetData(response) {
    $('#tBody').empty();
    for (var i = 0; i < response.length; i += 1) {
        var data = response[i];
        var $tr = $('<tr></tr>');
        $tr.append('<td>' + data.first_name + '</td>');
        $tr.append('<td >' + data.name + '</td>');
        $tr.append('<td>' + data.breed + '</td>');
        $tr.append('<td>' + data.color + '</td>');
        $tr.data('pet', data);
        $tr.data('petid', data.id);
        $tr.data('owner_id', data.owner_id);
        $tr.append('<td><button type="button" class="updatebtn btn-primary btn-sm" data-id="' + data.id + '">GO</button></td>');
        $tr.append('<td><button type="button" class="deletebtn btn-primary btn-sm" data-id="' + data.id + '">GO</button></td>');
        $tr.append('<td><button type="button" class="checkbtn btn-primary btn-sm" data-id="' + data.id + '">IN/OUT</button></td>');
        $('#tBody').append($tr);
    }
}

function postPets(event) {
    event.preventDefault();
    var owner = $('#ownerSelect').val();
    var petName = $('#petName').val();
    var petBreed = $('#breed').val();
    var petColor = $('#color').val();

   var petToSend ={
       owner: owner,
       name: petName,
       breed: petBreed,
       color: petColor
   }
   console.log('postPets',$('#ownerSelect').val());
   
    $.ajax({
        method: 'POST',
        url: '/pet',
        data: petToSend
    }).done(function (response){
        console.log(response);
        refreshPets();
    }).fail(function (error){
        alert('Somepet went wrong');
    });
}

function refreshPets() {
    $.ajax({
        method: 'GET',
        url: '/pet',
    }).done(function( response ){
        console.log(response);
        var petList = response;
        // console.log('Before append:', petList);
        appendPetData(petList);
    }).fail(function (error) {
        alert('Something went wrong');
    });
}

// DELETE an existing pet
function deleteData(){
    console.log(' delete things and stuff');
    petid = $(this).data('id');
    $.ajax({
        method: 'DELETE',
        url: '/pet/'+petid
    }).done(function(response){
        getPets();
    }).fail(function(error){
        console.log('Error deleting', error);
    })
    
}//end delete

function updateData() {
    $('#addPetBtn').remove();
    var ownId  = $(this).closest('tr').data('owner_id');
    var petId = $(this).closest('tr').data('petid');
    console.log(ownId);
    $('#updateAddBtn').append('<button type="summit" class="btn-primary btn-sm" id="updatePet" data-owner_id="' + ownId + '" data-id="' + petId + '">Update Pet</button>');
    pet = $(this).closest('tr').data('pet');
    $('#petName').val(pet.name);
    $('#breed').val(pet.breed);
    $('#color').val(pet.color);
}

function sendUpdated() {
    petid = $(this).data('id');
    var ownTest= $(this).data('owner_id');
   console.log(petid);
   console.log(ownTest);
    updatedPet = {
        name: $('#petName').val(),
        breed: $('#breed').val(),
        color: $('#color').val(),
        owner_id: ownTest
    }
    console.log(updatedPet);
    $.ajax({
        method: 'PUT',
        url: '/pet/' + petid,
        data: updatedPet
    }).done(function (response) {
        console.log(response);
        getPets(response);
    }).fail(function (error) {
        console.log('Error on updating data');
    })
}

// CHECK IN FUNCTION



// CHECK OUT FUNCTION


