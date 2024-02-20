//image carousel
function startCarousel() {
    let activeImage = 0
    const images = document.querySelectorAll('#carousel img')

    function cycleImages() {
        if (!images[activeImage]) {
            clearInterval(intervalId)
            return;
        }

        images[activeImage].classList.remove('active')
        activeImage = (activeImage + 1) % images.length
        images[activeImage].classList.add('active')
    }

    let intervalId = setInterval(cycleImages, 3000)
}

//edit requests
function editItem(id, name, description) {
    document.getElementById('updateId').value = id
    document.getElementById('updateName').value = name
    document.getElementById('updateDescription').value = description
    document.getElementById('updateForm').action = `/item/update/${id}`
}


//delete requests
async function deleteItem(id) {
    try {
        const response = await fetch (`http://localhost:3000/item/delete/${id}`, {method: 'DELETE'})
        if(response.ok) {
            location.reload()
        } else {
            console.log('failed to delete item.')
        }
    } 
    catch (error) {
        console.log('error occurred:', error)
    }
}

//errors from server
function checkForError() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
        alert("Validation failed. Name and description are required.");
    }
}

//start carousel on page load
window.onload = function () {
    startCarousel();
    checkForError();
}