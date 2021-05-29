export default function getRecipientEmail(currentUser,users){
    let result = []
    users.map((user)=>{
        if(user !== currentUser.email){
            result.push(user)
        }
    })
    return result
}
