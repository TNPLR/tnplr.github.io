<template>
  <header>
    <h1 class="topic">Röle Sistemi</h1>
  </header>
  <button id="topbutton" v-on:click="goToTop" v-show="topbuttonshow"><img style="width: 28px;" src="/arrow_upward.svg" alt="up arrow"></button>
  <div>
        <ul id="horizontal-nav">
            <li><router-link to="/bidding">未受競叫叫牌</router-link></li>
            <li><router-link to="/interference">競叫</router-link></li>
            <li><router-link to="/defense">防禦叫牌</router-link></li>
            <li><router-link to="/signal">防禦信號</router-link></li>
        </ul>
    </div>
  <section>
    <nav>
      <div>
        <ul ref="tocList"></ul>
      </div>
    </nav>
    <router-view></router-view>
  </section>
  <footer>
    不供商業使用。2028年製作。
  </footer>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello world!',
      topbuttonshow: false
    };
  },
  created () {
    window.addEventListener('scroll', this.scrollCheck)
  },
  computed: {
    activePage() {
      return 'interference';
    }
  },
  methods: {
    goToTop() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    scrollCheck() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        this.topbuttonshow = true
      } else {
        this.topbuttonshow = false;
      }
    },
    replaceSuitSigns(ref) {
      let text = ref.innerHTML;
      text = text.replace(/!H/g, "<span style=\"color:tomato\">&#9829;</span>");
      text = text.replace(/!D/g, "<span style=\"color:orange\">&#9830;</span>");
      text = text.replace(/!C/g, "<span style=\"color:DarkSlateGray\">&#9827;</span>");
      ref.innerHTML = text.replace(/!S/g, "<span style=\"color:black\">&#9824;</span>");
    },
    genTOC() {
      const tocList = this.$refs.tocList;
      tocList.replaceChildren();
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
      })
    },
  }
}
</script>



<style>
* {
    box-sizing: border-box;
}
body {
  font-family: "游明朝 Light", serif;
  font-size: 20px;
}
nav {
    font-family: "Taipei Sans SC Beta", sans-serif;
    position: sticky;
    overflow-y: scroll;
    top: 0;
    float: left;
    width: 25%;
    padding: 0px;
    height: 100vh;
    background-color: #f1f1f1;
}

nav ul {
    list-style-type: none;
    margin: 0;
    border: 0;
    padding: 0;
    padding-left: 16px;
}
nav ul li a {
    display: block;
    color: #000;
    width: 100%;
    padding: 8px 16px;
    text-decoration: none;
}
nav ul li a:hover {
    background-color: #555;
    color: white;
}
h2 {
    font-family: "游明朝 Light", serif;
    font-weight: bold;
    font-size: 32px;
}
h3 {
    font-family: "游明朝 Light", serif;
    font-weight: bold;
    font-size: 28px;
}
h4 {
    font-family: "游明朝 Light", serif;
    font-weight: bold;
    font-size: 24px;
}
h5 {
    font-family: "游明朝 Light", serif;
    font-weight: bold;
    font-size: 22px;
}
.topic {
    font-family: "Taipei Sans SC Beta", sans-serif;
    font-weight: bold;
    font-size: 36px;
    color: white;
}
header {
    font-family: "Taipei Sans SC Beta", sans-serif;
    font-weight: bold;
    background-color: green;
    padding: 20px;
}
footer {
    text-align: center;
    background-color: green;
    padding: 20px;
    color: white;
}
#topbutton {
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    border: 1px solid green;
    outline: none;
    background-color: #04AA6D;
    color: white;
    cursor: pointer;
    padding: 15px 20px;
    border-radius: 36px;
    font-size: 36px;
    text-align: center;
}
#topbutton:hover {
    border: 1px solid #04AA6D;
    background-color: #04D98B;
}
blockquote {
    font-family: cursive;
}
table {
    width: 100%;
    text-align: left;
    font-family: sans-serif;
    border-collapse: collapse;
    border-top: 3px solid mediumaquamarine;
    border-bottom: 3px solid mediumaquamarine;
}
table a {
    color: inherit;
}
table tr {
    padding: 3px;
}
table td {
    padding: 3px;
    padding-left: 6px;
    padding-right: 6px;
    text-align: left;
    vertical-align: top;
}
table th {
    padding: 3px;
    padding-left: 6px;
    padding-right: 6px;
    text-align: left;
    background-color: mediumaquamarine;
    color: white;
    border-bottom: 3px solid mediumaquamarine;
}
table.bidtable {
    border-top: 3px solid #04AA6D;
    border-bottom: 3px solid #04AA6D;
}
table td.open24 {
    background-color: lightcyan;
    text-align: center;
    font-weight: bold;
}
table.bidtable th {
    background-color: #04AA6D;
    color: white;
    border-bottom: 3px solid #04AA6D;
}
table.competitive {
    table-layout: fixed;
    border-top: 0;
    border-bottom: 3px solid #8CCDE0;
    color: black;
}
table.competitive th {
    border-bottom: 0;
}
table.competitive td {
    background-color: white;
}
table.competitive td:first-child {
    background-color: #DFFFFF;
}
table.competitive th:nth-child(odd) {
    background-color: #8CCDE0;
    color: black;
}
table.defensive th:nth-child(even) {
    background-color: #A1E9FF;
    color: black;
}
table.defensive {
    table-layout: fixed;
    border-top: 0;
    border-bottom: 3px solid #8FA6F0;
    color: black;
}
table.defensive th {
    border-bottom: 0;
}
table.defensive td {
    background-color: white;
}
table.defensive th:nth-child(odd) {
    background-color: #BFA6F0;
    color: black;
}
table.defensive td:first-child {
    background-color: #FFF8FA;
}
table.defensive th:nth-child(even) {
    background-color: #EFCCDE;
    color: black;
}
article {
  float: left;
  padding: 20px;
  width: 75%;
}
#horizontal-nav {
    font-family: "Taipei Sans SC Beta", sans-serif;
    list-style-type: none;
    margin: 0;
    border-top: 2px solid lightgray;
    border-bottom: 2px solid lightgray;
    padding: 0;
    overflow: hidden;
    background-color: white;
}
#horizontal-nav li {
    margin: 0;
    padding: 0;
    border: 0;
    color: black;
    float: left;
    border-right: 1px solid lightgray;
}
#horizontal-nav li:last-child {
    border-right: 0;
}
#horizontal-nav li a {
    display: block;
    padding: 8px;
    text-align: center;
    padding: 14px 16px;
    color: inherit;
    text-decoration: none;
}
#horizontal-nav li a:hover {
    background-color: lightgray;
}
#horizontal-nav li a.active {
    font-weight: bold;
}
section {
    clear: left;
}
section::after {
    content: "";
    clear: both;
    display: table;
}
@media print {
    nav {
        display: none;
    }
    nav * {
        display: none;
    }
    footer {
        display: none;
    }
    footer * {
        display: none;
    }
    #topbutton {
        display: none;
    }
    article {
        width: 100%;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    table {
        page-break-inside: avoid;
    }
}
@media (max-width: 600px) {
    nav, article {
        width: 100%;
        height: auto;
    }
    nav {
        position: static;
        overflow-y: auto;
        float: left;
    }
    body {
        font-size: 16px;
    }
}
</style>
