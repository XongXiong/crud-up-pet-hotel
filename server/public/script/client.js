$(document).ready(main);

function main() {
    console.log('JS/jQ working');
    getPets();
    postPets();
    getOwner();
    $('#tBody').on('click','.deletebtn', deleteData);
    $('#tBody').on('click','.updatebtn', updateData);
}

var petid = 0;
var petToSend = {
    name: $('#petName').val(),
    breed: $('#breed').val(),
    color: $('#color').val(),
    owner_id: $
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
        $tr.append('<td><button type="button" class="updatebtn">' + data.update + '</button></td>');
        $tr.append('<td><button type="button" class="deletebtn">' + data.delete + '</button></td>');
        $tr.append('<td><button type="button" class="checkbtn">' + data.checkStatus + '</button></td>');
        $tr.data('pet', data[i]);
        $tr.data('petid', data.id);
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
    petid = $(this).data('id');
    console.log('update!');
    $.ajax({
        method: 'PUT',
        url: '/pet/' + petid,
        data: petToSend
    }).done(function (response) {
        console.log('update!');
    })
}