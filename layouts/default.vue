<script setup>
const topbuttonshow = ref(false);
const topic = useState('topic', () => "Röle Sistemi")

const toc = useState('toc');
function goToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function scrollCheck() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    topbuttonshow.value = true
  } else {
    topbuttonshow.value = false;
  }
}

onMounted(() => {
  if (process.client) {
    window.addEventListener("scroll", scrollCheck);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("scroll", scrollCheck);
  }
});

</script>

<template>
  <header>
    <h1 class="topic"><NuxtLink to="/">{{ topic }}</NuxtLink></h1>
  </header>
  <button id="topbutton" v-on:click="goToTop" v-show="topbuttonshow"><img style="width: 28px;" src="public/arrow_upward.svg" alt="up arrow"></button>
  <div>
        <ul id="horizontal-nav">
            <li class="dropdown">
                <a href="javascript:void(0)" class="dropbtn">Relay制度</a>
                <div class="dropdown-content">
                    <NuxtLink to="/relay">未受競叫叫牌</NuxtLink>
                    <NuxtLink to="/relay/interference">競叫</NuxtLink>
                    <NuxtLink to="/relay/defense">防禦叫牌</NuxtLink>
                    <NuxtLink to="/signal">防禦信號</NuxtLink>
                </div>
            </li>
            <li class="dropdown">
                <a href="javascript:void(0)" class="dropbtn">自然制</a>
                <div class="dropdown-content">
                    <NuxtLink to="/cmbc">CMBC自然制</NuxtLink>
                    <NuxtLink to="/natural">特殊自然制</NuxtLink>
                </div>
            </li>
            <li><NuxtLink to="/story">練習區</NuxtLink></li>
        </ul>
    </div>
  <section>
    <nav>
      <div>
        <ul ref="tocList">
          <a v-for="x in toc" :class="x.class" :href="'#'+x.name">{{ x.text }}</a>
        </ul>
      </div>
    </nav>
    <slot />
  </section>
  <footer>
    僅供非商業橋牌教學使用。2024年製作。
  </footer>
</template>