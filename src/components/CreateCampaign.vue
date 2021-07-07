<template>
    <div>
        <h1>Создать Объявление</h1>
        <ul>
            <li><button @click="getCampaingId(1)"><router-link class="link" to="sideways">Объявление сбоку</router-link></button></li>
            <li><button @click="getCampaingId(2)"><router-link class="link" to="wall">Объявление в ленте</router-link></button></li>
        </ul>
    </div>
</template>
<script>
export default ({
    methods: {
        getCampaingId(id) {
            this.$emit('campaign_selected', id);
        }
    }
})
</script>
<style scoped>
ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    width: 100%;
    justify-content: center;
}
li button {
    width: 100px;
    margin: 5px;
    background: rgb(48, 84, 151);
    color: white;
    border: 1px solid black;
}
.link {
    text-decoration: none;
    color: white;
}
</style>