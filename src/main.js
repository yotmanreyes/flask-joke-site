(function () {
    let categories = ['Programming', 'Miscellaneous', 'Dark', 'Pun', 'Spooky', 'Christmas']
    let blacklistFlags = ['nsfw', 'racist', 'sexist']
    let category = 'Any'
    let lang = 'en'
    let langList = document.querySelector('.lang-list')
    let categoriesBoard = document.querySelectorAll('.joke-category')
    let jokeCard = document.querySelector('.joke-card')


    langList.addEventListener('change', function (e) {
        lang = e.target.value
    })

    document.body.addEventListener('click', function (e) {
        if (e.target != jokeCard) {
            if (jokeCard.querySelector('p')) {
                jokeCard.querySelector('p').remove()
            }
            if (jokeCard.querySelector('h3')) {
                jokeCard.querySelector('h3').remove()
            }
            jokeCard.classList.remove('show')
        }
    })

    categoriesBoard.forEach(cat => {


        cat.addEventListener('click', function () {
            if (cat.dataset.category == 'random') {
                category = categories.join(',')
            } else {
                category = cat.dataset.category
            }
            let apiUrl = `https://v2.jokeapi.dev/joke/${category}?lang=${lang}`
            fetch(apiUrl)
                .then(response => response.json())
                .then(response => {
                    let p = document.createElement('p')
                    let h3 = document.createElement('h3')

                    if (response.type == 'twopart') {
                        h3.textContent = response.setup
                        p.textContent = response.delivery
                        jokeCard.appendChild(h3)
                        jokeCard.appendChild(p)
                    }

                    if (response.type == 'single') {
                        p.textContent = response.joke
                        jokeCard.appendChild(p)
                    }
                    jokeCard.classList.add('show')
                })
        })
    })
})()