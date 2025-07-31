export const detectCheating  = (now,challenge) =>{
    try{
     const limitHours = 22;
     const isLate = now.getHours() > limitHours;
     const penalty = isLate ? 10 : 0
     return {isLate ,penalty}
    }catch(err){

    }
}
