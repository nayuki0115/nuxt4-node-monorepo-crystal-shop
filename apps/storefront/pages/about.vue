<template>
  <div class="min-h-screen">
    <!-- Header -->
    <AppHeader />

    <div class="max-w-4xl mx-auto px-4 py-20">
      <div class="text-center mb-16">
        <h1 class="text-5xl font-light text-purple-800 mb-6">
          {{ t('about.title') }}
        </h1>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
      </div>

      <div class="glassmorphism p-12 rounded-3xl">
        <div class="prose prose-lg prose-purple mx-auto">
          <p class="text-purple-700 leading-relaxed mb-6">
            {{ t('about.story') }}
          </p>
          <p class="text-purple-700 leading-relaxed mb-6">
            我們相信每一個水晶都承載著獨特的能量與故事。從精心挑選的原石，到手工雕琢的成品，每一個步驟都充滿了對品質的堅持與對美的追求。
          </p>
          <p class="text-purple-700 leading-relaxed">
            讓我們一起探索這個閃耀的水晶世界，發現屬於你的那一份純淨與優雅。
          </p>
        </div>
      </div>

      <!-- Values -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div class="glassmorphism p-8 rounded-2xl text-center">
          <div class="text-4xl mb-4">✨</div>
          <h3 class="text-xl font-medium text-purple-800 mb-2">純淨品質</h3>
          <p class="text-purple-600">嚴選優質水晶原石</p>
        </div>
        <div class="glassmorphism p-8 rounded-2xl text-center">
          <div class="text-4xl mb-4">🎨</div>
          <h3 class="text-xl font-medium text-purple-800 mb-2">手工匠藝</h3>
          <p class="text-purple-600">精湛工藝雕琢每件作品</p>
        </div>
        <div class="glassmorphism p-8 rounded-2xl text-center">
          <div class="text-4xl mb-4">💫</div>
          <h3 class="text-xl font-medium text-purple-800 mb-2">能量傳遞</h3>
          <p class="text-purple-600">帶給你正面的能量</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
