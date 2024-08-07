import {PayloadAction, createSlice} from "@reduxjs/toolkit";


interface EnfantState{
    id?: string,
    age?: number,
    historique_video?:[],
    pseudo?:string,
    image?: string,
    code_pin?: string,
    parent_id?: string,
}

// id: string;
//     pseudo: string;
//     image: string;
//     age: number;
//     code_pin: string;
//     historique_video: string[];
//     parent_id: string;

interface ParentState{
    id: string,
    nom:string,
    age: number,
    historique_video:[],
    motDePasse:string,
    contact:string,
    pays:string,
    email:string,
    codeParental: string,
}

interface VideoState{
    
    id: string,
    titre:string,
    description:string,
    url:string,
    duree:string,
    couverture:string,
    type_source:number,
}


interface AppState{
    enfantState:EnfantState,
    parentState:ParentState,
    videoState:VideoState,
    searchState:string,
    
    
}

const initialState: AppState ={

    enfantState:{
        id: "",
        age: 0,
        historique_video:[],
        pseudo:"",
        image: "",
        code_pin: "",
        parent_id: "",
    },

    parentState :{
        id: "",
        nom:"",
        age: 0,
        historique_video:[],
        motDePasse:"",
        contact:"",
        pays:"",
        email:"",
        codeParental: "",
    },

    videoState :{
        id: "",
        titre:"",
        description:"",
        couverture:"",
        url:"",
        duree:"",
        type_source:0,
    },
    searchState:'',
    

};

export const AppStateSlice = createSlice({
    name:'AppState',
    initialState,
    reducers:{
        updateEnfantState:(state:AppState, action: PayloadAction<EnfantState>)=>{
            state.enfantState=action.payload;
            return state;
        },

        
        updateParentState:(state:AppState, action: PayloadAction<ParentState>)=>{
            state.parentState=action.payload;
            return state;
        },
        updateVideoState:(state:AppState, action: PayloadAction<VideoState>)=>{
            state.videoState=action.payload;
            return state;
        },

        updateSearchState:(state:AppState, action: PayloadAction<string>)=>{
            state.searchState=action.payload;
            return state;
        },
    },

});

export const{ updateEnfantState, updateParentState, updateVideoState, updateSearchState}= AppStateSlice.actions;
export default AppStateSlice.reducer;



  