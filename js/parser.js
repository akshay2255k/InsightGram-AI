const Parser={

    followers:[],

    following:[],

    pending:[],

    recent:[],

    closeFriends:[],

    async load(file){

        Loading.show();

        const zip=

        await JSZip.loadAsync(file);

        await this.readFollowers(zip);

        await this.readFollowing(zip);

        await this.readPending(zip);

        Dashboard.refresh();

        Loading.hide();

    }

};
const Parser = {

    data: {
        followers: [],
        following: [],
        pending: [],
        recentRequests: [],
        recentUnfollowed: [],
        closeFriends: []
    },

    zip: null,

    async load(file) {

        try {

            Loading.show("Reading Instagram ZIP...");

            this.zip = await JSZip.loadAsync(file);

            await this.readAll();

            Dashboard.refresh(this.data);

            Cards.render("followers");

            Loading.hide();

            Toast.success(
                "Upload Complete",
                "Instagram data loaded successfully."
            );

        } catch (error) {

            console.error(error);

            Loading.hide();

            Toast.error(
                "Upload Failed",
                "Unable to read the ZIP file."
            );

        }

    },

    async readAll() {

        await this.readFollowers();

        await this.readFollowing();

        await this.readPending();

        await this.readRecentRequests();

        await this.readRecentUnfollowed();

        await this.readCloseFriends();

    },

    findFile(keywords = []) {

        const files = Object.keys(this.zip.files);

        return files.find(path => {

            const lower = path.toLowerCase();

            return keywords.every(word => lower.includes(word));

        });

    },

    async readJson(path) {

        if (!path) return null;

        const text = await this.zip.file(path).async("string");

        return JSON.parse(text);

    }

};
Parser.readFollowers = async function () {

    const file = this.findFile([
        "followers"
    ]);

    if (!file) {

        console.warn("Followers file not found");

        return;

    }

    const json = await this.readJson(file);

    this.data.followers = [];

    json.forEach(item => {

        if (item.string_list_data) {

            item.string_list_data.forEach(user => {

                this.data.followers.push({

                    username: user.value,

                    timestamp: user.timestamp

                });

            });

        }

    });

};
Parser.readFollowing = async function () {

    const file = this.findFile([
        "following"
    ]);

    if (!file) {

        console.warn("Following file not found");

        return;

    }

    const json = await this.readJson(file);

    this.data.following = [];

    const list =
        json.relationships_following || [];

    list.forEach(user => {

        this.data.following.push({

            username: user.title,

            timestamp:
                user.string_list_data?.[0]?.timestamp

        });

    });

};
Parser.readPending = async function () {

    const file = this.findFile([
        "pending",
        "follow"
    ]);

    if (!file) return;

    const json = await this.readJson(file);

    this.data.pending = [];

    json.forEach(item => {

        item.string_list_data.forEach(user => {

            this.data.pending.push({

                username: user.value,

                timestamp: user.timestamp

            });

        });

    });

};
function createUsernameSet(list) {

    return new Set(

        list.map(item => item.username)

    );

}
Parser.normalizeUsername = function(username) {

    if (!username) return "";

    return username
        .trim()
        .toLowerCase()
        .replace(/^@/, "");

};

Parser.removeDuplicates = function(list) {

    const map = new Map();

    list.forEach(user => {

        const key = this.normalizeUsername(user.username);

        if (!map.has(key)) {

            map.set(key, user);

        }

    });

    return [...map.values()];

};

Parser.sortUsers = function(list) {

    return list.sort((a, b) => {

        return a.username.localeCompare(
            b.username,
            undefined,
            {
                sensitivity: "base"
            }
        );

    });

};
Parser.profileUrl = function(username) {

    return `https://www.instagram.com/${this.normalizeUsername(username)}/`;

};
Parser.calculateNotFollowingBack = function() {

    const followers = createUsernameSet(this.data.followers);

    return this.data.following.filter(user => {

        return !followers.has(

            this.normalizeUsername(user.username)

        );

    });

};
Parser.calculateYouDontFollowBack = function() {

    const following = createUsernameSet(this.data.following);

    return this.data.followers.filter(user => {

        return !following.has(

            this.normalizeUsername(user.username)

        );

    });

};
Parser.cleanData = function() {

    this.data.followers =
        this.sortUsers(
            this.removeDuplicates(
                this.data.followers
            )
        );

    this.data.following =
        this.sortUsers(
            this.removeDuplicates(
                this.data.following
            )
        );

    this.data.pending =
        this.sortUsers(
            this.removeDuplicates(
                this.data.pending
            )
        );

    this.data.recentRequests =
        this.sortUsers(
            this.removeDuplicates(
                this.data.recentRequests
            )
        );

    this.data.recentUnfollowed =
        this.sortUsers(
            this.removeDuplicates(
                this.data.recentUnfollowed
            )
        );

    this.data.closeFriends =
        this.sortUsers(
            this.removeDuplicates(
                this.data.closeFriends
            )
        );

};
this.cleanData();

this.data.notFollowingBack =
    this.calculateNotFollowingBack();

this.data.youDontFollowBack =
    this.calculateYouDontFollowBack();

Parser.findFiles = function(keywords = []) {

    return Object.keys(this.zip.files).filter(path => {

        const lower = path.toLowerCase();

        return keywords.every(word => lower.includes(word));

    });

};
