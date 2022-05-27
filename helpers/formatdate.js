"use strict"

function formatDate(date) {
    return date.toLocaleString('id-ID').split(' ')[0]
}


module.exports = formatDate