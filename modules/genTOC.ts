interface TocElement {
    name: string,
    class: string,
    text: string
}

function genTOC(toc: Ref<TocElement[]>) {
    if (!process.client) {
        return;
    }
    toc.value = [];
    const headers = document.querySelectorAll('h2, h3, h4');
    headers.forEach((header, index) => {
        if (header.id === "") {
          header.id = `header-${index}`;
        }
        toc.value.push({"name": header.id, "class": "toc" + header.tagName, "text": typeof header.textContent === "string" ? header.textContent : ""});
    });
}

export default genTOC;