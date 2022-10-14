import { defineStore } from "pinia";

const nowDate = new Date()
const newDate = new Date()
newDate.setDate(nowDate.getDate() +1)

 const useMainStore = defineStore("main", {

    state : () => ({
    token: "",
  
    nowDate,
    newDate,
   
    isLoading: true

    })


})

export default useMainStore