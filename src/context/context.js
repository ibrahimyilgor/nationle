import React, { useContext, useState } from 'react'
import { useEffect } from 'react'

import langTr from '../Languages/tr';
import langEn from '../Languages/en';
import langJa from '../Languages/ja';

const AppContext = React.createContext({})

export default AppContext

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [lang, setLang] = useState("en")

    function l(str) {
      if(lang === "en"){
        return langEn[str] || str
      }
      else if(lang === "tr"){
        return langTr[str] || str
      }
      else if(lang === "ja"){
        return langJa[str] || str
      }
      return str
  }

    useEffect(() => {
        //Language
        let localLang = localStorage.getItem("lang");
        localLang = JSON.parse(localLang);
        if(localLang){
          setLang(localLang);
        }
      }, []); 

      // useEffect(() => {
      //   console.log("LANG",lang)
      // }, [lang]); 

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                lang,
                setLang,
                l
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)
