export const isChecked=()=>{
    return{
        type:"ISCHECKED"
    }
}
export const select=(event)=>{
    return{
        type:"SELECT",
        payload:event.target.value
    }
}
export const input=(event)=>{
    return{
        type:"INPUT",
        payload:event.target.value
    }
}