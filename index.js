const inputSearch = document.querySelector('.searchInput')
const selectContainer = document.querySelector('.selectContainer')

const selector = document.querySelector('.selector')
const selectText = document.querySelector('.selectText')

const selectItems = document.querySelector('.selectItems')
const items = document.getElementsByClassName('items')

const streamButton = document.querySelector('.submitCONTAINER')

const loginButt = document.querySelector('.loginFella')

var itemSelected = 'Track';

var token;

try{
	let first = window.location.href.match(/=/i).index+1
	let second = window.location.href.match(/&token_type/i).index
	
	let tokeN = document.location.href.substring(first, second)
	token = tokeN
	console.log(tokeN)
}catch(error){
	document.querySelector('.loginFella').style.display = 'none'
	console.log('tokenDONE')
}

if(document.location.href.match(/access_token/i)){
	loginButt.innerText = "Loginned"
} 

inputSearch.innerText = 'Search Fella'
inputSearch.style.opacity = '.5'

loginButt.addEventListener('click', ()=>{
	document.location.href = 'https://accounts.spotify.com/authorize?client_id=334ed8866b1f4e30bf19e35e50cc392f&redirect_uri=https:%2F%2Fprooxith.github.io%2FspotifyFella%2F&response_type=token'
})

selector.addEventListener('click', ()=>{
	selectItems.style.display = 'block'
})
selector.addEventListener('mouseover', ()=>{
	selectContainer.style.backgroundColor = 'rgb(25,25,25)'
})
selector.addEventListener('mouseout', ()=>{
	selectContainer.style.backgroundColor = 'rgb(40,40,40)'
})

document.addEventListener('keydown',(e)=>{
	let windowEvent = window.event ? event: 3;
	if(windowEvent.keyCode === 13 && windowEvent.ctrlKey){
		streamSong()
	}
	if(windowEvent.keyCode === 40 && windowEvent.ctrlKey){
		itemSelected = 'Artist'
		selectText.innerText = 'Artist'
	}
	if(windowEvent.keyCode === 38 && windowEvent.ctrlKey){
		itemSelected = 'Track'
		selectText.innerText = 'Track'
	}
	if(windowEvent.keyCode === 16){
		inputSearch.focus()
		console.log('focused')
	}
	if(windowEvent.keyCode === 27){
		selectItems.style.display = 'none'
	}
})

for (var item of items){
	item.addEventListener('click', (e)=>{
		const itemVal = e.target.innerText
		selectItems.style.display = 'none'
		itemSelected = itemVal
		selectText.innerText = itemSelected
	})
}

inputSearch.addEventListener('focus', ()=>{
	const inputSearch = document.querySelector('.searchInput')
	inputText = inputSearch.innerText

	if(inputText == 'Search Fella'){
		inputSearch.innerText = ''
		inputSearch.style.opacity = '1'
	}
})

inputSearch.addEventListener('blur', ()=>{
	const inputSearch = document.querySelector('.searchInput')
	inputText = inputSearch.innerText

	if(inputText !== '' | 'Search Fella') return console.log('hey')
	
	console.log('gamerrr')
	inputSearch.innerText = 'Search Fella'
	inputSearch.style.opacity = '.5'
})

const streamSong=()=>{
	const inputSearch = document.querySelector('.searchInput')

	const query = document.querySelector('.searchInput')
	const queryVal = query.textContent

	const type = itemSelected.toLowerCase()
	searchSongs(queryVal, type)
	selectText.innerText = 'Choose Type:'
	query.innerText = 'Search Fella'
	inputSearch.style.opacity = '.5'
}

streamButton.onclick = streamSong

const enoughTyped=(val, event)=>{
	const charLen = val.textContent.length
	if(charLen>=27 && event.keyCode != 8){
		event.preventDefault()
	}
}

const playSong=(id, type)=>{
	const player = document.querySelector('.player')
	player.innerHTML = ''
	player.style.animation = 'loadingPlayer .5s linear infinite alternate'
	console.log(id, type)
	let typeOf = 'track'
	if(type=='artist') typeOf = 'artist'

	const song = document.createElement('iframe')
	song.src = `https://open.spotify.com/embed/${typeOf}/${id}`
	song.width = '100%'
	song.height = '380'
	song.frameBorder = '0'
	song.allowtransparency = 'true'
	song.allow = 'encrypted-media'
	player.append(song)
	player.style.animation = 'none'

}

const searchSongs=(name, type)=>{
	let typeOf = 'track';
	if(type=='artist') typeOf = 'artist'

	$.ajax({
	   url: `https://api.spotify.com/v1/search?q=${name}&type=${typeOf}&limit=1`,
	   type: 'GET',
	   contentType: 'application/json',
	   headers: {
	      'Authorization': `Bearer ${token}`
	   },
	   success: function (result) {
	   		if (type =='artist'){
	   			let artist = result['artists']['items'][0]['id']
	   			playSong(artist, typeOf)
	   		}else{
	   			let song = result['tracks']['items'][0]['id']
	   			playSong(song, typeOf)
	   		}

	   		
	   },
	   error: function (error) {
	   		console.log(error)
	   }
	});
}
