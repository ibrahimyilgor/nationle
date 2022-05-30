import langTr from './tr';
import langEn from './en';
import langJa from './ja';

function l(lang,str) {
    if(lang === "en"){
        return langEn[str]
    }
    else if(lang === "tr"){
        return langTr[str]
    }
    else if(lang === "ja"){
        return langJa[str]
    }
    return ""
}

export default l;