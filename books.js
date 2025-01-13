
function Book(title, author, numpages,status)
{
 this.title = title;
 this.author = author;
 this.numpages = numpages;
 this.status = status;
}
Book.prototype.info = function(){ 
    info = this.title + " by " + this.author + ", " + this.numpages + " pages, " + this.status
    return info;
  }
Book.prototype.toggleStatus = function(){ 
    if (this.status == "Read"){
        this.status = "Not read yet";
    }
    else{
        this.status = "Read";
    }
    return this.status;
 }

const newbookid = document.getElementById("newbook")
const addbookdialog = document.getElementById("addbookdialog")
const closebtn = document.getElementById("closebtn")
const newbookform = document.getElementById("newbookform")
const bookdisplay = document.getElementById("bookdisplay")
let booklist =[]
newbookid.addEventListener("click", () =>{
    addbookdialog.showModal();
})
closebtn.addEventListener("click", ()=>{
    addbookdialog.close();
})

function displayBooks(book,index){
 const bookinfo = document.createElement("div")
 bookinfo.classList.add("book")
 bookinfo.id = `${index}`
 bookinfo.innerHTML = `
 <p class = "btitle"><strong>Title:</strong>${book.title}</p>
 <p class = "bauthor"><strong>Author:</strong>${book.author}</p>
 <p class = "bpages"><strong>Pages:</strong>${book.numpages}</p>
 <p class = "bstatus"><strong>Status:</strong>${book.status}</p>
`;

const removebtn = document.createElement("button")
removebtn.innerHTML = "Remove book"
removebtn.classList = "removebtn"
removebtn.id = `${index}`
bookinfo.appendChild(removebtn)

const changestatus = document.createElement('button')
changestatus.innerHTML = "Change status"
changestatus.classList = "changestatusbtn"
changestatus.id =  `${index}`
bookinfo.appendChild(changestatus)
bookdisplay.appendChild(bookinfo);
}

biographybook = new Book("Die Welt von Gestern", "Stefan Zweig",512, "Read")
novel = new Book("Buddenbrooks", "Thomas Mann", 768, "Read")
booklist.push(biographybook)
booklist.push(novel)
for (let index = 0; index<=booklist.length-1;index++)
    {
        displayBooks(booklist[index], index)
    }
removeBook();
changeTheStatus();

function changeTheStatus(){
    changestatuslist = document.querySelectorAll(".changestatusbtn")
    changestatuslist.forEach((changestatusbtn) => {
        changestatusbtn.addEventListener("click", (event)=>{
            event.preventDefault()
            book = changestatusbtn.parentElement
            console.log(book)
            for (index = 0 ; index <= booklist.length -1 ; index ++)
            { 
                if (book.id == index){
                    newbookstatus = booklist[index].toggleStatus();
                    bstatus = book.querySelector(".bstatus")
                    bstatus.innerHTML =  `<p class="bstatus"><strong>Status:</strong>${newbookstatus}</p>`;
                }
           }
        })
    })
}

function removeBook(){
    removebtnlist = document.querySelectorAll(".removebtn")
    removebtnlist.forEach((removebtn) =>{
        removebtn.addEventListener("click", ()=>{
            book = removebtn.parentElement;
            booktitle = book.querySelector(".btitle").textContent.replace("Title:", "").trim();
            bookauthor = book.querySelector(".bauthor").textContent.replace("Author:", "").trim();
            for (let index = 0; index <= booklist.length -1 ; index++)
                {
                    if (booktitle === booklist[index].title && bookauthor === booklist[index].author) {
                        booklist.splice(index, 1); 
                        break; 
                    }
                }
                
            if (bookdisplay.contains(book))
                {
                    bookdisplay.removeChild(book)
                }
            removebtnlist = document.querySelectorAll(".removebtn");
        })
    })
}
newbookform.addEventListener("submit", (event)=>{
    event.preventDefault()
        const title = document.getElementById("booktitle").value;
        const author = document.getElementById("author").value;
        const numpages = document.getElementById("numpages").value;
        const status = document.querySelector('input[name="status"]:checked').value;
        if(title && author && numpages && status);
        {
            book = new Book(title, author, numpages, status);
            booklist.push(book);
            displayBooks(booklist[booklist.length - 1], booklist.length - 1);
            newbookform.reset();
            removeBook();
            changeTheStatus();
        }

})

