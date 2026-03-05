import { test, expect } from '@playwright/test';
import { PostsClient } from '../../api/clients/postsClient';
import { newPost } from '../../data/postsPayload';
import { Post } from '../../types/apiModels/Posts';

test.describe('Posts API', () => {

  test('GET posts should return posts list', async ({ request }) => {
    const postsClient = new PostsClient(request);

    const response = await postsClient.getPosts();

    expect(response.status()).toBe(200);

    const body : Post[] = await response.json();
    console.log(body[0]);

    expect(body.length).toBeGreaterThan(0);
  });

  test('POST should create a post', async ({ request }) => {
    const postsClient = new PostsClient(request);

    const response = await postsClient.createPost(newPost);

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title).toBe(newPost.title);
  });

});