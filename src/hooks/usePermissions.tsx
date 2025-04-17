import {page, PAGES} from "../constants/pages";
import {UserSession} from "@/types/authTypes.tsx";

const usePermissions = () => {

    const authorized = (loggedUser: Partial<UserSession>, pageCode: string | undefined) => {
        let pageToCompare: Partial<page>;
        PAGES.map((p) => {
            if(p?.code === pageCode)
                pageToCompare = p;
            else if(p?.sections?.length > 0){
                p?.sections?.map((sp) => {
                    if(sp?.code === pageCode)
                        pageToCompare = sp;
                })
            }
        })
        if(!pageToCompare)
            return true;
        if(pageToCompare?.sessionRequired){
            if(checkToken(loggedUser))
                return loggedUser.permissions?.some((p) => p === pageToCompare.permission)
        }else if(!pageToCompare?.sessionRequired)
            return true;

        return false;
    };

    //TODO Implementar lógica para validar token
    const checkToken = (loggedUser) => {
        return loggedUser !== undefined && loggedUser?.id !== "guest";
    }

    const authMails = [
        "sebmar2510@gmail.com",
    ]

    const blockedPages = []

    const onlyEmailsAuth = (loggedUser, pageCode): boolean => {
        if(blockedPages.some((bp) => bp === pageCode)){
            return authMails.some((am) => am === loggedUser.mail);
        } else
            return true;
    }

    return {
        authorized,
        checkToken,
        onlyEmailsAuth
    };
};
export default usePermissions;
