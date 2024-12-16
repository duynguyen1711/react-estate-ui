import apiRequest from './apiRequest';

export const singlePostLoader = async ({ request, params }) => {
  const res = await apiRequest.get(`/posts/${params.id}`);
  return res.data;
};

export const ListPostLoader = async ({ request, params }) => {
  const res = await apiRequest.get('/posts');
  return res.data;
};
