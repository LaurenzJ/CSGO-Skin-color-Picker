<template>
  <div>
    <div class="text-2xl font-bold">{{ skin.name }}</div>
    <img :src="skin.icon_url_full" :alt="name" class="object-contain w-full h-60 mt-2" />
    
    <div>
      <div class="flex flex-col items-center justify-center">
        <div v-for="(color, index) in this.colors" :key="index">
          {{color.rgba}}
          <div>
            <div class="w-full h-1" v-bind:style="{ backgroundColor: color.rgba}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import SkinService from '../SkinService.js'

export default {
  name: 'Skin',
  data() {
    return {
      colors: [],
    }
  },
  props: {
    skin: {
      type: Object,
      required: true,
    },
  },

  async mounted() {
    this.colors = await SkinService.getSkinColors(this.skin.icon_url)
  },
  
}
</script>



