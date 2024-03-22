import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import styles from './characterCard.module.scss'
import { Link } from "react-router-dom";

export function CharacterCard({ character }) {
  const { image, name, species } = character;
  return (
    <Link href="#" className={styles.cardLink}>
    <article>
      <Card sx={{ maxWidth: 312 }}>
        <CardMedia
          component="img"
          alt={`${species} ${name}`}
          height="168"
          width="240"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {species}
          </Typography>
        </CardContent>
      </Card>
    </article>
    </Link>
  );
}
