<template>
  <header>
    <h1 class="topic">{{ topic }}</h1>
  </header>
  <button id="topbutton" v-on:click="goToTop" v-show="topbuttonshow"><img style="width: 28px;" src="/arrow_upward.svg" alt="up arrow"></button>
  <div>
        <ul id="horizontal-nav">
            <li class="dropdown">
                <a href="javascript:void(0)" class="dropbtn">Relay制度</a>
                <div class="dropdown-content">
                    <router-link to="/relay">未受競叫叫牌</router-link>
                    <router-link to="/interference">競叫</router-link>
                    <router-link to="/defense">防禦叫牌</router-link>
                    <router-link to="/signal">防禦信號</router-link>
                </div>
            </li>
            <li><router-link to="/natural">自然制</router-link></li>
            <li><router-link to="/cmbc">CMBC 自然制</router-link></li>
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
    僅供非商業橋牌教學使用。2024年製作。
  </footer>
</template>

<script>
export default {
  data() {
    return {
      topbuttonshow: false,
      topic: "Röle Sistemi"
    };
  },
  created () {
    window.addEventListener('scroll', this.scrollCheck)
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
</style>
