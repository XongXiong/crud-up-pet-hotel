$(document).ready(main);

function main() {
    console.log('JS/jQ working');
    getPets();
    getOwner();
    $('#ownerForm').on('submit',newOwner);
    $('#tBody').on('click','.deletebtn', deleteData);

}

function getPets() {
    $.ajax({
        method: 'GET',
        url: '/pet'
    }) .done(function (response) {
        appendPetData(response);
        console.log(response);
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
        var $option = $('<option></option>');
        $option.append(data.first_name);
        $option.append(data.last_name);
        $('#ownerSelect').append($option);
    }
}


function appendPetData(response) {
    $('#tBody').empty();
    for (var i = 0; i < response.length; i += 1) {
        var data = response[i];
        console.log('looking at data',data);
        var $tr = $('<tr></tr>');
        $tr.append('<td>' + data.first_name + '</td>');
        $tr.append('<td>' + data.name + '</td>');
        $tr.append('<td>' + data.breed + '</td>');
        $tr.append('<td>' + data.color + '</td>');
        $tr.append('<td><button type="button" class="updatebtn btn-primary btn-sm" data-id="' + data.id + '">GO</button></td>');
        $tr.append('<td><button type="button" class="deletebtn btn-primary btn-sm" data-id="' + data.id + '">GO</button></td>');
        $tr.append('<td><button type="button" class="checkbtn btn-primary btn-sm" data-id="' + data.id + '">IN/OUT</button></td>');
        $('#tBody').append($tr);
    }
}

function postPets(petToSend) {
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
        console.log('Before append:', petList);
        appendPetData(petList);
    }).fail(function (error) {
        alert('Something went wrong');
    });
}

// DELETE an existing pet
function deleteData(){
    var petId = $(this).data('id');
    console.log('Delete pet with id', petId);
    $.ajax({
        method: 'DELETE',
        url: '/pet/' + petId      
    }).done (function (response){
        console.log(response);
        refreshPets();
    }).fail( function (error){
        alert('Somepet went wrong', error);
    });
}