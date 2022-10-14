import PRequetst from "../request/index"

export function getHotSuggests () {

    return PRequetst.get({
        url: "/home/hotSuggests"
    })


}

export function getHomeList (currentpage) {

    return PRequetst.get({
        url: "/home/houselist",
        params: {
            page: currentpage
        }
    })


}


