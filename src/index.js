const baseURL = "http://localhost:3000/quotes?_embed=likes"
const quotDiv = document.getElementById('quote-list')
const newQuote = document.getElementById('new-quote-form')

function start() {

    fetch(`${baseURL}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => {
            json.forEach(e => {
                showQuotes(e)
            });
            listenerDelete()
            listenerlike()
        })

}
const allIds = []


function showQuotes(a) {
    let likes = a.likes
    let quot = document.createElement('h6')
    let author = document.createElement('p')
    let likesBtn = document.createElement('Button')
    let deleteBtn = document.createElement('Button')
    let hR = document.createElement('hr')
    quotDiv.appendChild(quot)
    quotDiv.appendChild(author)
    quotDiv.appendChild(likesBtn)
    quotDiv.appendChild(deleteBtn)
    quot.innerHTML = a.quote
    author.innerHTML = `Author : ${a.author}`
    likesBtn.innerHTML = `Likes ${likes.length}`
    likesBtn.value = a.id
    likesBtn.className = "like-btn"
    deleteBtn.value = a.id
    deleteBtn.innerHTML = "Delete"
    deleteBtn.className= "btn"
    quotDiv.appendChild(hR)
    allIds.push(a.id)
    
}

function listenerADD() {
    newQuote.addEventListener('submit', function (e) {
        e.preventDefault()
        let newQuote = document.getElementById('new-quote').value
        let newAuthor = document.getElementById('author').value
        let newQuoteID = allIds.length + 1
        let Data = {
            id: newQuoteID,
            quote: newQuote,
            author: newAuthor
        }
        createNewQuote(Data);

    })

}

function createNewQuote(Data) {
    fetch(`${baseURL}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(Data),
    })
        .then(res => res.json())
        .then(json => console.log(json))
        document.getElementById('new-quote').value=""
        document.getElementById('author').value=""
        allIds.length=0
        start()
}



function listenerDelete(){
    let delbtn=document.querySelectorAll(".btn");
    for(let i=0;i<delbtn.length;i++){
        delbtn[i].addEventListener('click',(e)=>{
          deletePost(e.target.value)
        })
    }
}
function deletePost(a){
    fetch(`${baseURL}&id=${a}`, {
        method: 'delete'
})
        .then(res => res.json())
        .then(() => start())
}

function listenerlike(){
    let likebtens=document.querySelectorAll(".like-btn");
    for(let i=0;i<likebtens.length;i++){
        likebtens[i].addEventListener('click',(e)=>{
          addalike(e.target.value)
        })
    }
}

function addalike(a){
    fetch(`${baseURL}&id=${a}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(Daa),
    })
        .then(res => res.json())
        .then(json => console.log(json))
        start()
}

document.addEventListener('DOMContentLoaded', function () {
    start()
    listenerADD()
    
})