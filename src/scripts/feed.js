import { renderAllPosts } from "./render.js";
import { createNewPost, deletePostById, editPostById, getAllPosts, getCurrentUserInfo, green, red } from "./requests.js";
import { toast } from "./toast.js";



async function showUserMenu () {
  const userAction = document.querySelector(".user__image");
  const menu = document.querySelector(".user__logout");
  const userUniquename = document.querySelector(".user__uniquename");
  const currentUser = await getCurrentUserInfo();
  console.log(currentUser);
  userUniquename.innerText = currentUser.username;
  userAction.src = currentUser.avatar;
  
  userAction.addEventListener("click", (e) => {
    menu.classList.toggle("hidden");
  });
}


function main() {
  // Adiciona os eventos de click ao menu flutuante de logout
  showUserMenu();
  // Renderiza todos os posts no feed (render.js)
  renderAllPosts();
}

main();


// Proteção da Página
const authentication = () => {
  const token = localStorage.getItem("@petinfo:token");

  if (!token) {
    location.replace("../..")
  }
}

//Criar um novo Post
export const handleNewPost = () => {
  const inputs = document.querySelectorAll(".create__post")
  const button = document.querySelector("#addPostSubmit");
  const modalController = document.querySelector(".modal__controller--post");

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    let count = 0;

    const inputTitle = document.querySelector("#postTitle").value;
    const inputDescription = document.querySelector("#postDescription").value;

    const newPost = {
      title: inputTitle,
      content: inputDescription
    };

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        count++;
      }
    })

    if (count !== 0) {
      toast("Por favor, preencha todos os campos necessários", red);
    } else {
      await createNewPost(newPost);
      modalController.close()

      renderAllPosts();

      inputs.forEach(input => {
        input.value = ""
      })
    }
  })

}

//Abrir para criar novo post
const showAddPostModal = () => {
  const button = document.querySelector("#user__newpost");
  const modalController = document.querySelector(".modal__controller--post");

  button.addEventListener("click", () => {
    modalController.showModal();

    closePostModal();
  })

}

//Fechar modal de criar novo post
const closePostModal = () => {
  const button = document.querySelector("#closeModalButton");
  const modalController = document.querySelector(".modal__controller--post");

  button.addEventListener("click", () => {
    modalController.close();
  })

}


//Editar um post
export const handleUpdateModal = () => {
  const modalController = document.querySelector(".modal__controller--update");
  const inputs = document.querySelectorAll(".modal__controller--update > add__input");
  const updateButtons = document.querySelectorAll(".post__button--edit");
  const submitButton = document.querySelector("#saveSubmitUpdate");

  updateButtons.forEach(button => {
    button.addEventListener("click", (firstEvent) => {
      modalController.showModal();

      submitButton.addEventListener("click", async (event) => {
        event.preventDefault();
        let count = 0;

        const updateTitle = document.querySelector("#titleUpdate").value;
        const updateDescription = document.querySelector("#descriptionUpdate").value;
        const updatePost = {
          title: updateTitle,
          content: updateDescription
        };

        inputs.forEach(input => {
          if (input.value.trim() === "") {
            count++;
          }
        })

        if (count !== 0) {
          return toast("Por favor preencha todos os campos necessários.", red);
        } else {
          await editPostById(firstEvent.target.dataset.id, updatePost);
          modalController.close();
          renderAllPosts();

          inputs.forEach(input => {
            input.value = "";
          })
        }
      })
      const buttonCancel = document.querySelectorAll("#postCancelUpdate")
      buttonCancel.forEach((button) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          modalController.close();
        })
      })
    })
  })

}


//Excluir um post
export const handleDeleteModal = () => {
  const modalController = document.querySelector(".modal__controller--delete");
  const deleteButtons = document.querySelectorAll(".post__button--delete");
  const deletePost = document.querySelector("#deletePost");

  deleteButtons.forEach(button => {
    button.addEventListener("click", (firstEvent) => {
      modalController.showModal();

      deletePost.addEventListener("click", async (event) => {
        event.preventDefault();

        await deletePostById(firstEvent.target.dataset.id);
        modalController.close();
        renderAllPosts();


      })
      const buttonCancel = document.querySelectorAll("#cancelPostDelete")
      buttonCancel.forEach((button) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          modalController.close();
        })
      })
    })
  })

}


//Sair da conta
const logout = () => {
  const btnLogout = document.querySelector(".logout__button")
  btnLogout.addEventListener("click", () => {
    setTimeout(toast("Logout feito com sucesso!", green), 80)
    setTimeout(() => {
      window.location.href = "../../index.html"
    }, 1000)
    localStorage.removeItem("@petinfo:token")
  })
}

//Abrir um post
export const posts = await getAllPosts();

export const openModalPost = (openPost) => {
  const imgLogo = document.querySelector("#img-logoModal");
  const postTime = document.querySelector("#postTime");
  const modalName = document.querySelector(".post_modal__container--name");
  const title = document.querySelector("#modal__title");
  const textarea = document.querySelector("#text__area");
  const modalController = document.querySelector(".modal__controller--viewPost");


  const accessPublication = document.querySelectorAll(".post__open");

  accessPublication.forEach(button => {
    button.addEventListener("click", (event) => {
      const post = openPost.filter(element => {
        return (element.id == event.target.dataset.id)
      })

      const newData = new Date(post[0].createdAt);
      const monthAndYear = { month: "long", year: "numeric" };
      const formattedDate = newData.toLocaleDateString("pt-BR", monthAndYear);

      imgLogo.src = post[0].user.avatar;
      modalName.innerText = post[0].user.username;
      title.innerText = post[0].title;
      textarea.innerText = post[0].content;
      postTime.innerText = formattedDate;

      modalController.showModal();
    })

  })
  const btnClose = document.querySelector(".btn__closeModal");
  btnClose.addEventListener("click", () => modalController.close());
}


authentication();
showAddPostModal();
logout();





