import Service from './service'
import storage from './../data/storage'
import { UnAuthorizedError } from './errors'
import { getData, authHeader } from './util'

export default {
  async login({ email, password }) {
    const response = await Service.post('/users/login', {
      user: {
        email,
        password
      }
    })
    const user = getData(response).user
    storage.saveUser({ user })
    return user
  },
  async register({ username, email, password }) {
    const response = await Service.post('/users', {
      user: {
        username,
        email,
        password
      }
    })
    const user = getData(response).user
    storage.saveUser({ user })
    return user
  },
  async getCurrentUser() {
    return storage.getUser()
  },
  async updateUser({ email, username, password, image, bio }) {
    const token = storage.getToken()
    const response = await Service.put('/user', {
      user: {
        username,
        email,
        password,
        image,
        bio
      }
    }, {
        headers: authHeader(token)
      })
    const user = getData(response).user
    storage.saveUser({ user })
    return user
  },
  async getProfile({ username, authenticated }) {
    let response;
    if (authenticated) {
      const token = storage.getToken()
      if (!token) throw new UnAuthorizedError()
      response = await Service.get(`/profiles/${username}`, {
        headers: authHeader(token)
      })
    } else {
      response = await Service.get(`/profiles/${username}`)
    }
    return getData(response).profile
  },
  async followuser({ username }) {
    const token = storage.getToken()
    if (!token) throw new UnAuthorizedError()
    const response = await Service.post(`/profiles/${username}/follow`, {}, {
      headers: authHeader(token)
    })
    return getData(response).profile
  },
  async unfollowuser({ username }) {
    const token = storage.getToken()
    if (!token) throw new UnAuthorizedError()
    const response = await Service.delete(`/profiles/${username}/follow`, {}, {
      headers: authHeader(token)
    })
    return getData(response).profile
  },
  async getArticles({ tag, author, favorited, limit, offset, authenticated }) {
    let response
    if (authenticated) {
      const token = storage.getToken()
      if (!token) throw new UnAuthorizedError()
      response = await Service.get('/articles', {
        params: {
          tag,
          author,
          favorited,
          limit,
          offset
        },
        headers: authHeader(token)
      })
    } else {
      response = await Service.get('/articles', {
        params: {
          tag,
          author,
          favorited,
          limit,
          offset
        }
      })
    }
    return getData(response).aticles
  },
  async getFeedArticles({ limit, offset }) {
    const token = storage.getToken()
    if (!token) throw new UnAuthorizedError()
    const response = await Service.get('/articles/feed', {
      params: {
        limit,
        offset
      },
      headers: authHeader(token)
    })
    return getData(response).aticles
  },
  async getArticle({ slug }) {
    const response = await Service.get(`/articles/${slug}`)
    return getData(response).aticle
  },
  async createArticle({ title, description, body, tagList }) {
    const token = storage.getToken()
    if (!token) throw new UnAuthorizedError()
    const response = await Service.post('/articles', {
      article: {
        title,
        description,
        body,
        tagList: tagList || []
      }
    }, {
        headers: authHeader(token)
      })
    return getData(response).article
  },
  async updateArticle({ title, description, body, slug }) {
    const token = storage.getToken()
    if (!token) throw new UnAuthorizedError()
    const response = await Service.put(`/articles/${slug}`, {
      article: {
        title,
        description,
        body
      }
    }, {
        headers: authHeader(token)
      })
    return getData(response).article
  },
  async deleteArticle({ slug }) {
    const token = storage.getToken()
    if (!token) throw new UnAuthorizedError()
    const response = await Service.delete(`/articles/${slug}`, {
      headers: authHeader(token)
    })
    getData(response)
  },
  async addComment({ slug, body }) {
    const token = storage.getToken()
    if (!token) throw new UnAuthorizedError()
    const response = await Service.post(`/articles/${slug}/comments`, {
      coment: {
        body
      }
    }, {
        headers: authHeader(token)
      })
    return getData(response).comment
  },
  async getComments({ slug, authenticated }) {
    let response
    if (authenticated) {
      const token = storage.getToken()
      if (!token) throw new UnAuthorizedError()
      response = await Service.get(`/artcles/${slug}/comments`, {
        headers: authHeader(token)
      })
    } else {
      response = await Service.get(`/artcles/${slug}/comments`)
    }
    return getData(response).comments
  },
  async deleteComment({ slug, id }) {
    const token = storage.getToken()
    if (!token) throw new UnAuthorizedError()
    const response = await Service.delete(`/articles/${slug}/comments/${id}`, {
      headers: authHeader(token)
    })
    getData(response)
  },
  async favoriteArticle({ slug }) {
    const token = storage.getToken()
    if (!token) throw new UnAuthorizedError()
    const response = await Service.post(`/articles/${slug}/favorite`, {}, {
      headers: authHeader(token)
    })
    return getData(response).article
  },
  async unfavoriteArticle({ slug }) {
    const token = storage.getToken()
    if (!token) throw new UnAuthorizedError()
    const response = await Service.delete(`/articles/${slug}/favorite`, {}, {
      headers: authHeader(token)
    })
    return getData(response).article
  },
  async getTags() {
    const response = await Service.get('/tags')
    return getData(response).tags
  }
}