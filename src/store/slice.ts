import {PayloadAction, createSlice} from "@reduxjs/toolkit";





interface EnfantState{
    id: string,
    age: number,
    historique_video:[],
    pseudo:string,
    image: string,
    code_pin: string,
    parent_id: string,
}

// id: string;
//     pseudo: string;
//     image: string;
//     age: number;
//     code_pin: string;
//     historique_video: string[];
//     parent_id: string;

interface ParentState{
    idParent: string,
    nomParent:string,
    ageParent: number,
    historique_videoParent:[],
    motDePasseParent:string,
    contactParent:string,
    paysParent:string,
    emailParent:string,
    codeParentalEnfant: string,
}

interface VideoState{
    id: string,
    titre:string,
    description:string,
    url:string,
    duree:string,
    couverture:string,
}



interface AppState{
    enfantState:EnfantState,
    parentState:ParentState,
    videoState:VideoState
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
        idParent: "",
        nomParent:"",
        ageParent: 0,
        historique_videoParent:[],
        motDePasseParent:"",
        contactParent:"",
        paysParent:"",
        emailParent:"",
        codeParentalEnfant: "",
    },

    videoState :{
        id: "",
        titre:"",
        description:"",
        couverture:"",
        url:"",
        duree:"",
    },

};

export const AppStateSlice = createSlice({
    name:'AppState',
    initialState,
    reducers:{
        updateEnfantState:(state:AppState, action: PayloadAction<EnfantState>)=>{
            state.enfantState=action.payload;
            return state;
        },
        // updateEnfantState(state, action: PayloadAction<EnfantState>) {
        //     return { ...state, ...action.payload };
        //   },
        updateParentState:(state:AppState, action: PayloadAction<ParentState>)=>{
            state.parentState=action.payload;
            return state;
        },
        updateVideoState:(state:AppState, action: PayloadAction<VideoState>)=>{
            state.videoState=action.payload;
            return state;
        },
    },

});

export const{ updateEnfantState, updateParentState, updateVideoState}= AppStateSlice.actions;
export default AppStateSlice.reducer;



  