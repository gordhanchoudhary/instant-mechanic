document.addEventListener("DOMContentLoaded", function () {

    const mobile = localStorage.getItem("agent_mobile");
    const password = localStorage.getItem("agent_password");

    if (!mobile || !password) {
        redirectToLogin();
        return;
    }

    const formData = new FormData();
    formData.append("mobile", mobile);
    formData.append("captcha", password);

    fetch("https://ai.instantmechanic.online/bot/api/verify-agent/", {
        method: "POST",
        headers: {
            "Accept": "application/json"
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            clearStorage();
            redirectToLogin();
        }
    })
    .catch(() => {
        clearStorage();
        redirectToLogin();
    });

});

function redirectToLogin() {
    const currentPage = window.location.pathname;
    window.location.href = "/login.html?next=" + encodeURIComponent(currentPage);
}

function clearStorage() {
    localStorage.removeItem("agent_mobile");
    localStorage.removeItem("agent_password");
}
