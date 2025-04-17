const useStringUtils = () => {

  const firstCapitalLetter = (phrase: string) => {
    if(phrase)
      return phrase[0]?.toUpperCase() + phrase?.substring(1)?.toLowerCase();
    else
      return "";
  };
  const firstCapitalLetterBetweenSpaces = (phrase: string, ignoreString?: string) => {
    let phraseToReturn = "";
    phrase?.split(" ")?.map((p, index) => {
      if(ignoreString && ignoreString === p){
        phraseToReturn += p;
        if(index !== phrase?.split(" ")?.length - 1 && phrase?.split(" ")?.length > 1)
          phraseToReturn += " ";
      } else {
        phraseToReturn += firstCapitalLetter(p);
        if(index !== phrase?.split(" ")?.length - 1 && phrase?.split(" ")?.length > 1)
          phraseToReturn += " ";
      }
    })
    return phraseToReturn;
  };

  const getHourString = (hourVar: any, duration?: number, date?: Date) => {
    if(date){
      hourVar = date + " " + hourVar;
    }
    if (!duration) {
      return ("0" + new Date(hourVar).getHours()).slice(-2) + ":" + ("0" + new Date(hourVar).getMinutes()).slice(-2)
    } else {
      return ("0" + (new Date((new Date(hourVar).getTime()) + (duration * 60 * 1000)).getHours())).slice(-2) + ":" +
          ("0" + (new Date((new Date(hourVar).getTime()) + (duration * 60 * 1000)).getMinutes())).slice(-2)
    }
  }

  const getSeparatesHoursAndMinutes = (hourToSeparate: string) => {
    let hourAndMinutes;
    if(hourToSeparate){
      hourAndMinutes = {
        hour: hourToSeparate.toString().substring(0, hourToSeparate.toString().indexOf(":")),
        minutes: hourToSeparate.toString().substring(hourToSeparate.toString().indexOf(":") + 1)
      }
    }
    return hourAndMinutes;
  }

  const removeHtmlTags = (str) => {
    if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();

    return str.replace( /(<([^>]+)>)/ig, '');
  }

  const replaceHtmlTildes = (str) => {
    if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();

    return str.replaceAll('&ntilde;','ñ')
        .replaceAll('&Ntilde;','Ñ')
        .replaceAll('&amp;','&')
        .replaceAll('&Ntilde;','Ñ')
        .replaceAll('&ntilde;','ñ')
        .replaceAll('&Ntilde;','Ñ')
        .replaceAll('&Agrave;','À')
        .replaceAll('&Aacute;','Á')
        .replaceAll('&Acirc;','Â')
        .replaceAll('&Atilde;','Ã')
        .replaceAll('&Auml;','Ä')
        .replaceAll('&Aring;','Å')
        .replaceAll('&AElig;','Æ')
        .replaceAll('&Ccedil;','Ç')
        .replaceAll('&Egrave;','È')
        .replaceAll('&Eacute;','É')
        .replaceAll('&Ecirc;','Ê')
        .replaceAll('&Euml;','Ë')
        .replaceAll('&Igrave;','Ì')
        .replaceAll('&Iacute;','Í')
        .replaceAll('&Icirc;','Î' )
        .replaceAll('&Iuml;','Ï')
        .replaceAll('&ETH;','Ð')
        .replaceAll('&Ntilde;','Ñ')
        .replaceAll('&Ograve;','Ò')
        .replaceAll('&Oacute;','Ó')
        .replaceAll('&Ocirc;','Ô' )
        .replaceAll('&Otilde;','Õ')
        .replaceAll('&Ouml;','Ö'  )
        .replaceAll('&Oslash;','Ø')
        .replaceAll('&Ugrave;' ,'Ù')
        .replaceAll('&Uacute;','Ú')
        .replaceAll('&Ucirc;','Û')
        .replaceAll('&Uuml;','Ü')
        .replaceAll('&Yacute;','Ý')
        .replaceAll('&THORN;','Þ' )
        .replaceAll('&szlig;','ß')
        .replaceAll('&agrave;','à')
        .replaceAll('&aacute;','á')
        .replaceAll('&acirc;','â')
        .replaceAll('&atilde;','ã')
        .replaceAll('&auml;','ä'  )
        .replaceAll('&aring;','å')
        .replaceAll('&aelig;','æ')
        .replaceAll('&ccedil;','ç')
        .replaceAll('&egrave;','è')
        .replaceAll('&eacute;','é')
        .replaceAll('&ecirc;','ê' )
        .replaceAll('&euml;','ë'  )
        .replaceAll('&igrave;','ì')
        .replaceAll('&iacute;','í')
        .replaceAll('&icirc;','î' )
        .replaceAll('&iuml;','ï'  )
        .replaceAll('&eth;','ð'   )
        .replaceAll('&ntilde;','ñ')
        .replaceAll('&ograve;','ò')
        .replaceAll('&oacute;','ó')
        .replaceAll('&ocirc;','ô')
        .replaceAll('&otilde;','õ')
        .replaceAll('&ouml;','ö')
        .replaceAll('&oslash;','ø')
        .replaceAll('&ugrave;','ù')
        .replaceAll('&uacute;','ú')
        .replaceAll('&ucirc;','û')
        .replaceAll('&uuml;' ,'ü')
        .replaceAll('&yacute;','ý')
        .replaceAll('&thorn;','þ')
        .replaceAll('&yuml;','ÿ')
        .replaceAll('&nbsp;',' ');
  }

  const formatCi = (str) => {
    let ret = str;
    if(str?.length === 8)
      ret = `${str.substring(0,1)}.${str.substring(1,4)}.${str.substring(4,7)}-${str.substring(7)}`;
    else if(str?.length === 7)
      ret = `${str.substring(0,3)}.${str.substring(3,6)}-${str.substring(6)}`;
    return ret;
  }

  const getNumberSuffix = (num) => {
    switch (num){
      case 1:
        return "er";
        break;
      case 2:
        return "do";
        break;
      case 3:
        return "er";
        break;
      case 4:
        return "to";
        break;
      case 5:
        return "to";
        break;
      case 6:
        return "to";
        break;
      case 7:
        return "mo";
        break;
      case 8:
        return "vo";
        break;
      case 9:
        return "no";
        break;
      case 10:
        return "mo";
        break;
      default:
        return "";
        break;
    }
  }
  const formatPrice = (price) => {
    // const total = Number.isInteger(price) ? price.toString() : price.toFixed(2)
    return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const formatPriceNoRound = (price) => {
    const total = Number.isInteger(price) ? price.toString() : price.toFixed(2)
    return total.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const removeAccents = (str) => {
    const accents = {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
      'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
      'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
      'À': 'A', 'È': 'E', 'Ì': 'I', 'Ò': 'O', 'Ù': 'U',
      'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u',
      'Ä': 'A', 'Ë': 'E', 'Ï': 'I', 'Ö': 'O', 'Ü': 'U',
      'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
      'Â': 'A', 'Ê': 'E', 'Î': 'I', 'Ô': 'O', 'Û': 'U',
      'ã': 'a', 'õ': 'o',
      'Ã': 'A', 'Õ': 'O',
      'ç': 'c', 'Ç': 'C'
    };

    return str.split('').map(char => accents[char] || char).join('');
  };

  const roundSantanderDiscount = (realDiscount: number) => {
    if(realDiscount < 12)
      return 10;
    else if(realDiscount >= 12 && realDiscount < 17)
      return 15;
    else if(realDiscount >= 17)
      return 25;
    return 0;
  }

  const calculateAge = (birthdate: string) => {
    const tempBirthdate = new Date(birthdate);

    const today = new Date();

    let age = today.getFullYear() - tempBirthdate.getFullYear();

    const actualMonth = today.getMonth();
    const actualDay = today.getDate();
    const birthdateMonth = tempBirthdate.getMonth();
    const birthdateDay = tempBirthdate.getDate();

    if (actualMonth < birthdateMonth || (actualMonth === birthdateMonth && actualDay < birthdateDay)) {
      age--;
    }

    return age;
  }

  const decodeISOtoUTF8 = (text) => {
    try {
      if (/[ÃÂÆØÇÐ¤¢£¥©®±²³´µ·¸¹º¼½¾¿ß]/.test(text)) {
        const encodedText = new Uint8Array([...text].map(char => char.charCodeAt(0)));
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(encodedText);
      }
      return text;
    } catch (e) {
      console.error("Error decoding text:", e);
      return text;
    }
  }

  const toCamelCase = (str: string): string => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  return {
    firstCapitalLetter,
    firstCapitalLetterBetweenSpaces,
    getHourString,
    getSeparatesHoursAndMinutes,
    removeHtmlTags,
    replaceHtmlTildes,
    formatCi,
    getNumberSuffix,
    formatPrice,
    formatPriceNoRound,
    removeAccents,
    roundSantanderDiscount,
    calculateAge,
    decodeISOtoUTF8,
    toCamelCase,
  };
}
export default useStringUtils;
