import apiRequest from './apiRequest';

export const singlePostLoader = async ({ request, params }) => {
  const res = await apiRequest.get(`/posts/${params.id}`);
  return res.data;
};
export const ListMyOwnPostLoader = async ({ request, params }) => {
  const postResponse = apiRequest.get(`/posts/post-of-user`);
  return { postResponse };
};

export const ListPostLoader = async ({ request, params }) => {
  const query = request.url.split('?')[1];

  // Trả về Promise mà không cần await ngay
  const postResponse = apiRequest.get('/posts?' + query);

  return {
    postResponse, // Trả về Promise
  };
};
