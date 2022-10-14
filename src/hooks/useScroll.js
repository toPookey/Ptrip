import {onMounted, onUnmounted, ref} from "vue"
import { throttle } from "underscore";
export default function useSroll (elRef) {
 let el = window 
const isReachBottom = ref(false)
const clientHeight = ref(0)
const scrollTop = ref(0)
const scrollHeight = ref(0)

  const  scrollListenerHander = throttle(() => {

   if(el === window ) {
        //顶部滚出的高度
  scrollTop.value = document.documentElement.scrollTop
  //窗口的高度
clientHeight.value = document.documentElement.clientHeight
  //可滚动的高度
 scrollHeight.value = document.documentElement.scrollHeight
   } else {
        //顶部滚出的高度
  scrollTop.value = el.scrollTop

  //窗口的高度
clientHeight.value = el.clientHeight
  //可滚动的高度
 scrollHeight.value = el.scrollHeight
   }

    if(clientHeight.value + scrollTop.value >= scrollHeight.value) {
      
      isReachBottom.value = true
    
        
    }
    
  }, 100)
  
    onMounted(() => {
    if(elRef) {
     
     el = elRef.value
 

    }

    //这里监听的是全局的页面
   el.addEventListener("scroll", scrollListenerHander)
    })
    
    onUnmounted(() => {
    
    el.removeEventListener("scroll", scrollListenerHander)
    })

    return {isReachBottom, scrollHeight,scrollTop,clientHeight}
  
  }

  