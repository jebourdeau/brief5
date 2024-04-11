window.addEventListener('DOMContentLoaded', async ()=>{
const mainEL = document.querySelector('main') 
const token = sessionStorage.getItem('token')



async function getCurrentUser(token) {
    return await fetch(`/user`, {
        headers: {
            'Authorization': `${token}`
        }
    })
        .then(async response => {
            if(response.ok){
                return response.json()
            }
            throw await response.json()
        })
}

async function getPosts() {
    return await fetch('/post')
        .then(async response => {
            if(response.ok){
                return response.json()
            }
            throw await response.json()
        })
}

// if (!token) {
//     document.location.href = '/login.html'
//     return
// }

const userPromise = getCurrentUser(token)
    .catch(error => {
        mainEL.innerText = error.message
    })

const postsPromise = getPosts()
    .catch(error=> {
        console.error(error)
    })


const user = await userPromise
const posts = await postsPromise

if(user) {
    mainEL.innerText = 'Bonjour ' + user.username
}

mainEL.innerHTML += '<br/><br/>' + posts.map(post => post.content).join('<br/>')
})