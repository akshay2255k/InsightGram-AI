// ==========================================
// Instagram Tracker
// Main Variables
// ==========================================

const zipInput = document.getElementById("zipInput");
const browseBtn = document.getElementById("browseBtn");
const dropArea = document.getElementById("dropArea");

const dashboard = document.getElementById("dashboard");

const loadingOverlay = document.getElementById("loadingOverlay");

const progressFill = document.getElementById("loadingProgressFill");

const progressText = document.getElementById("loadingPercent");

// ==========================================
// Data Storage
// ==========================================

let followers = [];
let following = [];
let pendingRequests = [];
let recentRequests = [];
let recentUnfollowed = [];
let closeFriends = [];

// ==========================================
// Browse Button
// ==========================================

browseBtn.addEventListener("click", () => {

    zipInput.click();

});

// ==========================================
// File Selected
// ==========================================

zipInput.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    loadZip(file);

});

// ==========================================
// Drag & Drop
// ==========================================

dropArea.addEventListener("dragover", (e) => {

    e.preventDefault();

    dropArea.classList.add("dragging");

});

dropArea.addEventListener("dragleave", () => {

    dropArea.classList.remove("dragging");

});

dropArea.addEventListener("drop", (e) => {

    e.preventDefault();

    dropArea.classList.remove("dragging");

    const file = e.dataTransfer.files[0];

    if (!file) return;

    loadZip(file);

});

// ==========================================
// Load ZIP
// ==========================================

async function loadZip(file){

    loadingOverlay.classList.remove("hidden");

    progressFill.style.width = "5%";

    progressText.innerText = "5%";

    const zip = await JSZip.loadAsync(file);

    progressFill.style.width = "20%";

    progressText.innerText = "20%";

    await readFollowers(zip);

    progressFill.style.width = "40%";

    progressText.innerText = "40%";

    await readFollowing(zip);

    progressFill.style.width = "60%";

    progressText.innerText = "60%";

    await readPending(zip);

    progressFill.style.width = "75%";

    progressText.innerText = "75%";

    await readRecentRequests(zip);

    progressFill.style.width = "85%";

    progressText.innerText = "85%";

    await readRecentUnfollowed(zip);

    progressFill.style.width = "95%";

    progressText.innerText = "95%";

    await readCloseFriends(zip);

    progressFill.style.width = "100%";

    progressText.innerText = "100%";

    loadingOverlay.classList.add("hidden");

    dashboard.classList.remove("hidden");

    updateDashboard();

}
async function readFollowers(zip){

    const file =
        zip.file("connections/followers_and_following/followers_1.json");

    if(!file){

        console.log("Followers file not found");

        return;

    }

    const json = JSON.parse(await file.async("string"));

    followers = json.map(item => {

        return item.string_list_data[0].value;

    });

}
async function readFollowing(zip){

    const file =
        zip.file("connections/followers_and_following/following.json");

    if(!file){

        console.log("Following file not found");

        return;

    }

    const json = JSON.parse(await file.async("string"));

    following = json.relationships_following.map(item => {

        return item.title;

    });

}
async function readPending(zip){

    const file =
    zip.file("connections/followers_and_following/pending_follow_requests.json");

    if(!file){

        return;

    }

    const json = JSON.parse(await file.async("string"));

    pendingRequests = [];

    json.forEach(item=>{

        item.string_list_data.forEach(user=>{

            pendingRequests.push(user.value);

        });

    });

}
function updateDashboard(){

    document.getElementById("followersCount").innerText =
        followers.length;

    document.getElementById("followingCount").innerText =
        following.length;

    document.getElementById("pendingRequestCount").innerText =
        pendingRequests.length;

}
// =========================================
// Not Following Back
// =========================================

let notFollowingBack = [];

function calculateNotFollowingBack() {

    notFollowingBack = following.filter(user => {

        return !followers.includes(user);

    });

}
// =========================================
// You Don't Follow Back
// =========================================

let youDontFollowBack = [];

function calculateYouDontFollowBack() {

    youDontFollowBack = followers.filter(user => {

        return !following.includes(user);

    });

}
// =========================================
// Recent Requests
// =========================================

async function readRecentRequests(zip){

    const file = zip.file(
        "connections/followers_and_following/recent_follow_requests.json"
    );

    if(!file){

        recentRequests = [];

        return;

    }

    const json = JSON.parse(await file.async("string"));

    recentRequests = [];

    json.forEach(item=>{

        item.string_list_data.forEach(data=>{

            recentRequests.push(data.value);

        });

    });

}
// =========================================
// Recently Unfollowed
// =========================================

async function readRecentUnfollowed(zip){

    const file = zip.file(
        "connections/followers_and_following/recently_unfollowed_profiles.json"
    );

    if(!file){

        recentUnfollowed = [];

        return;

    }

    const json = JSON.parse(await file.async("string"));

    recentUnfollowed = [];

    json.forEach(item=>{

        item.string_list_data.forEach(data=>{

            recentUnfollowed.push(data.value);

        });

    });

}
// =========================================
// Close Friends
// =========================================

async function readCloseFriends(zip){

    const file = zip.file(
        "connections/followers_and_following/close_friends.json"
    );

    if(!file){

        closeFriends = [];

        return;

    }

    const json = JSON.parse(await file.async("string"));

    closeFriends = [];

    json.forEach(item=>{

        item.string_list_data.forEach(data=>{

            closeFriends.push(data.value);

        });

    });

}
function updateDashboard(){

    calculateNotFollowingBack();

    calculateYouDontFollowBack();

    document.getElementById("followersCount").textContent =
        followers.length;

    document.getElementById("followingCount").textContent =
        following.length;

    document.getElementById("pendingRequestCount").textContent =
        pendingRequests.length;

    document.getElementById("recentRequestCount").textContent =
        recentRequests.length;

    document.getElementById("recentUnfollowedCount").textContent =
        recentUnfollowed.length;

    document.getElementById("closeFriendsCount").textContent =
        closeFriends.length;

    document.getElementById("notFollowingBackCount").textContent =
        notFollowingBack.length;

    document.getElementById("youDontFollowBackCount").textContent =
        youDontFollowBack.length;

}
const userContainer = document.getElementById("userContainer");
const searchInput = document.getElementById("searchInput");

let currentTab = "followers";

let completedUsers =
    JSON.parse(localStorage.getItem("completedUsers")) || [];

let favouriteUsers =
    JSON.parse(localStorage.getItem("favouriteUsers")) || [];

function getCurrentUsers(){

    switch(currentTab){

        case "followers":
            return followers;

        case "following":
            return following;

        case "not-following-back":
            return notFollowingBack;

        case "you-dont-follow":
            return youDontFollowBack;

        case "pending":
            return pendingRequests;

        case "recent":
            return recentRequests;

        case "unfollowed":
            return recentUnfollowed;

        case "closefriends":
            return closeFriends;

        default:
            return [];

    }

}
function renderUsers(list){

    userContainer.innerHTML = "";

    if(list.length===0){

        userContainer.innerHTML=`

            <div class="empty">

                No Users Found

            </div>

        `;

        return;

    }

    list.forEach(username=>{

        const card=document.createElement("div");

        card.className="user-card";

        card.innerHTML=`

            <div class="left-side">

                <div class="avatar">

                    ${username.charAt(0).toUpperCase()}

                </div>

                <div class="user-info">

                    <h3>${username}</h3>

                    <p>

                        https://instagram.com/${username}

                    </p>

                </div>

            </div>

            <div class="right-side">

                <button
                    class="openBtn"
                    data-user="${username}">

                    Open

                </button>

                <button
                    class="copyBtn"
                    data-user="${username}">

                    Copy

                </button>

                <button
                    class="favBtn ${favouriteUsers.includes(username) ? "active" : ""}"
                    data-user="${username}">

                    ⭐

                </button>

                <button
                    class="doneBtn ${completedUsers.includes(username) ? "done" : ""}"
                    data-user="${username}">

                    ✔

                </button>

            </div>

        `;

        userContainer.appendChild(card);

    });

}
document.addEventListener("click",function(e){

    if(e.target.classList.contains("openBtn")){

        const user=e.target.dataset.user;

        window.open(

            `https://instagram.com/${user}`,

            "_blank"

        );

    }

});
document.addEventListener("click",function(e){

    if(e.target.classList.contains("copyBtn")){

        navigator.clipboard.writeText(

            e.target.dataset.user

        );

        alert("Username Copied");

    }

});
document.addEventListener("click",function(e){

    if(e.target.classList.contains("favBtn")){

        const user=e.target.dataset.user;

        if(favouriteUsers.includes(user)){

            favouriteUsers=favouriteUsers.filter(

                u=>u!==user

            );

        }else{

            favouriteUsers.push(user);

        }

        localStorage.setItem(

            "favouriteUsers",

            JSON.stringify(favouriteUsers)

        );

        renderUsers(getCurrentUsers());

    }

});
document.addEventListener("click",function(e){

    if(e.target.classList.contains("doneBtn")){

        const user=e.target.dataset.user;

        if(completedUsers.includes(user)){

            completedUsers=completedUsers.filter(

                u=>u!==user

            );

        }else{

            completedUsers.push(user);

        }

        localStorage.setItem(

            "completedUsers",

            JSON.stringify(completedUsers)

        );

        renderUsers(getCurrentUsers());

    }

});
searchInput.addEventListener("input",()=>{

    const text=searchInput.value.toLowerCase();

    const filtered=getCurrentUsers().filter(user=>{

        return user.toLowerCase().includes(text);

    });

    renderUsers(filtered);

});
document.querySelectorAll(".tab").forEach(tab=>{

    tab.addEventListener("click",()=>{

        document.querySelectorAll(".tab").forEach(t=>{

            t.classList.remove("active");

        });

        tab.classList.add("active");

        currentTab=tab.dataset.tab;

        renderUsers(getCurrentUsers());

    });

});
updateDashboard();

renderUsers(getCurrentUsers());