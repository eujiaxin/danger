import crypto from "crypto";

const fs = window.require("original-fs");
const path = window.require("path");
const encryption_file_path = path.join(
    __dirname,
    "../../../../../../src/encryption.txt"
);

function RNG(seed) {
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;
    this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
}

RNG.prototype.nextInt = function () {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
};

RNG.prototype.nextFloat = function () {
    return this.nextInt() / (this.m - 1);
};

const rand_split = (s) => {
    if (s.length > 0) {
        const pivot = Math.ceil(8 + rng.nextFloat() * 8);
        return [s.substring(0, pivot)].concat(rand_split(s.substring(pivot)));
    }
    return [];
};

const rng = new RNG(69);
const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+[]{}:':\",.<>| ";
const hex_d = {
    a: "10",
    b: "11",
    c: "12",
    d: "13",
    e: "14",
    f: "15",
};

const reverse_kv = (dictionary) =>
    Object.fromEntries(Object.entries(dictionary).map((a) => a.reverse()));

const value = (s, salt) => {
    let res = "";
    for (let i = 0; i < s.length; i++) {
        if (s[i] in hex_d) {
            res += hex_d[s[i]];
        } else {
            res += s[i];
        }
    }
    return Number(res) + salt;
};

const hash = (password) =>
    crypto.createHash("md5").update(password).digest("hex");

const substitution_cypher = (password) => {
    let index_to_char = {};
    let curr_hash = hash(password);
    let iter = 0,
        index = 0;
    while (Object.keys(index_to_char).length < alphabet.length) {
        for (let i = 0; i < curr_hash.length; i += 2) {
            let key = value(curr_hash.substr(i, 2), iter) % alphabet.length;
            if (!(key in index_to_char)) {
                index_to_char[key] = alphabet[index];
                index += 1;
            }
        }
        curr_hash = hash(curr_hash);
        iter += 1;
    }
    return index_to_char;
};

const encode_obj = (obj, password) => {
    const char_to_index = reverse_kv(substitution_cypher(password));
    const s = `${obj.website}|${obj.username}|${obj.password}|`;
    let res = "";
    for (let i = 0; i < s.length; i++) {
        res += char_to_index[s[i]];
        if (i !== s.length - 1) {
            res += "\n";
        }
    }
    return res;
};

const parse_decode = (decoded) => {
    const res = [];
    const arr =
        (decoded.match(/\|/g) || []).length % 3 === 0 &&
        (decoded.match(/\|/g) || []).length !== 0
            ? decoded.split("|").slice(0, -1)
            : rand_split(decoded.replace("|", ""));
    for (let i = 0; i < arr.length && i + 2 < arr.length; i += 3) {
        res.push({
            website: arr[i],
            username: arr[i + 1],
            password: arr[i + 2],
        });
    }
    return res;
};

const decode_cypher = (cypher, password) => {
    const index_to_char = substitution_cypher(password);
    let decoded = "";
    let curr_index = "";
    for (let i = 0; i < cypher.length; i++) {
        if (cypher[i] !== "\n") {
            curr_index += cypher[i];
        } else {
            decoded +=
                index_to_char[curr_index] !== undefined
                    ? index_to_char[curr_index]
                    : "";
            curr_index = "";
        }
    }
    decoded +=
        index_to_char[curr_index] !== undefined
            ? index_to_char[curr_index]
            : "";
    return parse_decode(decoded);
};

const sync_file = (arr, password) => {
    const encoding = arr.reduce(
        (acc, e) => `${acc}${encode_obj(e, password)}\n`,
        ""
    );
    fs.writeFileSync(encryption_file_path, encoding);
};

const decrypt_file = (password) => {
    const cypher = fs.readFileSync(encryption_file_path, {
        encoding: "utf8",
    });
    return decode_cypher(cypher, password);
};

const my_export = {
    sync_file,
    decrypt_file,
};

export default my_export;
