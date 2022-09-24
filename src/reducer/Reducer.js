let initialState={products:[
    {
		"_id": "laptop1",
		"name": "macbook air",
		"description": "latest macbbok by apple",
		"category": "laptop",
		"image_url": "/images/macbookAir.jpg",
		"price": 80000,
		"feedback": [{
			"comment": "Super laptop",
			"rating": "4.5",
			"user_name": "Ganesh",
			"added_date": "18-05-2017"
		}],
		"isDeal": "true",
		"deals": {
			"deal_date": "19-05-2017",
			"deal_name": "Super Deal",
			"deal_discount": "70"
		},
		"avg_rating": 0
	}
]}
export function Allreducer(state=initialState,action) {
    switch (action.type) {
        case "Get_All":
            return {...state,products:action.payload}
        default:
            return state
    }
}
export function Onereducer(state={},action){
    switch (action.type) {
        case "Get_One":
            return {...state,...action.payload};
		case "Remove_One":
			return { };
        default:
            return state;
    }
}
export function cartreducer(state={cart:[]},action){
    
	switch (action.type) {
        case "Add_To_Cart":
			return {...state,cart:[...state.cart,action.payload]};
        case "Remove_From_Cart":
			let tempCart=state.cart.filter((data)=> data.id!==action.payload.id);
			return {...state,cart:tempCart}; 
		case "Empty_Cart":
			return {cart:[]}   
        default:
            return state;
    }
}

export function wishlistreducer(state={wishlist:[]},action){
    
	switch (action.type) {
        case "Add_To_WList":
			return {...state,wishlist:[...state.wishlist,action.payload]};
        case "Remove_From_Wlist":
			let tempWList=state.wishlist.filter((data)=> data.id!==action.payload.id);
			return {...state,wishlist:tempWList};    
        default:
            return state;
    }
}

export function loginreducer(state={login:0},action){
    
	switch (action.type) {
        case "LoggedIn":
			return {...state,login:action.payload};
            
        default:
            return state;
    }
}
