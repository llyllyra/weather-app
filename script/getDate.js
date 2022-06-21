const getDate = (date,labels) => {
    let newDate = new Date(date * 1000)
    let dates = newDate.toLocaleDateString()
    let day = newDate.getUTCDay()
    let dayString =""
    dayString = getJour(day)
    labels.push(dayString)
    let dateTotal = dayString + " " + dates
    return dateTotal
}

const getJour = (day) =>{
    let dayString =""
    switch (day){
        case 1:
            return  "Lundi"
            break
        case 2:
            return  "Mardi"
            break
        case 3:
            return  "Mercredi"
            break
        case 4:
            return "Jeudi"
            break
        case 5:
            return  "Vendredi"
            break
        case 6:
            return  "Samedi"
            break
        case 0:
            return "Dimanche"
    }
}

export default getDate;