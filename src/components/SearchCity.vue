<template>
  <div>
    <input type="text" id="city" v-model="city_name" />
    <input
      @click.prevent="searchCity"
      id="search"
      value="поиск"
      type="button"
    />
    <ul v-if="show_options">
      <li :key="city.id" @click="setCity(city)" v-for="city in options">
        {{ city.title }}
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import { auth_data } from "@/auth.js";
export default {
  props: ["country_id"],
  data() {
    return {
      show_options: false,
      options: {},
      selected_city: {},
      city_name: "",
    };
  },
  methods: {
    searchCity() {
      let input_city = this.city_name;
      axios
        .get(
          "api/database.getCities?country_id=" +
            this.country_id +
            "&q=" +
            input_city +
            "&access_token=" +
            auth_data.access_token +
            "&v=5.131"
        )
        .then((data) => {
          console.log(data.data);
          if (data.data.response.items.length != 0) {
            this.options = data.data.response.items;
            this.show_options = true;
          }
        });
    },
    setCity(city) {
      this.selected_city = city;
      this.city_name = city.title;
      this.show_options = false;
      this.$emit("city_selected", this.selected_city);
    },
  },
};
</script>
<style scoped>
#city {
  width: 100%;
}
div {
  position: relative;
}
#search {
  position: absolute;
  right: 0;
  top: 0;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 100%;
  text-align: left;
  padding: 4px 0;
  cursor: pointer;
}
li:hover {
  background: lightpink;
}
</style>
