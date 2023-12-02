const { boxed } = require("./formatting.js");

function permutations(arr) {
    if (arr.length === 0) {
        return [[]];
    }

    const result = [];

    for (let i = 0; i < arr.length; i++) {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const perms = permutations(rest);

        for (const perm of perms) {
            result.push([arr[i], ...perm]);
        }
    }

    return result;
}

function generateCode(digits) {
    if (!/^[0-9]{2,4}$/.test(digits)) {
        console.log(`❌ Error: Invalid input. {${digits}}`);
        return `\` ❌ Error: Invalid input. Please provide digits 0-9, 2-4 digits.\``;
    }

    console.log(`🔒 Codes will be generated for: ${digits}`);
    digits = digits.toString().split("").map(Number);

    const perms = new Set();

    const patterns = {
        2: [[0, 1, 0, 1]],
        3: [
            [0, 1, 2, 0],
            [0, 1, 2, 1],
            [0, 1, 2, 2],
        ],
        4: [[0, 1, 2, 3]],
    };

    for (const pattern of patterns[digits.length]) {
        const p = pattern.map((i) => digits[i]);
        const pPerms = permutations(p);
        for (const perm of pPerms) {
            perms.add(perm.join(""));
        }
    }

    console.log(`🔒 Codes: ${[...perms].join(", ")}`);
    return boxed([...perms].join(", "));
}

module.exports = { generateCode };
