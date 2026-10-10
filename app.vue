<script setup lang="ts">

const title = useState<string>('title', () => "Relay教學網");
</script>

<template>
  <Head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-CF4PHZ3M6F"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-CF4PHZ3M6F');
    </script>
    <Title>{{ title }}</Title>
  </Head>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
