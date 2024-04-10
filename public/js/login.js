window.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('form')
   form.addEventListener('submit', async (event)=>{
    event.preventDefault() //j'interdit le navigateur de faire l'action par défault
    const data = Object.fromEntries(new FormData(form))// commande magique :)
    // data.username
    // data.password

    // On appel la route de l'API "/login" en methode POST. 
    // On spécifie qu'on envoi du JSON avec application/json
    // On transforme notre objet JS "data" en JSON et l'envoi a l'API
    // Quand l'API répond, on lis le JSON et on met le résultat dans la variable user
    const user = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response=>response.json())
    .catch(error=> {
        console.error("J'ai une erreur", error)
    })

    // Si l'utilisateur existe
    if(user) {
        console.log('Je suis connecté', user)
        // On le sauvegarde dans la session navigateur
        sessionStorage.setItem('user', user.id)

        // On redirige sur la page /index.html
        document.location.href = '/'
    }
   }) 
})
