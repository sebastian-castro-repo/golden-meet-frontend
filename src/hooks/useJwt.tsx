const useJwt = () => {

    const decodeJwt = (token: any) => {
        const base64Url = token?.toString().split('.')[1];
        const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload;
        if(base64)
            jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

        if(jsonPayload)
            return JSON.parse(jsonPayload);
        else
            return undefined;
    };

    return {
        decodeJwt,
    };
};
export default useJwt;
