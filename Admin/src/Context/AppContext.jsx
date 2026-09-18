import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "June", "july", "Aug", "Sep", "Oct", , "Nov", "Dec"]
    const currency="$";

    const getAge = (dob) => {
        const today = new Date()
        const birthday = new Date(dob)
        let age = today.getFullYear() - birthday.getFullYear();
        return age;
    }

    const slotDateFormat = (slotDate) => {
        let datearray = slotDate.split("_")
        return datearray[0] + " " + months[datearray[1]] + " " + datearray[2];
    }

    const value = {
        getAge,
        slotDateFormat,
        currency
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;