function textAuction(bid) {
    let text = bid;
    text = text.replace(/([1-7])H/, "$1<span style=\"color:tomato\">&#9829;</span>");
    text = text.replace(/([1-7])D/, "$1<span style=\"color:orange\">&#9830;</span>");
    text = text.replace(/([1-7])C/, "$1<span style=\"color:DarkSlateGray\">&#9827;</span>");
    text = text.replace(/([1-7])S/, "$1<span style=\"color:black\">&#9824;</span>");
    return text;
}

export default textAuction;