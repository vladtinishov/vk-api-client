<template>
  <div>
    <h3>Объявление сбоку</h3>
    <div class="form">
      <div class="inner_form">
        <div class="section">
          <label for="cost">Выберите способ оплаты</label>
          <select-option
            id="cost"
            @gotvalue="clearObject"
            :selectData="selectCost"
          />
        </div>
        <div class="section">
          <div v-if="adsData.cost_type == 0">
            <label for="costPrice">Цена за переход (от 6)</label><br />
            <input id="costPrice" type="text" v-model="adsData.cpc" />
          </div>
          <div v-else-if="adsData.cost_type == 1">
            <label for="costPrice">Цена за 1000 показов</label><br />
            <input id="costPrice" type="text" v-model="adsData.cpm" />
          </div>
          <div v-else-if="adsData.cost_type == 3">
            <label for="costPrice">Цена за действие</label><br />
            <input id="costPrice" type="text" v-model="adsData.ocpm" />
          </div>
        </div>
        <div class="section">
          <label for="cost">Выберите категорию</label>
          <select-option
            id="cost"
            @gotvalue="getValue"
            :selectData="selectCategory"
          />
        </div>
        <div class="section">
          <label for="attachments"
            >Введите аттрибуты элементов, которые хотите видеть</label
          >
          <input id="attachments" type="text" v-model="attachments" />
        </div>
        <div class="section">
          <label for="message"
            >Введите текст, который будет приложен к посту</label
          >
          <input id="message" type="text" v-model="message" />
        </div>
        <div class="section">
          <label for="city">Выберите название страны</label>
          <select-option
            id="cost"
            @gotvalue="getValue"
            :selectData="selectCountry"
          />
        </div>
        <div class="section">
          <label for="city"
            >Введите название города и выберите его из списка</label
          >
          <SearchCity
            id="city"
            @city_selected="getCity"
            :country_id="adsData.country"
          />
        </div>
        <div v-if="ad_id != ''">
          <a :href="'https://vk.com/ads?act=office&union_id=' + ad_id">реклама</a>
        </div>
      </div>
    </div>
    <button @click="create" class="btn btn-outline-primary">Create</button>
  </div>
</template>
<script>
import axios from "axios";
import SelectOption from "@/components/SelectOption";
import SearchCity from "@/components/SearchCity";
import { auth_data } from "@/auth.js";
export default {
  components: {
    SelectOption,
    SearchCity,
  },
  data() {
    return {
      adsData: {
        campaign_id: 9,
        ad_format: 9,
        cost_type: 0,
        category1_id: 0,
        name: "name of ad",
        link_url: "",
        cities: 0,
        country: 0,
      },
      message: "",
      post_id: 0,
      attachments: "",
      selectCost: {
        name: "cost_type",
        data: {
          0: "Оплата за переходы",
          1: "Оплата за показы",
          3: "Оптимизированная оплата за показы",
        },
      },
      selectCategory: {
        name: "category1_id",
        data: {
          201: "Техника и электроника",
          224: "Всё для офиса",
          231: "Дом, ремонт",
          242: "Дача и сад",
          250: "Развлечения и хобби",
          255: "Медицина",
          259: "Одежда и обувь",
          265: "Парфюмерия и косметика",
          270: "Продукты питания",
          271: "Авто, мото",
          285: "Подарки и сувениры",
          286: "Ювелирные изделия",
          294: "Домашние животные",
          295: "Детские товары и услуги",
          305: "Спорт и отдых",
          459: "Бизнес",
          334: "Красота, здоровье",
          353: "Туризм и путешествия",
          357: "Недвижимость",
        },
      },
      ad_id: "",
      selectCountry: {
        name: "country",
        data: {
          1: "Россия",
          4: "Казахстан",
          3: "Беларусь",
          6: "Армения",
        },
      },
    };
  },
  methods: {
    createCampaign() {
      axios
        .get(
          "api/ads.createCampaigns?account_id=" +
            auth_data.cab_id +
            '&data=[{"client_id":"' +
            auth_data.owner_id +
            '","type":"promoted_posts","name":"camp 9 from ui","status":0}]&access_token=' +
            auth_data.access_token +
            "&v=5.131"
        )
        .then((data) => {
          console.log("Created camp");
          this.adsData.campaign_id = data.data.response[0].id;
          console.log(this.adsData.campaign_id);
        })
        .then(() => {
          console.log("Created ad");
          this.createAds();
        });
    },
    createStealthPost() {
      axios
        .get(
          "api/wall.postAdsStealth?owner_id=-" +
            auth_data.public_id +
            "&message=" +
            this.message +
            "&attachments=" +
            this.attachments +
            "&access_token=" +
            auth_data.access_token +
            "&v=5.131"
        )
        .then((data) => {
          console.log(data.data);
          this.post_id = data.data.response.post_id;
          this.adsData.link_url =
            "https://vk.com/wall-" + auth_data.public_id + "_" + this.post_id;
        });
    },
    createAds() {
      let url =
        "api/ads.createAds?account_id=" +
        auth_data.cab_id +
        "&data=[" +
        JSON.stringify(this.adsData) +
        "]&access_token=" +
        auth_data.access_token +
        "&v=5.131";
      axios.get(url).then((data) => {
        this.ad_id = data.data.response[0].id;
      });
    },
    create() {
      this.createStealthPost();
      this.createCampaign();
    },
    getValue(data) {
      this.adsData[data.name] = parseInt(data.data);
    },
    clearObject(data) {
      delete this.adsData.cpc;
      delete this.adsData.cpm;
      delete this.adsData.ocpm;
      this.getValue(data);
    },
    getCity(city) {
      this.adsData.cities = city.id;
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  width: 100%;
  justify-content: center;
}
.inner_form {
  display: flex;
  flex-direction: column;
  width: 400px;
}
input {
  width: 100%;
}
.section {
  text-align: left;
  margin: 10px 0;
}
.file-input {
  border: none;
}
.btn-outline-primary {
  margin-top: 20px;
}
</style>