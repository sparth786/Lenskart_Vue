<template>
  <div style="height:550px">
    <div>
      <mdb-carousel :interval="5000" slide :items="items" controlls indicators></mdb-carousel>
    </div>
    <div
      style="margin-top:50px;text-align:center;margin:20px;height:360px"
      v-for="subcat in subcategory"
      :key="subcat"
    >
      <div class="catSlider_desc_heading">
        <strong>{{subcat}}</strong>
      </div>
      <div>
        <vueper-slides
          class="no-shadow"
          :visible-slides="3"
          slide-multiple
          :gap="3"
          :slide-ratio="1 / 4"
          :dragging-distance="200"
          :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
          style="width:1500px;margin-left:22px"
        >
          <vueper-slide
            v-for="(product,i) in checkSubcatwiseproduct(subcat)"
            :key="i"
            autoplay
            :image="'http://localhost:3000/Upload/'+product.image"
            style="width:450px;height:230px;margin-left:12px"
          />
        </vueper-slides>
      </div>
    </div>
    <div style="height:500px;text-align:center;margin-top:20px">
      <youtube
        :video-id="getId('https://www.youtube.com/watch?v=kPMLVO45XaU')"
        style="margin-right:50px;"
      />
      <youtube :video-id="getId('https://www.youtube.com/watch?v=zEsA64JhRbY')" />
    </div>
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import {
  mdbCarousel,
  mdbBtn,
  mdbCard,
  mdbCardImage,
  mdbCardText,
  mdbCardBody
} from "mdbvue";
import { mapState, mapActions, mapGetters } from "vuex";
import { getIdFromURL } from "vue-youtube-embed";

export default {
  name: "CarouselPage",
  components: {
    mdbCarousel,
    mdbBtn,
    mdbCard,
    mdbCardImage,
    mdbCardText,
    mdbCardBody,
    VueperSlides,
    VueperSlide
  },
  methods: {
    ...mapActions("subcategory", ["getAllsubcatnm"]),
    ...mapActions("products", ["getProducts", "getSubcatwiseProduct"]),
    checkSubcatwiseproduct:function(subcat){
      return this.productsubcatwise.filter(value=>value.sub[0].SubCategoryname==subcat)
    },
    getId(url) {
      return getIdFromURL(url);
    }
  },
  computed: {
    ...mapState({
      subcategory: state => state.subcategory.Allsubcat,
      product: state => state.products.products,
      productsubcatwise: state => state.products.subcatwiseproduct
    })
  },
  created() {
    this.getAllsubcatnm();
    this.getSubcatwiseProduct();
  },
  data() {
    return {
      ssdata: "",
      items: [
        {
          img: true,
          src: require("@/assets/banner1.jpg")
        },
        {
          img: true,
          src: require("@/assets/banner2.jpg")
        },
        {
          img: true,
          src: require("@/assets/banner3.jpg")
        },
        {
          img: true,
          src: require("@/assets/banner4.jpg")
        },
        {
          img: true,
          src: require("@/assets/banner5.jpg")
        }
      ],
      productlist: []
    };
  }
};
</script>
<style lang="">
body {
  min-height: auto;
}
.view img {
  height: 550px;
}
.carousel .carousel-control-prev-icon {
  width: 80px;
  height: 80px;
}
.carousel .carousel-control-next-icon {
  width: 80px;
  height: 80px;
}
.carousel-control-prev {
  position: relative;
  margin-top: -310px;
}
.carousel-control-next {
  position: relative;
  float: right;
  margin-top: -80px;
}
.carousel.carousel-fade {
  height: 550px;
}
div[data-v-41159e2c] {
  width: 450px;
  padding: 30px;
  height: 300px;
}

.img-fluid {
  height: 200px;
}
img.img-fluid {
  height: 240px;
}
.catSlider_desc_heading {
  font-size: 26px;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-family: futurastd-book, futurastd-medium;
  display: block;
  color: #329c92;
}
.carousel-inner {
  height: 550px;
}
.md-card.md-theme-default {
  margin: 20px;
}
.vueperslides__inner {
  height: 240px;
  padding-top: 20px;
}
iframe {
  width: 100%;
  max-width: 650px;
}
iframe:not(.md-image) {
  height: 300px;
}
</style>