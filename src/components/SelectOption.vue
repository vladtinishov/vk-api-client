<template>
    <select v-model="gotValue" @change="getValue()">
    <option
            :key="value"
            v-for="(title, value) in selectData.data"
            :value="value"
            >
            {{ title }}
        </option>
    </select>
</template>
<script>
export default({
    data() {
        return {
            gotValue: 0,
        }
    },
    props: ["selectData"],
    methods: {
        getValue() {
            this.$emit('gotvalue', {
                name: this.selectData.name,
                data: this.gotValue,
            })
        }
    }
})
</script>
<style scoped>
select {
    width: 100%;
    height: 30px;
    font-size: 15px;
}
</style>