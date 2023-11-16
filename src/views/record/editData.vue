<template lang="">
    <div>
        {{id}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            id:null
        }
    },
    mounted() {
        this.id=this.$route.params.id
    },
}
</script>
<style lang="">
    
</style>