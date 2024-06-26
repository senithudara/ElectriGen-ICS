import { SupplierContext } from "../context/SupplierContext";
import { useContext } from "react";

export const useSupplierContext = () =>{
const context = useContext (SupplierContext)


if(!context){
    throw Error('useSupplierContext must be used inside an SupplierContextProvider')
}

return context

}