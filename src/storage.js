// Functions to get and put notes.
// These functions take care of the list of notes. The function to modify the list is not exported.

function getList() {
    // list is null if it doesn't exsist
    var list = JSON.parse(localStorage.getItem("_list"));
    if (list === null) {
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
    // If note does not already exsists
    if (!badNoteName(title)) {
        // Save note
        localStorage.setItem(title, contents);
        // Add note to list of notes
        list.push(title);
        // Save list
        putList(list);
    } else {
        // Do something better here
        console.log("Note already exsists or bad note name")
    }
}

// This somewhat of a duplicate of the duplicate checker code in put()
function badNoteName(title) {
    // Get list
    var list = getList();
    // If note already exsists return true else false
    return (list.includes(title) || title == null || title.length === 0 || title.trim().length === 0)
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

export default { get, put, getList, badNoteName }