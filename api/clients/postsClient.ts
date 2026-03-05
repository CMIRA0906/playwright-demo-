import { APIRequestContext } from '@playwright/test';

export class PostsClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getPosts() {
    return this.request.get('/posts');
  }

  async getPost(id: number) {
    return this.request.get(`/posts/${id}`);
  }

  async createPost(payload: any) {
    return this.request.post('/posts', { data: payload });
  }
}