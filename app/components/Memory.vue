<template lang="html">
    <Page @loaded="onPageLoad">
   <ActionBar>
            <Label :text="'Clicks:' +clickCoutner +','+ 'Pairs found:'+ foundCounterCopmuted"></Label>
    </ActionBar>
    <FlexboxLayout  flexWrap="wrap"  backgroundColor="#3c495e">
      <template v-for="(item,index) in generatedList">
         <!-- <Label @loaded="animateCard($event,index)"  v-show="!isShown(item)" class="card-hidden" width="30%" backgroundColor="#1c6b48" @tap="showCurrentItems(item,index)"  /> -->
         <Image width="30%" v-show="isShown(item)"  stretch="aspectFill"  class="card-image" :src="item.src" text="x"  />
         <Image @tap="showCurrentItems(item,index)" :src="'~/images/question-bordered.png'" v-show="!isShown(item)" class="card-hidden" width="30%" @loaded="animateCard($event,index)"  />
     
    
      </template>
    </FlexboxLayout> 

    <!-- <WrapLayout  orientation="horizontal" height="100%"  backgroundColor="#3c495e">
      <template v-for="(item,index) in generatedList">
         <Label @loaded="animateCard($event,index)"   v-show="!isShown(item)" class="card-hidden" width="30%" backgroundColor="#1c6b48" @tap="showCurrentItems(item,index)"  />
         <Image width="30%" v-show="isShown(item)"  stretch="aspectFill"  class="card-image" :src="item.src" text="x"  />
    
      </template>
    </WrapLayout >  -->

    </Page>
</template>

<script>
import * as app from "tns-core-modules/application";
import audioplayerMixin from "./mixins/audioplayerMixin";

export default {
  mixins: [audioplayerMixin],

  data: () => {
    return {
      message: "<!-- Memory page  -->",
      generatedList: [],
      flippedItems: [],
      audioFile: "~/sounds/pop.ogg",
      dataCreated: false,
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
          id: 3,
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
  mounted() {
    this.initPlayer();
  },
  computed: {
    foundCounterCopmuted() {
      if (this.foundCounter >= 2) {
        return this.foundCounter / 2;
      }
      return 0;
    },

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
      console.log("dcdcdc", this.dataCreated, this.flippedItems.length);
      if (this.dataCreated) {
        return;
      }
      this.generateCurrentGameList();
    },

    // GAME METHODS
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
      this.dataCreated = true;
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
      this.playSound();
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
      if (this.foundCounter === this.generatedList.length) {
        this.popupDialog();
      }
    },

    startClosecardInterval() {
      this.closeCardInterval = setTimeout(() => {
        this.flippedItems = [];
        // console.log("timeout");
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
    },

    // MODAL DIALOG
    popupDialog() {
      confirm({
        title: "Pobjedili ste !",
        message: "Želite li započeti novu igru",
        okButtonText: "Da",
        cancelButtonText: "NE"
      }).then(result => {
        // console.log(result);
        if (result) {
          this.resetGame();
        } else {
          this.resetGame();
          // this
        }

        // The result property is true if the dialog is closed with the OK button, false if closed with the Cancel button or undefined if closed with a neutral button.
        // console.log("Dialog result: " + result);
      });
    },

    // ANIMATIONS
    animateCard(args, index) {
      // Početna animacija
      setTimeout(() => {
        console.log("logme", index);
        args.object.animate({ translate: { x: 0, y: 0 }, opacity: 1 });
      }, index * 120);
    }
  }
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
.card-hidden {
  height: 50;
  margin-top: 1%;
  translatex: -300;
  opacity: 0;
  margin-left: 2%;
  border: 1px solid gray;
  // margin-left:1%;
  // margin-right:1%;
}
.card-image {
  height: 50;
  margin-top: 1%;
  translatex: -300;
  opacity: 1;
  margin-left: 2%;
  // margin-right:1%;
}
</style>