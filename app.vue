<script setup lang="ts">

const title = useState<string>('title', () => "Relay教學網");
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
