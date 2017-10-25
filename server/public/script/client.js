$(document).ready(main);

function main() {
    console.log('JS/jQ working');
    getPets();
}

function getPets() {
    $.ajax({
        method: 'GET',
        url: '/pets'
    }) .done(function (response) {
        appendPetData(response);
    }) .fail(function(error) {
        console.log('We ran into a problem', error);
    })
}

function appendPetData(response) {
    $('#tBody').empty();
    for (var i = 0; i < response.length; i += 1) {
        var data = response[i];
        var $tr = $('<tr></tr>');
        $tr.append('<td>' + data.owner + '</td>');
        $tr.append('<td>' + data.name + '</td>');
        $tr.append('<td>' + data.breed + '</td>');
        $tr.append('<td>' + data.color + '</td>');
        $tr.append('<td><button type="button" class="updatebtn">' + data.update + '</button></td>');
        $tr.append('<td><button type="button" class="deletebtn">' + data.delete + '</button></td>');
        $tr.append('<td><button type="button" class="checkbtn">' + data.checkStatus + '</button></td>');
    }
}