function suitSign(text: string) :string {
    if (typeof text !== "string") {
        return "";
    }
    let tmp: string = text.replace(/!H/g, "<span style=\"color:tomato\">&#9829;</span>");
    tmp = tmp.replace(/!D/g, "<span style=\"color:orange\">&#9830;</span>");
    tmp = tmp.replace(/!C/g, "<span style=\"color:DarkSlateGray\">&#9827;</span>");
    tmp = tmp.replace(/!S/g, "<span style=\"color:black\">&#9824;</span>");
    return tmp;
}

export default suitSign;