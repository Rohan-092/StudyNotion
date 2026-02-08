import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    // agar user:null aise likhenge toh jab bhi reload karenge to user undefined aayega hme yha local storage ka use karna h pehle local storage m set karenge jb data/yser aayega fir user m  local storage se data leke aayenge or user m dal denge yeh glti hmne pta lgi jb pehli baar dashboard banana start kiya useme my profile banaya sabse pehle jisme user ki jarurat thi fir reload kra toh dekha undefined user aa gya tab hma pta lga local storage ka pehle local storage m set larao fir get karo  
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
}

const profileSlice = createSlice ({
    name:"profile",
    initialState: initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    },
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;