/*
    CSCV337 Web Programming - Provided File
    vigenere.js 
    Notes:  You may add functions to this script to organize your code.  I've included JavaScript-based QUnit tests
    you can use to validate your implementation of the algorithm, which refer to the encrypt/decrypt functions.
    Include vigenere.js within your HTML file.
*/
const map = Array.prototype.map

function formatKey (key, len) {
    let e = key.replace(/[^a-zA-Z]/g,'').padEnd(len, key.replace(/[^a-zA-Z]/g,''))
    console.log(e, "testtest")
    return e
}

function encrypt(plaintext, key) {
    var ciphertext = "";
    // TODO: Put your encryption logic here.  Assign the resulting ciphertext to the ciphertext variable.
    if  (
            (plaintext === "") ||
            (key === "") ||
            (key.match(/[^a-zA-Z\s]/g))
        ){
            throw 'Please enter a non-empty value!'
    }
    var specialchars = [...plaintext].map(function(e,i) {
        let c = e.charCodeAt(0);
        if (!isLetter(c)){
            return [e.charCodeAt(0), i];
        } else {
            return false;
        }
        }).filter(function(e) {
            if (e) {
                return e
            }
        })
    
    var textchars = map.call(plaintext.replace(/[\s,!*+?^${}@()|.]/g, ''), letter => {
        return letter.charCodeAt(0)
    })
    
    var keychars = formatKey(key, textchars.length)
    
    ciphertext = map.call(textchars.map(function(letter, index) {
        return [letter, keychars[index]];
        }), tuple => cipher(tuple, 'e'))
    
    specialchars.forEach(element => {
        ciphertext.splice(element[1], 0, element[0])
    });

    ciphertext = String.fromCharCode(...ciphertext)

    return ciphertext
}

function decrypt(ciphertext, key) {
    
    var plaintext = "";
    if  (
            (ciphertext === "") ||
            (key === "") ||
            (key.match(/[^a-zA-Z\s]/g))
        ){
            throw false;
    }

    var specialchars = [...ciphertext].map(function(e,i) {
        let c = e.charCodeAt(0);
        if (!isLetter(c)){
            return [e.charCodeAt(0), i];
        } else {
            return false;
        }
        }).filter(function(e) {
            if (e) {
                return e
            }
        })
    
    var textchars = map.call(ciphertext.replace(/[^a-zA-Z]/g, ''), letter => {
        return letter.charCodeAt(0)
    })
    
    var keychars = formatKey(key, textchars.length)

    plaintext = map.call(textchars.map(function(letter, index) {
        return [letter, keychars[index]];
    }), tuple => cipher(tuple, 'd'))
    console.log(specialchars)
    
    specialchars.forEach(element => {
        plaintext.splice(element[1], 0, element[0])
    });

    plaintext = String.fromCharCode(...plaintext)
    return plaintext;
}

function cipher(tup, method) {
    var r;
    // console.log(String.fromCharCode(tup[0]), tup[1])
    let m = tup[0] - getDividend(tup[0])
    let k = isLower(tup[0]) ? (tup[1].toLowerCase()).charCodeAt(0) - 97
                            : (tup[1].toUpperCase()).charCodeAt(0) - 65
    console.log(String.fromCharCode(m), String.fromCharCode(k))
    try {
        if (method == 'd'){
            r = modular((m - k), 26);
            return r + getDividend(tup[0])
            }
        
        else if (method == 'e') {
                r = modular((m + k), 26)
                return r + getDividend(tup[0])
            }
        }
    catch(err) {
        return num
    }
}

function modular(x, y) {
    z = ((x % y) + y) % y
    return z
}

function getDividend(char) {
    return isLower(char) ? 97
        : isUpper(char) ? 65
        : false; 
    }

function isUpper(c) {
    if (c > 64 && c < 91) {
        return true
    } else {
        return false
    }
}

function isLower(c) {
    if (c > 96 && c < 123) {
        return true
    } else {
        return false
    }
}

function isLetter(c) {
    if (isUpper(c) || isLower(c)){
        return true
    } else {
        return false
    }
}

function formatKey (key, len) {
    let e = key.replace(/[^a-zA-Z]/g,'').padEnd(len, key.replace(/[^a-zA-Z]/g,''))
    console.log(e, "testtest")
    return e
}
