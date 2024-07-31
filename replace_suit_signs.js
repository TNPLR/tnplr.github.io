function replaceSuitSigns(tag) {
    for (let i = 0; i < document.getElementsByTagName(tag).length; i++) {
        let text = document.getElementsByTagName(tag)[i].innerHTML;
        text = text.replace(/!H/gi, "<span style=\"color:tomato\">&#9829;</span>");
        text = text.replace(/!D/gi, "<span style=\"color:orange\">&#9830;</span>");
        text = text.replace(/!C/gi, "<span style=\"color:DarkSlateGray\">&#9827;</span>");
        document.getElementsByTagName(tag)[i].innerHTML = text.replace(/!S/gi, "<span style=\"color:black\">&#9824;</span>");
    }
}

replaceSuitSigns("body");