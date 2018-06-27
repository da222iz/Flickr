/** div class="search" */
var template = document.querySelector('#search').content.firstElementChild

var search = document.importNode(template, true)

var showGallery = false

document.body.appendChild(search)

/** Search on flickr */
document.querySelectorAll('button')[0].addEventListener('click', () => {
  const elements = document.getElementsByClassName("picture")

  while (elements.length > 0) elements[0].remove()

  searchOnFlickr(document.querySelector('input').value)

  showGallery = false
})

/** View gallery */
document.querySelectorAll('button')[1].addEventListener('click', () => {
  const elements = document.querySelectorAll("img")

  elements.forEach(element => {
    if (element.classList.length === 0) {
      element.remove()
    } else {
      selectAnImage(element)
    }
  })

  showGallery = true
})

var searchOnFlickr = (text) => {
  var xmlhttp = new XMLHttpRequest()
  xmlhttp.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b02da1b1ca6dbe171daef1cabf6a1be9&text=' + text + '&format=json&nojsoncallback=1&sort=relevance&extras=url_m&per_page=100', true)
  xmlhttp.send()

  xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var pictures = JSON.parse(xmlhttp.responseText).photos.photo

      console.log(pictures)

      pictures.forEach(element => {
        addPicture(element.id, element.title, element.url_m)
      })
    }
  }
}

/** Add a picture */
var addPicture = (id, title, url_m) => {
  var template = search.querySelectorAll('template')[0].content.firstElementChild

  /** div class="picture" */
  var picture = document.importNode(template, true)

  var img = picture.querySelector('img')

  img.id = id
  img.src = url_m
  img.alt = title

  img.addEventListener('click', () => {
    selectAnImage(img)
  })

  picture.appendChild(img)

  search.appendChild(picture)
}

/** Select an image */
var selectAnImage = (img) => {
  var picture = document.getElementById(img.id)
  if (picture.classList.length === 0) {
    //  Add class
    picture.classList = 'selected'
    if(showGallery === false) {
      picture.style = 'border: 2px solid red'
    } else {
      picture.style = 'width: 1000px;'
    }
  } else {
    picture.classList.remove('selected')
    picture.style = ''
  }
}
