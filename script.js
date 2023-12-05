const APIURL = "https://api.github.com/users/"

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

getUser("florinpop17")

async function getUser(user) {
    const resp = await fetch(APIURL + user)
    const respData = await resp.json()

    // console.log(respData.results)
    console.log(respData)
    // return respData

    // ==== createUserCard metoda 1 ====
    function createUserCard() {
        const cardElement = document.createElement("div")
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
            <li>${respData.followers}</li>
            <li>${respData.following}</li>
            <li>${respData.public_repos}</li>
        </ul>
            </div>
        `

        main.append(cardElement)
    }
    createUserCard()

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

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const user = search.value

    if (user) {
        getUser(user)

        search.value = ""
    }
})
