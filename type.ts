// types.ts
export type Profile = {
    id?: string; // Assurez-vous que ce type est cohérent avec la définition partout dans votre code
    pseudo?: string;
    image?: string;
    editPseudo?: string;
    editImage?: string;
    age?: number;
    code_pin?: string;
    editAge?: number;
    parent_id?: string;
    historique_video?: [];
    editPin?: string;
};
