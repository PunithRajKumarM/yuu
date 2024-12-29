import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

interface IPost {
  fullName: string;
  userName: string;
  post: {
    text: string;
    image: string;
  };
}

// post
export default function Post({ posts }: { posts: IPost[] }) {
  return (
    <>
      {posts.map((p, i) => {
        const { fullName, userName, post } = p;
        const { image, text } = post;
        return (
          <Card key={i} sx={{ width: '80%' }}>
            <CardHeader
              avatar={
                <Avatar src={image} sx={{ bgcolor: red[900] }} aria-label="post" alt={fullName} />
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={fullName}
              subheader="September 14, 2016"
            />
            <CardContent>
              {text && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {text}
                </Typography>
              )}
            </CardContent>
            {image && <CardMedia component="img" image={image} alt="demo" />}
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <CommentIcon />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}
