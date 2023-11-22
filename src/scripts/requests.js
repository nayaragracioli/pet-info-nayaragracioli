import { toast } from "./toast.js";

const baseUrl = "http://localhost:3333";
const token = localStorage.getItem("@petinfo:token");
export const green = "#087d5a";
export const red = "#db3d5a";

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// Informações de usuário logado
export async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();

  return user;
}

// Listagem de posts
export async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();
  return posts;
}

// Login
export const loginRequest = async (requestBody) => {
  const loginToken = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestBody)
  })
    .then(async (res) => {
      const resConvert = await res.json()

      localStorage.setItem("@petinfo:token", resConvert.token);

      if (res.ok) {
        toast("Login realizado com sucesso", green);

        setTimeout(() => {
          location.replace("./src/pages/feed.html");
        }, 1000);

        return resConvert;
      } else {
        toast(resConvert.message, red);
      }
    })

  return loginToken;
}

// Criar usuário
export const registerRequest = async (requestBody) => {
  const loginToken = await fetch(`${baseUrl}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
    .then(async (res) => {
      const resConvert = await res.json();
      if (res.ok) {
        toast("Sua conta foi criada com sucesso!", green);

        return resConvert;
      } else {
        toast("Não foi possível criar sua conta, verifique os dados novamente.", red);
      }
    })
  return loginToken;
}

// Criar um Posts
export const createNewPost = async (requestBody) => {
  const newPost = await fetch(`${baseUrl}/posts/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestBody)
  })
  .then(async (res) => {
    const resConvert = await res.json();
    console.log(resConvert);
    if (res.ok) {
      toast("Post criado com sucesso!", green);

      return resConvert;
    } else {
      toast("Algo deu errado, tente novamente.", red);
    }
  })

  return newPost;
}

// Capturar Post pelo Id
export const postById = async (taskId) => {
  const readPostById = await fetch(`${baseUrl}/posts/${taskId}`, {
    method: "GET",
    headers: requestHeaders
  })
  .then(async (res) => {
    const resConvert = await res.json();

    if (res.ok) {
      return resConvert;
    } else {
      toast(resConvert.message, red);
    }
  })

  return readPostById;
}

//Editar Post pelo Id
export const editPostById = async (taskId, requestBody) => {
  const editById = await fetch(`${baseUrl}/posts/${taskId}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(requestBody)
  })
  .then(async (res) => {
    const resConvert = await res.json();

    if(res.ok) {
      toast("Post atualizado com sucesso!", green);

      return resConvert;
    } else {
      toast(resConvert.message, red);
    }
  })

  return editById;
}

//Excluir Post pelo Id
export const deletePostById = async (taskId) => {
  const deleteById = await fetch(`${baseUrl}/posts/${taskId}`, {
    method: "DELETE",
    headers: requestHeaders,
  })
  .then(async (res) => {
    const resConvert = await res.json();

    if(res.ok) {
      toast(resConvert.message, green);

      return resConvert;
    } else {
      toast(resConvert.message, red);
    }
  })

  return deleteById;
}