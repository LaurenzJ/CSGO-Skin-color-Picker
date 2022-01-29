<template>
  <div
    class="
      grid
      justify-items-center
      bg-gradient-to-tl
      from-indigo-100
      via-teal-100
      to-teal-400
    "
  >
    <div>
      <input
        class="
          border-2
          my-6
          border-gray-300
          bg-white
          h-10
          px-5
          pr-16
          rounded-lg
          text-sm
          focus:outline-none
        "
        type="text"
        v-model="searchTerm"
        placeholder="Search"
      />
      <div class="relative inline-block text-gray-700">
        <select
          v-model="selected"
          class="
            h-10
            ml-2
            pl-3
            pr-6
            text-base
            placeholder-gray-600
            border-2
            rounded-lg
            appearance-none
            focus:shadow-outline
          "
          placeholder="AK-47"
        >
          <option disabled value="">Weapon type</option>
          <option value="">All</option>
          <option>AWP</option>
          <option>AK-47</option>
          <option>AUG</option>
          <option>CZ75-Auto</option>
          <option>Desert Eagle</option>
          <option>Dual Berettas</option>
          <option>FAMAS</option>
          <option>Five-SeveN</option>
          <option>G3SG1</option>
          <option>Galil AR</option>
          <option>Glock-18</option>
          <option>M249</option>
          <option>M4A1-S</option>
          <option>M4A4</option>
          <option>MAC-10</option>
          <option>MAG-7</option>
          <option>MP5-SD</option>
          <option>MP7</option>
          <option>MP9</option>
          <option>Negev</option>
          <option>Nova</option>
          <option>P2000</option>
          <option>P250</option>
          <option>P90</option>
          <option>PP-Bizon</option>
          <option>R8 Revolver</option>
          <option>SCAR-20</option>
          <option>SG 553</option>
          <option>SSG 08</option>
          <option>Sawed-Off</option>
          <option>Tec-9</option>
          <option>UMP-45</option>
          <option>USP-S</option>
          <option>XM1014</option>
          <option>Knife</option>
          <option>Gloves</option>
        </select>
        <div
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            px-2
            pointer-events-none
          "
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>

      <div v-if="selectedSkin">
        <Skin :skin="selectedSkin" />
      </div>

      <div v-for="(skin, index) in filterByTerm" :key="index">
        <div
          style="cursor: pointer"
          v-on:click="selectSkin(skin)"
          class="flex flex-col items-center justify-center"
        >
          {{ skin.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkinService from "./SkinService.js";
import Skin from "./components/Skin.vue";

export default {
  name: "App",
  components: {
    Skin,
  },
  data() {
    return {
      skins: [],
      searchTerm: "",
      selectedSkin: null,
      dropdownOpen: false,
      selected: "",
    };
  },
  computed: {
    filterByTerm() {
      // if searchTerm is empty, return only last 10 skins with knife in name
      // if (this.searchTerm === "") {
      //   return this.skins.filter((skin) => {
      //     return skin.name.includes("★");
      //   });
      // }
      return this.skins.filter((item) => {
        return item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) && item.name.includes(this.selected);
      });
    },
  },
  methods: {
    selectSkin: function (skin) {
      console.log("selectSkin");
      window.scrollTo(0, 0, {
        behavior: "smooth",
      });

      this.selectedSkin = skin;
    },
  },

  async created() {
    this.skins = await SkinService.getSkins();
  },
};
</script>

<style src="./assets/tailwind.css"/>