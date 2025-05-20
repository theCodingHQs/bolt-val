
export const formatDateymd = (date:Date) => {
    if(date == null){
      return null
    }
    const day = String(date.getDate()).padStart(2, '0')  // Ensures two digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0')  // getMonth() is zero-based, so add 1
    const year = date.getFullYear()
  
    return `${year}-${month}-${day}`
  }