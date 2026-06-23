<template>
  <div class="min-h-screen">
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
            {{ t('about.storyEnergy') }}
          </p>
          <p class="text-purple-700 leading-relaxed">
            {{ t('about.storyClosing') }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div class="glassmorphism p-8 rounded-2xl text-center">
          <div class="text-4xl mb-4">{{ t('about.values.quality.icon') }}</div>
          <h3 class="text-xl font-medium text-purple-800 mb-2">{{ t('about.values.quality.title') }}</h3>
          <p class="text-purple-600">{{ t('about.values.quality.description') }}</p>
        </div>
        <div class="glassmorphism p-8 rounded-2xl text-center">
          <div class="text-4xl mb-4">{{ t('about.values.craft.icon') }}</div>
          <h3 class="text-xl font-medium text-purple-800 mb-2">{{ t('about.values.craft.title') }}</h3>
          <p class="text-purple-600">{{ t('about.values.craft.description') }}</p>
        </div>
        <div class="glassmorphism p-8 rounded-2xl text-center">
          <div class="text-4xl mb-4">{{ t('about.values.energy.icon') }}</div>
          <h3 class="text-xl font-medium text-purple-800 mb-2">{{ t('about.values.energy.title') }}</h3>
          <p class="text-purple-600">{{ t('about.values.energy.description') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
