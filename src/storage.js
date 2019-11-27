// Functions to get and put notes.
// These functions take care of the list of notes. The function to modify the list is not exported.

function getList() {
    // list is null if it doesn't exsist
    var list = JSON.parse(localStorage.getItem("_list"));
    if (list === null) {
        console.log("Couldn't get the list of notes. Creating new")
        list = [];
    }

    return list;
}

// Do not export
function putList(list) {
    localStorage.setItem("_list", JSON.stringify(list))
}

function put(title, contents) {
    // Get list
    var list = getList();
    // Save note
    localStorage.setItem(title, contents);
    // Add note to list of notes
    list.append(title);
    // Save list
    putList(list);
}

function get(title) {
    var list = getList();
    if (list.includes(title)) {
        return(localStorage.getItem(title))
    } else {
        // ##################### Replace with a popup or something
        console.log("Error cannot get: " + title)
    }
}

export default { get, put, getList }