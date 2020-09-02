import homePage from './homePage.vue'
import login from './Login/login.vue'
import signup from './SignUp/signup.vue'
import product from './Product/Product.vue'
import Product_display from './Product/Product_display.vue'
import Checkout from './Order/checkout.vue'
import Thankyou from './Order/thanksorder.vue'

export default[
    {path:'/',component:homePage},
    {path:'/login',component:login},
    {path:'/signup',component:signup},
    {path:'/product/:subcat',component:product,name:'product',props:true},
    {path:'/product_detail',component:Product_display,name:'Product_display',props:true},
    {path:'/checkout',component:Checkout,name:'Checkout',props:true},
    {path:'/thankyou',component:Thankyou,name:'Thankyou',props:true},
]