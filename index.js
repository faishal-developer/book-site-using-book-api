// getting data by id name
let getById = id => document.getElementById(id);

// generate a dynamic url
let dynamicUrl = (input) =>{
    let url1 = "https://openlibrary.org/search.json?q=";
    return url1 + input ;
} 

let cardFeild = getById('card-feild');
//https://covers.openlibrary.org/b/id/.jpg
//browse and show data in card feild
let loopOnDocs=(docs)=>{
    docs.forEach(v => {
        let div = document.createElement('div')
        div.classList.add('card','col')
        div.innerHTML =`
        <img src="https://covers.openlibrary.org/b/id/${v.cover_i}-M.jpg" class="card-img-top" alt="book cover">
        <div class="card-body">
            <h5 class="card-title">${v.title}</h5>
            <p class="card-text">Book author:${v.author_name ? v.author_name[0] : ''}</p>
            <p class="card-text">${v.first_publish_year? `First published date:${v.first_publish_year}` : ""}</p>
            <p class="card-text">${v.publisher ? `Publisher: ${v.publisher}`: ''}</p>
        </div>`
        cardFeild.appendChild(div)
    });
}

let browseData = data =>{
    let resultNum = getById('result-num');
    cardFeild.textContent = ''
    console.log(data.docs);
    if(data.docs.length !== 0){
        resultNum.textContent =`${data.numFound} Results Found`; 
       loopOnDocs(data.docs);
    }else{
        resultNum.innerHTML = "No Result Found" ;
    }
    
}

// fetch data from server
let fetchData = (url,cb) =>{
    fetch(url)
        .then(res=>res.json())
        .then(data=>cb(data))
        // .catch(e=>errorHandle(e))
}

//error handling
// let errorHandle = e =>{
//     let numFound = getById('result-num')
//     numFound.innerHTML = e.message
// }


//add event listner on button and searching impelementing
getById('search-btn').addEventListener('click',()=>{
    let input = getById('search-input');
    if(input.value === '')alert('input feild is empty') ;
    else{
        let cardFeild = getById('card-feild');
        getById('result-num').textContent = '';
        cardFeild.innerHTML =`
        <div class="mx-auto spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`
        let url = dynamicUrl(input.value) ; 
        input.value = ''
        fetchData(url,browseData)
    }
    
})

// 1.dynamic URL--done
// 2.fetch Data--done
// 3.browse Data--done
// 4.clear data for new search--done
// 5.error handling