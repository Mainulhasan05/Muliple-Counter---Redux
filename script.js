//selecting dom elements
incrementBtn=document.getElementById("increment")
decrementBtn=document.getElementById("decrement")
counter=document.getElementById("counter")
addcounter=document.getElementById("addcounter")
container=document.getElementById("container")
resetBtn=document.getElementById("reset")

// action identifiers
const INCREMENT='increment'
const DECREMENT='decrement'

// initial state
let initialState=[{
    id:1,
    value:0,
    payload:Math.floor(Math.random()*10)
},]

// action creators
const increment=(id)=>{
    return {
        type:INCREMENT,
        id:id,
    }
}

const decrement=(id)=>{
    return {
        type:DECREMENT,
        id:id,
    }
}

// create reducer function
const reducerFuntion=(state=initialState,action)=>{
    const state1=[...state]
    const id=action.id
    const obj=state1.find((state)=>state.id==id)
    const exceptActuallObjArr=state1.filter((state)=> state.id!=id)

    console.log(state)
    if(action.type===INCREMENT){
        const modifyObj={
            ...obj,value:obj.value+obj.payload
        }
        const modifiedArray=[...exceptActuallObjArr,modifyObj]

        return modifiedArray
    }
    else if(action.type===DECREMENT){
        const modifyObj={
            ...obj,value:obj.value-obj.payload
        }
        const modifiedArray=[...exceptActuallObjArr,modifyObj]

        return modifiedArray
    }
    else{
        return state
    }
    
}

// crate store
const store= Redux.createStore(reducerFuntion)

// UI update function
const render=()=>{
    // getting the updated state from reducer
    const state=store.getState()
    // selecting the counter id divs
    const counterUIs=document.querySelectorAll("#counter");

    for(let i=0; i<counterUIs.length; i++){
        
            counterUIs[state[i].id-1].innerText=state[i].value
        
        
    }
}

//subscribing render function to the redux store
store.subscribe(render)
// reset
resetBtn.addEventListener("click",()=>{
    const state=store.getState()
    const counterUIs=document.querySelectorAll("#counter");

    for(let i=0; i<counterUIs.length; i++){
        state[i].value=0
            counterUIs[state[i].id-1].innerText=state[i].value
        
        
    }
})

incrementBtn.addEventListener("click",()=>{
    store.dispatch(increment(1))
})

decrementBtn.addEventListener("click",()=>{
    store.dispatch(decrement(1))
})

addcounter.addEventListener("click",()=>{
    const div=document.createElement('div')
    const newObj={
        id:initialState.length+1,
        value:0,
        payload:Math.floor(Math.random() * 10)
    }
    initialState.push(newObj)
    console.log("after creating newobj ",initialState)
    store.dispatch({type:""})
    div.innerHTML=`
    <div
                    class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
                >
                <div>counter id: ${initialState.length}</div>
                <br/>
                <p>Random value is: ${newObj.payload}</p>
                    <div id="counter" class="text-2xl font-semibold">0</div>
                    <div class="flex space-x-3">
                        <button id="increment"
                            class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
                            onclick="store.dispatch(increment(${initialState.length}))"
                        >
                            Increment
                        </button>
                        <button
                        id="decrement"
                            class="bg-red-400 text-white px-3 py-2 rounded shadow"
                            onclick="store.dispatch(decrement(${initialState.length}))"
                            
                        >
                            Decrement
                        </button>
                    </div>
                </div>
    `

    container.append(div)
})

const sayHi=(a)=>{
    const val=initialState.find((currentValue, index, arr)=>{
        return arr[index].id==a
    })
   // console.log(val==initialState[a-1])
}
