function TrieNode() {
    this.children = {}
    this.endOfWord = false
}

function Trie() {
    this.root = new TrieNode()
}

Trie.prototype.insert = function (word) {
    var current = this.root
    for (var i = 0; i < word.length; i++) {
        var ch = word.charAt(i)
        var node = current.children[ch]
        if (node == null) {
            node = new TrieNode()
            current.children[ch] = node
        }
        current = node
    }
    current.endOfWord = true
}

Trie.prototype.search = function (word) {
    var current = this.root
    for (var i = 0; i < word.length; i++) {
        var ch = word.charAt(i)
        var node = current.children[ch]
        if (node == null) {
            return false
        }
        current = node
    }
    return current.endOfWord
}

var trie = new Trie()
trie.insert('sam')
trie.insert('sammie')
console.log(trie.root.children)
console.log(trie.search('sam'))
console.log(trie.search('samm'))
console.log(trie.search('sammie'))

Trie.prototype.delete = function (word) {
    this.deleteRecursively(this.root, word, 0);
}

Trie.prototype.deleteRecursively = function (current, word, index) {
    if (index == word.length) {
        //when end of word is reached only delete if currrent.endOfWord is true.
        if (!current.endOfWord) {
            return false;
        }
        current.endOfWord = false;
        //if current has no other mapping then return true
        return Object.keys(current.children).length == 0;
    }
    var ch = word.charAt(index),
        node = current.children[ch];
    if (node == null) {
        return false;
    }
    var shouldDeleteCurrentNode = this.deleteRecursively(node, word, index + 1);

    // if true is returned then
    // delete the mapping of character and trienode reference from map.
    if (shouldDeleteCurrentNode) {
        delete current.children[ch];
        //return true if no mappings are left in the map.
        return Object.keys(current.children).length == 0;
    }
    return false;
}
var trie1 = new Trie();
trie1.insert("sammie");
trie1.insert("simran");
console.log(trie1.search("simran")); // true
trie1.delete("sammie");
trie1.delete("simran");
console.log(trie1.search("sammie")); // false
console.log(trie1.search("simran")); // false


function buildBadMatchTable(str) {
    var tableObj = {},
        strLength = str.length
    for (var i = 0; i < strLength - 1; i++) {
        tableObj[str[i]] = strLength - 1 - i
    }
    if (tableObj[str[strLength - 1]] == undefined) {
        tableObj[str[strLength - 1]] = strLength
    }
    return tableObj
}

// console.log(buildBadMatchTable('data'))
// console.log(buildBadMatchTable('struct'))
// console.log(buildBadMatchTable('roi'))
console.log(buildBadMatchTable('jam'))


function boyerMoore(str, pattern) {
    var badMatchTable = buildBadMatchTable(pattern),
        offset = 0,
        patternLastIndex = pattern.length - 1,
        scanIndex = patternLastIndex,
        maxOffset = str.length - pattern.length; // if the offset is bigger than maxOffset, cannot be found 

    while (offset <= maxOffset) {
        scanIndex = 0;
        while (pattern[scanIndex] == str[scanIndex + offset]) {
            if (scanIndex == patternLastIndex) {
                // found at this index
                return offset;
            }
            scanIndex++;
        }
        var badMatchString = str[offset + patternLastIndex];
        if (badMatchTable[badMatchString]) {
            // increase the offset if it exists
            offset += badMatchTable[badMatchString]
        }
        else {
            offset += 1;
        }
    }
    return -1;
}

console.log(boyerMoore('ABDCABCABABCABCAB', 'ABC'))


function longestPrefix(str) {
    // prefix array is created
    var prefix = new Array(str.length);
    var maxPrefix = 0;
    // start the prefix at 0
    prefix[0] = 0;
    for (var i = 1; i < str.length; i++) {
        // decrement the prefix value as long as there are mismatches
        while (str.charAt(i) !== str.charAt(maxPrefix) && maxPrefix > 0) {
            maxPrefix = prefix[maxPrefix - 1];
        }
        // strings match, can update it 
        if (str.charAt(maxPrefix) === str.charAt(i)) {
            maxPrefix++;
        }
        // set the prefix 
        prefix[i] = maxPrefix;
    }
    return prefix;
}
// console.log(longestPrefix('ababaca')); // [0, 0, 1, 2, 3, 0, 1]
console.log(longestPrefix('ababcabcabababd')); // []


function KMP(str, pattern) {
    // build the prefix table
    var prefixTable = longestPrefix(pattern),
        patternIndex = 0,
        strIndex = 0;
    while (strIndex < str.length) {
        if (str.charAt(strIndex) != pattern.charAt(patternIndex)) {
            // Case 1: the characters are different
            if (patternIndex != 0) {
                // use the prefix table if possible
                patternIndex = prefixTable[patternIndex - 1];
            } else {
                // increment the str index to next character
                strIndex++;
            }
        } else if (str.charAt(strIndex) == pattern.charAt(patternIndex)) {
            // Case 2: the characters are same
            strIndex++;
            patternIndex++;
        }
        // found the pattern
        if (patternIndex == pattern.length) {
            return true
        }
    }
    return false;
}
console.log('\n')
console.log('KMP')
// console.log(KMP('ababacaababacaababacaababaca', 'ababaca')); //  true
// console.log(KMP('sammiebae', 'bae')); //  true
// console.log(KMP('sammiebae', 'sammie')); //  true
// console.log(KMP('sammiebae', 'sammiebaee')); // false
// console.log(KMP('sammiebae', 'samn')); // false
console.log('rks')

function RabinKarpSearch() {
    this.prime = 101
}
RabinKarpSearch.prototype.rabinKarpFingerprintHash = function (str, endLength) {
    if (endLength == null) endLength = str.length
    var hashInt = 0
    for (var i = 0; i < endLength; i++) {
        hashInt += str.charCodeAt(i) * Math.pow(this.prime, i)
    }
    return hashInt
}
var rks = new RabinKarpSearch()
// console.log(rks.rabinKarpFingerprintHash("sam"))
// console.log(rks.rabinKarpFingerprintHash("sammie"))

console.log(rks.rabinKarpFingerprintHash("sa"))
console.log(rks.rabinKarpFingerprintHash("am"))
console.log(rks.rabinKarpFingerprintHash("me"))

console.log('rks recalculate')

RabinKarpSearch.prototype.recalculateHash = function (str, oldIndex, newIndex, oldHash, patternLength) {
    if (patternLength == null) patternLength = str.length
    var newHash = oldHash - str.charCodeAt(oldIndex)
    newHash = Math.floor(newHash / this.prime)
    newHash += str.charCodeAt(newIndex) * Math.pow(this.prime, patternLength - 1)
    return newHash
}

var oldHash = rks.rabinKarpFingerprintHash("sa"); // 9912 
console.log(rks.recalculateHash("same", 0, 2, oldHash, "sa".length)); //  11106

console.log('rks computer')
console.log(rks.rabinKarpFingerprintHash("computer"))
console.log(rks.rabinKarpFingerprintHash("comp"))
console.log(rks.rabinKarpFingerprintHash("uter"))

console.log('rks rehash computer')
var oldHash1 = rks.rabinKarpFingerprintHash("comp");
var oldHash1 = rks.rabinKarpFingerprintHash("comp");

// Shift the window forward step by step until we get to "uter"
var newHash = rks.recalculateHash("computer", 0, 4, oldHash1, "comp".length);
newHash = rks.recalculateHash("computer", 1, 5, newHash, "comp".length);
newHash = rks.recalculateHash("computer", 2, 6, newHash, "comp".length);
newHash = rks.recalculateHash("computer", 3, 7, newHash, "comp".length);

console.log(newHash);

RabinKarpSearch.prototype.strEquals = function(str1, startIndex1, endIndex1,
    str2, startIndex2, endIndex2) {
    if (endIndex1 - startIndex1 != endIndex2 - startIndex2) {
        return false;
    }
    while (startIndex1 <= endIndex1 &&
        startIndex2 <= endIndex2) {
        if (str1[startIndex1] != str2[startIndex2]) {
            return false;
        }
        startIndex1++;
        startIndex2++;
    }
    return true;
}
RabinKarpSearch.prototype.rabinKarpSearch = function(str, pattern) {
    var T = str.length,
        W = pattern.length,
        patternHash = this.rabinKarpFingerprintHash(pattern, W),
        textHash = this.rabinKarpFingerprintHash(str, W);

    for (var i = 1; i <= T - W + 1; i++) {
        if (patternHash == textHash &&
            this.strEquals(str, i - 1, i + W - 2, pattern, 0, W - 1)) {
            return i - 1;
        }
        if (i < T - W + 1) {
            textHash = this.recalculateHash(str, i - 1, i + W - 1, textHash, W);
        }
    }

    return -1;
}
console.log('rks implemented')
var rks1 = new RabinKarpSearch();
console.log(rks1.rabinKarpSearch("SammieBae", "as"))
console.log(rks1.rabinKarpSearch("SammieBae", "Bae")) // 6
console.log(rks1.rabinKarpSearch("SammieBae", "Sam")) // 0
