const API_KEY = 'fcc5cc127ca513d182be531576591b32';

// Carregar filmes no index

let inicio = 0;
let fim = 3;
let pagina = 1;

function exibeMaisFilmes () {

    let sectionConteudoFilmesPopulares = document.getElementById('conteudoFilmesPopulares');
    let texto = sectionConteudoFilmesPopulares.innerHTML;

    // Montar texto HTML dos filmes
    let dados = JSON.parse (this.responseText);

    for (inicio; inicio < fim; inicio++) {
        let filme = dados.results[inicio];
        let data = new Date (filme.release_date);

        if (filme.overview == ""){
            filme.overview = `Indisponível ou somente em inglês.`
        }

        texto = texto + `
        <div class="px-1">
          <a href="https://www.themoviedb.org/movie/${filme.id}"><img src="https://image.tmdb.org/t/p/w300/${filme.poster_path}" alt="filme01"></a>
          <p class="py-2"><b class="h4">Filme: </b> <a href="https://www.themoviedb.org/movie/${filme.id}">${filme.title}</p></a>
          <p><b class="h6">Data de lançamento: </b>${data.toLocaleDateString()}</p>
          <p><b class="h6">Descrição: </b> ${filme.overview}
          <a href="https://www.themoviedb.org/movie/${filme.id}" class="btn btn-secondary text-dark m-2 btn-sm">Ver mais...</a></p>
        </div>
        `;
    };

    switch (fim){
        case 18:
            fim++;
            break;
        case 19:
            fim = 3;
            inicio = 0;
            pagina++;
        default:
            fim +=3;
    }
    
    // Preencher a DIV com o texto HTML
    sectionConteudoFilmesPopulares.innerHTML = texto;
}

function carregarMaisFilmes () {

    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeMaisFilmes;
    xhr.open ('GET', `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${pagina}`);
    xhr.send ();
}

document.getElementById ('btnMaisFilmes').addEventListener ('click', carregarMaisFilmes);
document.addEventListener('load' ,carregarMaisFilmes());
