<script setup>

const title = useState('title', () => "Relay教學網");
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
  </Head>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
