/*  
   Mock Database  
   Just hardcoded data for demo purposes  
*/
var packages = {
    "TRK100": {
        item: "Wireless Headphones",
        status: "In-Transit",
        eta: "Today, 5:00 PM",
        info: "Arrived at local facility"
    },
    "TRK200": {
        item: "Gaming Mouse",
        status: "Delivered",
        eta: "Jan 05, 2026",
        info: "Left at front porch"
    }
};

// Simple auth flag 
var loggedIn = false;

/*  
   Navigation helper  
   Hides all sections and shows the requested one  
*/
function navigateTo(pageId) {
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("login-page").classList.add("hidden");
    document.getElementById("result-page").classList.add("hidden");

    document.getElementById(pageId).classList.remove("hidden");

    // Always reset error state when switching pages
    document.getElementById("error-text").style.display = "none";
}

/*  
   View Order Logic  
   Manually updates result page + timeline  
*/
window.viewOrder = function(id) {
    var pkg = packages[id];
    if (!pkg) return;

    document.getElementById("res-id").innerText = id;
    document.getElementById("res-item").innerText = pkg.item;
    document.getElementById("res-status-badge").innerText = pkg.status;
    document.getElementById("res-eta").innerText = pkg.eta;
    document.getElementById("updates-list").innerText = pkg.info;

    var step2 = document.getElementById("step-shipped");
    var step3 = document.getElementById("step-delivered");
    var badge = document.getElementById("res-status-badge");

    step2.className = "step";
    step3.className = "step";

    var shippedCircle = step2.querySelector(".circle");
    if (shippedCircle) shippedCircle.innerText = "2";

    if (pkg.status === "In-Transit") {
        step2.className = "step active";
        badge.style.background = "#ff793f";
    } else if (pkg.status === "Delivered") {
        step2.className = "step active";
        step3.className = "step active";
        if (shippedCircle) shippedCircle.innerText = "✓";
        badge.style.background = "#00b894";
    }

    navigateTo("result-page");
};

/* Login button */

document.getElementById("do-login-btn").onclick = function() {
    var user = document.getElementById("user-field").value;
    var pass = document.getElementById("pass-field").value;

    if (user === "admin" && pass === "1234") {
        loggedIn = true;
        document.getElementById("login-nav-btn").innerText = "Log Out";

        document.getElementById("table-body").innerHTML = `
            <tr class="order-row" onclick="viewOrder('TRK100')">
                <td>
                    <div class="order-main">
                        <span class="order-id">TRK100</span>
                        <span class="order-item">Wireless Headphones</span>
                    </div>
                </td>
                <td>
                    <div class="status-cell">
                        <div class="progress-track">
                            <div class="progress-fill orange-fill"></div>
                        </div>
                        <span class="status-text text-orange">In-Transit</span>
                    </div>
                </td>
            </tr>
            <tr class="order-row" onclick="viewOrder('TRK200')">
                <td>
                    <div class="order-main">
                        <span class="order-id">TRK200</span>
                        <span class="order-item">Gaming Mouse</span>
                    </div>
                </td>
                <td>
                    <div class="status-cell">
                        <div class="progress-track">
                            <div class="progress-fill green-fill"></div>
                        </div>
                        <span class="status-text text-green">Delivered</span>
                    </div>
                </td>
            </tr>
        `;

        navigateTo("home-page");
    } else {
        alert("Try: admin / 1234");
    }
};

document.getElementById("track-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("go-btn").click();
    }
});

/* Navbar login / logout */
document.getElementById("login-nav-btn").onclick = function() {
    if (!loggedIn) {
        navigateTo("login-page");
    } else {
        loggedIn = false;
        this.innerText = "Sign In";
        document.getElementById("table-body").innerHTML =
            '<tr><td colspan="2" class="empty-state">Please sign in to view your order history.</td></tr>';
        navigateTo("home-page");
    }
};

/* Search */
document.getElementById("go-btn").onclick = function() {
    var code = document.getElementById("track-input").value.toUpperCase();
    if (packages[code]) {
        viewOrder(code);
    } else {
        document.getElementById("error-text").style.display = "block";
    }
};

/* Misc buttons */
document.getElementById("home-btn").onclick = function() {
    navigateTo("home-page");
};
document.getElementById("back-home-btn").onclick = function() {
    navigateTo("home-page");
};
document.getElementById("cancel-btn").onclick = function() {
    navigateTo("home-page");
};
document.getElementById("signup-btn").onclick = function() {
    alert("Registration coming soon!");
};
