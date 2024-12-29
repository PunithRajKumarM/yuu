import Post from './post/Post';
import Morning from '../../../assets/Morning.png';
import Evening from '../../../assets/Evening.png';
import Night from '../../../assets/Night.png';

function Posts() {
  const posts = [
    {
      fullName: 'Hinata',
      userName: 'hinata',
      post: {
        text: 'Good Morning, folks!',
        image: Morning,
      },
    },
    {
      fullName: 'Hinata',
      userName: 'hinata',
      post: {
        text: 'Good Evening, folks!',
        image: Evening,
      },
    },
    {
      fullName: 'Hinata',
      userName: 'hinata',
      post: {
        text: 'Good Night, folks!',
        image: Night,
      },
    },
  ];
  return <Post posts={posts} />;
}

export default Posts;
