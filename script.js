const APIURL = "https://api.github.com/users/"

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

getUser("florinpop17")

// Load user after url and username
async function getUser(username) {
    const resp = await fetch(APIURL + username)
    const respData = await resp.json()

    // Sort based on created_at date in descending order ==> LOOK in addReposToCard()
    //     const resp = await fetch(APIURL + username + "/repos");
    // const respData = await resp.json();

    // const sortedRepos = respData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // console.log(respData.results)
    console.log(respData)
    // return respData

    // Load repos after url and username and repos
    async function getRepos(username) {
        const resp = await fetch(APIURL + username + "/repos")
        const respData = await resp.json()

        addReposToCard(respData)
    }

    // ==== createUserCard metoda 1 ====
    function createUserCard() {
        const cardElement = document.createElement("div")
        main.innerHTML = ""
        cardElement.classList.add("card")

        cardElement.innerHTML = `
            
                <img
                    class="img"
                   
                    src="${respData.avatar_url}"
                    alt="${respData.name}" />
           
            <div
                class="info"
               >
                <h2>${respData.name}</h2>
               
                <p>${respData.bio}</p>
                <ul>

<li>${respData.followers}<strong>Followers</strong></li>
            
<li>${respData.following}<strong>Following</strong>
</li>
                
<li>
${respData.public_repos}<strong>Repos</strong></li>
        </ul>

        <h4>Repos:</h4>
            <div class="repos" id="repos"></div>
            </div>

        `

        main.append(cardElement)
    }

    createUserCard()
    getRepos(username)

    //------------------------------------------------------//
    // ==== createUserCard metoda 2 ====
    // function createUserCard(user) {
    //     const cardElement = `
    //     <div class="card">
    //         <div class="img__container">
    //             <img
    //                 class="img"
    //                 id="img"
    //                 src="${respData.avatar_url}"
    //                 alt="${respData.name}" />
    //         </div>
    //         <div
    //             class="info"
    //             id="info">
    //             <h2>${respData.name}</h2>

    //             <p>${respData.bio}</p>
    //             <ul>
    //         <li>${respData.followers}</li>
    //         <li>${respData.following}</li>
    //         <li>${respData.public_repos}</li>
    //     </ul>
    //         </div></div>
    //     `

    //     main.innerHTML = cardElement
    // }
    //-----------------------------------------------------//
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos")

    console.log(repos)

    repos
        // Sort based on created_at date in descending order
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        // Slice and show only 10 repos
        .slice(0, 10)
        // For every repo create element
        .forEach((repo) => {
            const repoEl = document.createElement("a")

            repoEl.classList.add("repo")

            repoEl.href = repo.html_url
            repoEl.target = "_blank"
            repoEl.innerText = repo.name

            reposEl.append(repoEl)
        })
}

// Wait in search
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const user = search.value

    if (user) {
        getUser(user)

        search.value = ""
    }
})
