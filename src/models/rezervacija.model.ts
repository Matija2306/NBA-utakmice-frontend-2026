import type { GledalacModel } from "./gledalac.model";
import type { TerminModel } from "./termin.model";

export interface RezervacijaModel{

    id:number,
    gledalac: GledalacModel,
    termin: TerminModel,
    brojKarata: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string

}