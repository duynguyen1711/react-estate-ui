import apiRequest from './apiRequest';

export const singlePostLoader = async ({ request, params }) => {
  const res = await apiRequest.get(`/posts/${params.id}`);
  return res.data;
};
export const ListMyOwnPostLoader = async ({ request, params }) => {
  const res = await apiRequest.get(`/posts/post-of-user`);
  return res.data;
};

export const ListPostLoader = async ({ request, params }) => {
  const query = request.url.split('?')[1];
  const res = await apiRequest.get('/posts?' + query);
  return { postRespone: res.data };
};
