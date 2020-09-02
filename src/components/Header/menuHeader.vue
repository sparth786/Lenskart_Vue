<template>
  <div>
    <div class="page-container">
      <md-menu md-size="big" md-align-trigger v-for="maincat in maincategory" :key="maincat">
        <md-button
          class="md-raised md-primary"
          md-menu-trigger
          @click="findsub(maincat)"
        >{{maincat}}</md-button>
        <md-menu-content :v-show="opensubmenu">
          <md-menu-item
            v-for="subnm in subcategory"
            :key="subnm"
            @click="getProduct(subnm)"
          >{{subnm}}</md-menu-item>
        </md-menu-content>
      </md-menu>

      <md-badge :md-content="totalcartproduct" style="float:right;margin-right:10px">
        <md-button class="md-fab md-mini md-primary" @click="addcartmodal = true">
          <md-icon>shopping_cart</md-icon>
          <md-tooltip md-direction="bottom">Add to Cart</md-tooltip>
        </md-button>
      </md-badge>
      <md-badge :md-content="totalshortlistproduct" style="float:right;margin-right:10px">
        <md-button class="md-fab md-mini md-primary" @click="addshortlistmodal = true">
          <md-icon>favorite_border</md-icon>
          <md-tooltip md-direction="bottom">Add to Short List</md-tooltip>
        </md-button>
      </md-badge>
    </div>

  <AddCart :addtocartmodal="addcartmodal" v-if="addcartmodal" @clicked="onClickChildCart"/>
  <ShortListItem :addtoshortlistmodal="addshortlistmodal" v-if="addshortlistmodal" @clicked="onClickChildShortList"/>
  
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
import AddCart from '../Cart/AddCart.vue'
import ShortListItem from '../ShortlistItem/ShortListItem.vue'
export default {
  name: "menuHeader",
  components:{
    AddCart,
    ShortListItem
  },
  data() {
    return {
      SubCategory: [],
      opensubmenu: false,
      addcartmodal: false,
      addshortlistmodal: false,
      qty: 1
    };
  },
  methods: {
    findsub: function(maincatnm) {
      this.getsubcatnm(maincatnm);
    },
    getProduct: function(subnm) {
      this.$router.push({ name: "product", params: { subcat: subnm } });
    },
    ...mapActions("maincategory", ["getmaincatnm"]),
    ...mapActions("subcategory", ["getsubcatnm"]),
    onClickChildCart(value){
      this.addcartmodal=value
    },
    onClickChildShortList(value){
      this.addshortlistmodal=value
    }
  },
  computed: {
    ...mapState({
      maincategory: state => state.maincategory.maincatnm,
      subcategory: state => state.subcategory.subcatnm,
      ...mapGetters("products", ["totalcartproduct", "totalshortlistproduct"])
    }),
  },
  created() {
    this.getmaincatnm();
  }
};
</script>
<style lang="">
.page-container {
  background-color: white;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.12);
}
.md-menu {
  margin: 5px;
}
.md-menu-content {
  max-height: fit-content;
}
.md-fab {
  margin-top: 3px;
}
.md-content {
  max-width: 800px;
  padding: 0px;
}
</style>