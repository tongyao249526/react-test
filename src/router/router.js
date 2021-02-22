import  List  from "../views/list/list.js"
import  Detail  from "../views/detail/detail.js"
export default [
    {
        exact:true,
        path:'/',
        component: List,
    },
    {
        path:'/detail',
        component: Detail,
    },
]