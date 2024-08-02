function replaceSuitSigns(tag) {
    for (let i = 0; i < document.getElementsByTagName(tag).length; i++) {
        let text = document.getElementsByTagName(tag)[i].innerHTML;
        text = text.replace(/Dbl./g, "<span style=\"font-weight: bold; color:red;\">X</span>");
        text = text.replace(/Rdbl./g, "<span style=\"font-weight: bold; color:blue;\">XX</span>");
        text = text.replace(/!H/g, "<span style=\"color:tomato\">&#9829;</span>");
        text = text.replace(/!D/g, "<span style=\"color:orange\">&#9830;</span>");
        text = text.replace(/!C/g, "<span style=\"color:DarkSlateGray\">&#9827;</span>");
        document.getElementsByTagName(tag)[i].innerHTML = text.replace(/!S/g, "<span style=\"color:black\">&#9824;</span>");
    }
}

replaceSuitSigns("body");