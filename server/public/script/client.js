$(document).ready(main);

function main() {
    console.log('JS/jQ working');
    getPets();
    getOwner();
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
        $('#tBody').append($tr);
    }
}