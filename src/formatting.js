function bold(str) {
    return `**${str}**`;
}

function italics(str) {
    return `*${str}*`;
}

function strikethrough(str) {
    return `~~${str}~~`;
}

function underline(str) {
    return `__${str}__`;
}

function spoiler(str) {
    return `||${str}||`;
}

function highlighted(str) {
    return `\`${str}\``;
}

function quote(str) {
    return `> ${str}`;
}

function boxed(str) {
    return `\`\`\`${str}\`\`\``;
}

function hyperlink(str, url) {
    return `[${str}](${url})`;
}

module.exports = {
    bold,
    italics,
    strikethrough,
    underline,
    spoiler,
    highlighted,
    quote,
    boxed,
    hyperlink,
};
