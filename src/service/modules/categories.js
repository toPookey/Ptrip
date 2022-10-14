import PRequetst from "../request/index"

export function getCategories () {

    return PRequetst.get({
        url: "/home/categories"
    })


}