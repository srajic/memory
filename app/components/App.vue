<template lang="html">
    <Page actionBarHidden="true">
       
    <BottomNavigation>
        <TabStrip>
            <TabStripItem class="navigation__item">
                <Label text="Homex"></Label>
                <Image src.decode="font://&#xf015;" class="fas t-36"></Image>
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="Browse"></Label>
                <Image src.decode="font://&#xf1ea;" class="far t-36"></Image>
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="Search"></Label>
                <Image src.decode="font://&#xf002;" class="fas t-36"></Image>
            </TabStripItem>
        </TabStrip>

        <TabContentItem>
            <Frame>
                <Items />
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame >
                <Browse />
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame >
                <Search />
            </Frame>
        </TabContentItem>

    </BottomNavigation>
    </Page>
</template>

<script>
import Items from "./Items.vue";
import Browse from "./Browse.vue";
import Search from "./Search.vue";
import audioplayerMixin from "./mixins/audioplayerMixin";

export default {
  mixins: [audioplayerMixin],
  components: {
    Items,
    Browse,
    Search
  },
  data() {
    return {
      audioFile: "~/sounds/classicalPop.mp3"
    };
  },
  mounted() {
    this.playSound();
  }
};
</script>

<style lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
