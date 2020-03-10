<template lang="html">
    <Page>
        <!-- <ActionBar>
            <Label text="Browse"></Label>
        </ActionBar> -->

        <GridLayout class="page__content">
            <Label class="page__content-icon far" text.decode="&#xf1ea;"></Label>
            <Label class="page__content-placeholder" :text="message"></Label>
        </GridLayout>
    </Page>
</template>

<script>
export default {
    data: () => {
        return {
            message: "<!-- aassBrowse page content goes heress -->",
               cardList:[
                {
                    type:'banana',
                    id:1,
                    name:'Banana',
                    src:'~/images/banana.png'
                },
                {
                    type:'orange',
                    id:2,
                    name:'Orange',
                    src:'~/images/orange.jpg'
                },
                {
                    type:'ananas',
                    id:23,
                    name:'Ananas',
                    src:'~/images/ananas.png'
                },
                {
                    type:'kiwi',
                    id:4,
                    name:'Kiwi',
                    src:'~/images/kiwi.jpg'
                },
                {
                    type:'lemon',
                    id:5,
                    name:'Lemon',
                    src:'~/images/lemon.png'
                },
                {
                    type:'mango',
                    id:6,
                    name:'Mango',
                    src:'~/images/mango.png'
                },
                {
                    type:'grape',
                    id:7,
                    name:'Grape',
                    src:'~/images/grape.jpg'
                },
                {
                    type:'apple',
                    id:8,
                    name:'Apple',
                    src:'~/images/apple.png'
                },
                {
                    type:'tangerine',
                    id:9,
                    name:'Tangerine',
                    src:'~/images/tangerine.jpg'
                },
            ]
        };
    }
}
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>