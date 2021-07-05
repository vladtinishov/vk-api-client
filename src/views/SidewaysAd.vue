<template>
    <div>
        <h3>Объявление сбоку</h3>
        <div class="form">
            <div class="inner_form">
                <div class="section">
                    <label for="adsName">Введите название рекламы</label><br>
                    <input id="adsName" type="text" v-model="adsData.name">
                </div>
                <div class="section">
                    <label for="cost">Выберите способ оплаты</label>
                    <select-option id="cost" @gotvalue="getValue" :selectData="selectCost"/>
                </div>
                <div class="section">
                    <div v-if="adsData.cost_type == 0">
                        <label for="costPrice">Цена за переход (от 6)</label><br>
                        <input id="costPrice" type="text" v-model="adsData.cpc">
                    </div>
                    <div v-else-if="adsData.cost_type == 1">
                        <label for="costPrice">Цена за 1000 показов</label><br>
                        <input id="costPrice" type="text" v-model="adsData.cpm">
                    </div>
                    <div v-else-if="adsData.cost_type == 3">
                        <label for="costPrice">Цена за действие</label><br>
                        <input id="costPrice" type="text" v-model="adsData.ocpm">
                    </div>
                </div>
                <div class="section">
                    <label for="cost">Выберите категорию</label>
                    <select-option id="cost" @gotvalue="getValue" :selectData="selectCategory"/>
                </div>
                <div class="section">
                    <label for="description">Введите описание</label><br>
                    <input id="description" type="text" v-model="adsData.description">
                </div>
                <div class="section">
                    <label for="title">Введите заголовок</label><br>
                    <input id="title" type="text" v-model="adsData.title">
                </div>
                <div class="section">
                    <label for="linkUrl">Введите электронный адрес сайта</label><br>
                    <input id="linkUrl" type="text" v-model="adsData.link_url">
                </div>
                <div class="section">
                    <label for="file">Выберите изображение размером 145х85</label><br>
                    <input class="file-input" type="file" id="file" @change="uploadFile">
                </div>
            </div>
        </div>
        <button @click="create" class="btn btn-outline-primary">Create</button>
    </div>
</template>
<script>
import axios from 'axios'
import SelectOption from '@/components/SelectOption'
import {auth_data} from "@/auth.js"
export default ({
    components: {
        SelectOption,
    },
    data() {
        return {
            adsData: {
                campaign_id: 0,
                ad_format: 1,
                cost_type: 0,
                category1_id: 0,
                link_url: "",
                name: "",
                photo: "",
                description: "",
                title: "",
            },
            imageUrl: "",
            image: "",
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
                }
            },
            value: '',
        }
    },
    created() {
        axios.get('api/ads.getUploadURL?ad_format=1&access_token=' + auth_data.access_token + '&v=5.131')
            .then((data) => {
                this.imageUrl = data.data.response.replace("https://pu.vk.com", "");
            });
    },
    methods: {
        uploadFile() {
            let formData = new FormData();
            let gfile = document.getElementById("file").files[0];
            formData.append("file", gfile);
            axios.post("upload-image" + this.imageUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })
            .then((data) => {this.adsData.photo = data.data.photo})
        },
        createCampaign() {
            axios.get('api/ads.createCampaigns?account_id=' + auth_data.cab_id+ '&data=[{"client_id":"344701865","type":"normal","name":"camp from ui","status":0}]&access_token=' + auth_data.access_token + '&v=5.131')
                .then((data) => {
                    this.adsData.campaign_id = data.data.response[0].id;
                    console.log(this.adsData.campaign_id);
                })
                .then(this.createAds);
        },
        createAds() {

            let url = 'api/ads.createAds?account_id=' + auth_data.cab_id+ '&data=[' + JSON.stringify(this.adsData) + ']&access_token=' + auth_data.access_token + '&v=5.131';
            axios.get(url).then((data) => {console.log(data.data)})
        },
        create() {
            this.createCampaign();
        },
        getValue(data) {
            this.adsData[data.name] = parseInt(data.data);
            delete this.adsData.cpc;
            delete this.adsData.cpm;
            delete this.adsData.ocpm;
        }
    }
})
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
.btn-outline-primary{
    margin-top: 20px;
}
</style>