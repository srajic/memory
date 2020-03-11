<template lang="html">
    <Page @loaded="onPageLoad">
   <ActionBar>
            <Label :text="'Clicks:' +clickCoutner +','+ 'Pairs found:'+ foundCounter"></Label>
    </ActionBar>
    <FlexboxLayout justifyContent="space-around" flexWrap="wrap"  backgroundColor="#3c495e">
      <template v-for="(item,index) in generatedList">
         <Label  height="20" :text="item.identifier " v-show="!isShown(item)" class="card-image" width="30%" backgroundColor="#1c6b48" @tap="showCurrentItems(item,index)"  />
         <Image width="30%" v-show="isShown(item)"  class="card-image" :src="item.src" text="x"  />
         <!-- <Label  height="20" :text="item.name" v-if="item.alreadyFound" class="card-image" width="30%" backgroundColor="red" @tap="showCurrentItems(item,index)"  /> -->
      </template>
    
        <!-- <Image width="30%"   class="card-image" :src="item.src" v-for="item in generatedList"  /> -->
       <!-- <Label  height="20" :text="item.name" class="card-image" width="30%" backgroundColor="#1c6b48" v-for="item in generatedList">
         <Label text="123"></Label>
       </Label> -->
    
</FlexboxLayout> 
    </Page>
</template>

<script>
export default {
  data: () => {
    return {
      message: "<!-- aassBrowse page  -->",
      generatedList: [],
      flippedItems: [],
      closeCardInterval: "",
      closeCardIntervalTimer: 3000,
      clickCoutner: 0,
      foundCounter: 0,
      cardList: [
        {
          type: "banana",
          id: 1,
          name: "Banana",
          src: "~/images/banana.png"
        },
        {
          type: "orange",
          id: 2,
          name: "Orange",
          src: "~/images/orange.jpg"
        },
        {
          type: "ananas",
          id: 23,
          name: "Ananas",
          src: "~/images/ananas.jpg"
        },
        {
          type: "kiwi",
          id: 4,
          name: "Kiwi",
          src: "~/images/kiwi.jpg"
        },
        {
          type: "lemon",
          id: 5,
          name: "Lemon",
          src: "~/images/lemon.png"
        },
        {
          type: "mango",
          id: 6,
          name: "Mango",
          src: "~/images/mango.png"
        },
        {
          type: "grape",
          id: 7,
          name: "Grape",
          src: "~/images/grape.jpg"
        },
        {
          type: "apple",
          id: 8,
          name: "Apple",
          src: "~/images/apple.jpg"
        },
        {
          type: "tangerine",
          id: 9,
          name: "Tangerine",
          src: "~/images/tangerine.jpg"
        }
      ]
    };
  },
  computed: {
    isShown() {
      return e => {
        if (e.alreadyFound) {
          return true;
        }
        for (let i = 0; i < this.flippedItems.length; i++) {
          if (this.flippedItems[i].identifier === e.identifier) {
            return true;
          }
        }
        return false;
      };
    }
  },
  methods: {
    onPageLoad(args) {
      this.generateCurrentGameList();
    },
    generateCurrentGameList() {
      let list = [];
      this.cardList.forEach(element => {
        let firstCard = JSON.parse(JSON.stringify(element));
        let secondCard = JSON.parse(JSON.stringify(element));

        firstCard.identifier = "f" + firstCard.id;
        secondCard.identifier = "s" + secondCard.id;
        list.push(firstCard);
        list.push(secondCard);
      });
      // console.log(list);
      this.generatedList = this.shuffle(list);
    },

    reorder(args) {
      const page = args.view.page;
      const listView = page.getViewById("listView");
      this.items = this.shuffle(this.items);
      listView.refresh();
    },

    showCurrentItems(item, index) {
      // console.log(index, item.id);
      if (item.hasOwnProperty("alreadyFound") && item.alreadyFound) {
        return;
      }
      this.cancleClosecardInterval();
      this.clickCoutner++;
      if (this.flippedItems.length === 2) {
        this.flippedItems = [];
      }
      this.flippedItems.push(item);

      if (this.flippedItems.length === 2) {
        this.startClosecardInterval();
        if (this.flippedItems[0].id === this.flippedItems[1].id) {
          this.generatedList.forEach(e => {
            if (e.identifier === this.flippedItems[0].identifier) {
              e.alreadyFound = true;
              this.foundCounter++;
            }
            if (e.identifier === this.flippedItems[1].identifier) {
              e.alreadyFound = true;
              this.foundCounter++;
            }
          });
        }
      }
      if(this.foundCounter===this.generatedList.length){
        this.resetGame();
      }
    },

    startClosecardInterval() {
      this.closeCardInterval = setTimeout(() => {
        this.flippedItems = [];
        console.log("timeout");
      }, this.closeCardIntervalTimer);
    },
    cancleClosecardInterval() {
      clearTimeout(this.closeCardInterval);
    },

    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      // console.log(a);
      return a;
    },

    resetGame() {
      this.generateCurrentGameList();
      this.flippedItems = [];
      this.clickCoutner = 0;
      this.foundCounter = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
.card-image {
  height: 50;
  margin-top: 1%;
  // margin-left:1%;
  // margin-right:1%;
}
</style>