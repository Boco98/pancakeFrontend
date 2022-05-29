export const changeLanguage = (language) => {
    localStorage.setItem("language", language);
    window.location.reload();
};

let exportMe = {
    changeLanguage
};

export default exportMe;
