export const getall =(data) =>{
    return{
        type:"Get_All",
        payload:data
    }
}
export const getone =(data)=>{
    return{
        type:"Get_One",
        payload:data
    }
}
export const removeone =()=>{
    return{
        type:"Remove_One"
    }
}
export const addtocart =(data)=>{
    return{
        type:"Add_To_Cart",
        payload:data
    }
}
export const removefromcart =(data)=>{
    return{
        type:"Remove_From_Cart",
        payload:data
    }
}

export const emptycart =()=>{
    return{
        type:"Empty_Cart"
    }
}


export const loggedin =(data)=>{
    return{
        type:"LoggedIn",
        payload:data
    }
}

export const addtowishlist =(data)=>{
    return{
        type:"Add_To_WList",
        payload:data
    }
}
export const removefromwishlist =(data)=>{
    return{
        type:"Remove_From_Wlist",
        payload:data
    }
}