const API_KEY = 'fcc5cc127ca513d182be531576591b32';

// Pesquisar por filmes em index.html ou pesquisa.html
let pagina = 1;

function exibePesquisa () {
    let sectionConteudoPesquisa = document.getElementById('conteudoPesquisa');
    let texto = "";

    // Montar texto HTML das noticias
    let dados = JSON.parse (this.responseText);

    for (i=0; i < dados.results.length; i++) {
        let filme = dados.results[i];
        let data = new Date (filme.release_date);

        if (filme.overview == ""){
            filme.overview = `Indisponível ou somente em inglês.`
        }

        let imagem;
        if (filme.poster_path == null){
            imagem = `<img src="/img/imagemNaoDisponivel.png" alt="não disponível">`;
        }
        else{
            imagem = `<img src="https://image.tmdb.org/t/p/w300/${filme.poster_path}" alt="filme01">`;
        }

        texto = texto + `
        <div class="px-1">
        <a href="https://www.themoviedb.org/movie/${filme.id}">${imagem}</a>
          <p class="py-2"><b class="h4">Filme: </b> <a href="https://www.themoviedb.org/movie/${filme.id}">${filme.title}</p></a>
          <p><b class="h6">Data de lançamento: </b>${data.toLocaleDateString()}</p>
          <p><b class="h6">Descrição: </b> ${filme.overview}
          <a href="https://www.themoviedb.org/movie/${filme.id}" class="btn btn-secondary text-dark m-2 btn-sm">Ver mais...</a></p>
        </div>
        `;
    };
    
    // Preencher a DIV com o texto HTML
    sectionConteudoPesquisa.innerHTML = texto;
}

function pesquisarFilmes () {
    let query = document.getElementById('txtPesquisa').value;

    let xhr = new XMLHttpRequest ();
    xhr.onload = exibePesquisa;
    xhr.open ('GET', `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}&page=${pagina}&include_adult=false`);
    xhr.send ();
}

function exibeMaisPesquisa () {
    let sectionConteudoPesquisa = document.getElementById('conteudoPesquisa');
    let texto = sectionConteudoPesquisa.innerHTML;

    // Montar texto HTML das noticias
    let dados = JSON.parse (this.responseText);

    for (i=0; i < dados.results.length; i++) {
        let filme = dados.results[i];
        let data = new Date (filme.release_date);

        if (filme.overview == ""){
            filme.overview = `Indisponível ou somente em inglês.`
        }

        let imagem;
        if (filme.poster_path == null){
            imagem = `<img src="/img/imagemNaoDisponivel.png" alt="não disponível">`;
        }
        else{
            imagem = `<img src="https://image.tmdb.org/t/p/w300/${filme.poster_path}" alt="filme01">`;
        }

        texto = texto + `
        <div class="px-1">
        <a href="https://www.themoviedb.org/movie/${filme.id}">${imagem}</a>
          <p class="py-2"><b class="h4">Filme: </b> <a href="https://www.themoviedb.org/movie/${filme.id}">${filme.title}</p></a>
          <p><b class="h6">Data de lançamento: </b>${data.toLocaleDateString()}</p>
          <p><b class="h6">Descrição: </b> ${filme.overview}
          <a href="https://www.themoviedb.org/movie/${filme.id}" class="btn btn-secondary text-dark m-2 btn-sm">Ver mais...</a></p>
        </div>
        `;
    };
    
    // Preencher a DIV com o texto HTML
    sectionConteudoPesquisa.innerHTML = texto;
    pagina++;
}

function pesquisarMaisFilmes () {
    let query = document.getElementById('txtPesquisa').value;
    pagina++;

    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeMaisPesquisa;
    xhr.open ('GET', `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}&page=${pagina}&include_adult=false`);
    xhr.send ();
}

document.getElementById ('btnPesquisa').addEventListener ('click', pesquisarFilmes);

document.getElementById ('btnMaisPesquisa').addEventListener ('click', pesquisarMaisFilmes);