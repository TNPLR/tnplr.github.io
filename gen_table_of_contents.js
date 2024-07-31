document.addEventListener('DOMContentLoaded', function() {
    const tocList = document.getElementById("toc-list");
    const headers = document.querySelectorAll('h2, h3, h4');
    headers.forEach((header, index) => {
        if (header.id === "") {
            header.id = `header-${index}`;
        }
        if (header.id !== "") {
            let upper = document.createElement('li');
            const listItem = upper;
            if (header.tagName === "H3" || header.tagName === "H4") {
                const ulist = document.createElement('ul');
                ulist.appendChild(upper);
                upper = ulist;
            }
            if (header.tagName === "H4") {
                const ulist = document.createElement('ul');
                ulist.appendChild(upper);
                upper = ulist;
            }
            listItem.innerHTML = `<a href="#${header.id}">${header.textContent}</a>`
            tocList.appendChild(upper);
        }
        
    });
});