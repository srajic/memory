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
                    type:'Banana',
                    id:1,
                    name:'Banana',
                    src:'~/images/banana.png'
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