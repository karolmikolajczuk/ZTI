// z czytaj dane z json'a
var data_json_file = [];
const reqContent = new XMLHttpRequest();
reqContent.open('GET', 'posts.json', true);
reqContent.onload = () => {
    // konwersja ze stringu json na literalny obiekt json
    data_json_file = JSON.parse(reqContent.responseText);
};
reqContent.send();
// ========================= KONIEC CZYTANIA Z PLIKU JSON

function generateForumPost(id) {
    const generateHTML = document.querySelector('.article');
    generateHTML.innerHTML +=
        `<article id='article_${id}'>
      <aside>
        <span class="post_nick"><a href="#">%username_${id}%</a></span>
        <div class="post_aside--avatar">
          <a href="#"></a>
        </div>
        <span class="post_grup"></span>
      </aside>
      <div class="post_content">
        <div class="post_content--date"></div>
        <div class="post_content--post"></div>
        <div class="post_content_buttons">
          <a href="#"><button class="post_content_buttons_quote" onclick="showModal(${id})"><span>Edytuj</span></button></a>
        </div>
      </div>
    </article>`;
};

// z czytywanie danych uzytkownikow
function readUser(element) {

    // z czytaj dane z pliku .json 
    const requestUser = new XMLHttpRequest();
    requestUser.open('GET', 'users.json', true);
    requestUser.onload = () => {

        // konwersja ze stringu json na literalny obiekt json
        let data = JSON.parse(requestUser.responseText);

        // dla kazdego usera
        data.forEach(user => {
            // jezeli id zgadzaja sie to uzupelnij danymi
            if (user.id_user == element.id_user) {
                document.querySelector(`#article_${element.id} .post_nick a`).textContent = user.name;
                document.querySelector(`#article_${element.id} .post_aside--avatar a`).innerHTML = `<img src="img/current_user.png" alt="profile_picture">`;
                document.querySelector(`#article_${element.id} .post_content--date`).innerHTML = `${element.date}`;
                document.querySelector(`#article_${element.id} .post_content--post`).innerHTML = element.content;
            };
        });
    };
    requestUser.send();
};

// przez odswiezanie cykliczne posty by byly dodawane non-stop co sekunde
// dlatego trzeba zrobic globalna zmienna zeby generowalo strone raz
let generate_page_once = true;

// generowanie postow z pliku json
function generatePage() {
    console.log("generatePage()");

    // z czytaj dane z json'a
    const requestContent = new XMLHttpRequest();
    requestContent.open('GET', 'posts.json', true);
    requestContent.onload = () => {

        // parsowanie json string na json object
        let data = JSON.parse(requestContent.responseText);

        // jezeli jeszcze nie wygenerowales
        if (generate_page_once == true) {
            // generuj posty
            data.forEach(element => {
                generateForumPost(element.id);
            });
            // juz pozniej nie generuj postow
            generate_page_once = false;
        };
        // uzupelnij post o to ktory user co pisal
        data.forEach(element => {
            readUser(element);
        });
    }
    requestContent.send();
}

// otworz okno modalne na nacisniecie
function showModal(id) {
    document.getElementById("myModal").style.display = "block";

    document.getElementById("updateButton").onclick = function() {
        data_json_file.forEach(element => {
            if (element.id == id) {
                element.content = "<p>" + document.getElementById("newText").value + "</p>";
                document.querySelector(`#article_${id} .post_content--post`).innerHTML = element.content;
            }
        });
        console.log(data_json_file);
        closeModal();
    }
}

// zamknij okno modalne na X
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// update content
function updateArticle() {
    for (let index = 1; index <= data_json_file.length; index++) {
        console.log("Updating article: " + index);
        updateEachArticle(index);
    }
}

// updating specific content 
function updateEachArticle(id) {
    console.log("przed:");
    console.log(data_json_file);

    data_json_file.forEach(post => {
        if (post.id == id) {
            console.log("post.id=" + post.id + " id=" + id);
            document.querySelector(`#article_${id} .post_content--post`).innerHTML = post.content;
        }
    });

    console.log("po:");
    console.log(data_json_file);
}

// definicje metod
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// wywolania (ogolnie - dzialanie)


// wywołaj raz..
generatePage();

// wywołuj cyklicznie 
setInterval(() => {
    updateArticle();
    console.log("update");
}, 4000);