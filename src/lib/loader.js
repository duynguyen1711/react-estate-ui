import apiRequest from './apiRequest';

export const singlePostLoader = async ({ request, params }) => {
  const res = await apiRequest.get(`/posts/${params.id}`);
  return res.data;
};
export const ListMyOwnPostLoader = async () => {
  const postResponse = apiRequest.get(`/posts/post-of-user`);
  return { postResponse };
};
export const ListPostSaved = async () => {
  const postSavedResponse = apiRequest.get(`/saved-posts`);
  return { postSavedResponse };
};
export const CombinedPostLoader = async () => {
  try {
    const postResponse = await apiRequest.get(`/posts/post-of-user`);
    const postSavedResponse = await apiRequest.get(`/saved-posts`);

    // Trả về cả hai dữ liệu trong một object
    return {
      postResponse: postResponse,
      postSavedResponse: postSavedResponse,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      postResponse: [],
      postSavedResponse: [],
    };
  }
};

export const ListPostLoader = async ({ request, params }) => {
  const query = request.url.split('?')[1];

  // Trả về Promise mà không cần await ngay
  const postResponse = apiRequest.get('/posts?' + query);

  return {
    postResponse, // Trả về Promise
  };
};
