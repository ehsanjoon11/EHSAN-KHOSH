document.addEventListener("DOMContentLoaded", function () {
    function getUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    }

    function saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    // ذخیره نام کاربری وارد شده
    function saveCurrentUser(username) {
        localStorage.setItem("currentUser", username);
    }

    // دریافت کاربر لاگین‌شده
    function getCurrentUser() {
        return localStorage.getItem("currentUser");
    }

    // اگر فرم ثبت‌نام وجود داشته باشد
    const registerForm = document.getElementById("register");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("regUser").value.trim();
            const email = document.getElementById("regEmail").value.trim();
            const password = document.getElementById("regPass").value.trim();

            if (username && email && password) {
                let users = getUsers();

                const userExists = users.some(user => user.username === username || user.email === email);
                if (userExists) {
                    alert("این نام کاربری یا ایمیل قبلاً ثبت شده است!");
                    return;
                }

                users.push({ username, email, password });
                saveUsers(users);

                alert("ثبت‌نام موفقیت‌آمیز بود! لطفاً وارد شوید.");
                window.location.href = "login.html";
            } else {
                alert("لطفاً تمام فیلدها را پر کنید.");
            }
        });
    }

    // اگر فرم ورود وجود داشته باشد
    const loginForm = document.getElementById("login");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const enteredUser = document.getElementById("loginUser").value.trim();
            const enteredPass = document.getElementById("loginPass").value.trim();

            let users = getUsers();
            const user = users.find(user => user.username === enteredUser && user.password === enteredPass);

            if (user) {
                alert(`ورود موفقیت‌آمیز بود! خوش آمدید، ${user.username} 😊`);
                saveCurrentUser(user.username);
                window.location.href = "dashboard.html"; // رفتن به پروفایل کاربر
            } else {
                alert("نام کاربری یا رمز عبور اشتباه است.");
            }
        });
    }

    // اگر در صفحه داشبورد هستیم
    const userInfo = document.getElementById("userInfo");
    if (userInfo) {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            window.location.href = "login.html"; // اگر کسی لاگین نکرده بود، بره به صفحه ورود
        } else {
            const users = getUsers();
            const user = users.find(user => user.username === currentUser);

            if (user) {
                userInfo.innerHTML = `
                    <p><strong>نام کاربری:</strong> ${user.username}</p>
                    <p><strong>ایمیل:</strong> ${user.email}</p>
                `;
            }
        }
    }

    // خروج از حساب
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentUser"); // حذف کاربر جاری
            window.location.href = "login.html"; // برگشت به صفحه ورود
        });
    }
});
