<template>
    <div>
        <md-dialog :md-active.sync="addshortlistmodal" style="width:600px;text-align:center;">
      <md-dialog-title>
        <span>PRODUCTS({{totalshortlistproduct}})</span>
        <div style="float:right;">
          <md-button class="md-icon-button" @click="CloseModal()">
            <md-icon>close</md-icon>
          </md-button>
        </div>
      </md-dialog-title>
      <div>
        <md-divider></md-divider>
        <div v-if="totalshortlistproduct<=0" style="width:600px;text-align:center;padding:10px">
          <p style="font-size:14px;">
            You have not selected any product to compare.
            Please add products of your choice and view here
          </p>
        </div>
        <div v-else>
          <md-table>
            <md-table-row
              v-for="(productshortlist,index) in totshortlistproduct"
              :key="index"
              @click="CloseModal();display_product(productshortlist)"
            >
              <md-table-cell>
                <img
                  :src="'http://localhost:3000/Upload/'+productshortlist.image"
                  style="width:80px;height:80px"
                />
              </md-table-cell>
              <md-table-cell>
                <p>{{productshortlist.ProductName}}</p>
                <p>${{productshortlist.price}}</p>
              </md-table-cell>
              <md-table-cell>
                <md-button class="md-icon-button" @click="removeshortlistItem(productshortlist)">
                  <md-icon>delete</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
      <md-divider></md-divider>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="CloseModal()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "ShortListItem",
  data() {
    return {
      addshortlistmodal: this.addtoshortlistmodal,
      qty: 1
    };
  },
  props:{
      addtoshortlistmodal:{type:Boolean,required:true}
  },
  methods: {
    ...mapActions("products", [
      "updateproducttoshortlist",
      "removeproductfromshortlist"
    ]),
    CloseModal(){
        this.addshortlistmodal=!this.addshortlistmodal
        this.$emit('clicked',this.addshortlistmodal)
    },
    removeshortlistItem(removeproduct) {
      this.removeproductfromshortlist(removeproduct);
    },
    display_product(selectproduct) {
      this.$router.push({
        name: "Product_display",
        params: { selectproduct: selectproduct }
      });
    },
  },
  computed: {
    ...mapState({
      totshortlistproduct: state => state.products.shortlistproducts,
      ...mapGetters("products", ["totalshortlistproduct"])
    }),
  },
  created() {
    this.updateproducttoshortlist();
  }
};
</script>