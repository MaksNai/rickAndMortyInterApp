import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import styles from './characterCard.module.scss'
import { Link } from "react-router-dom";

export function CharacterCard({ character }) {
  const { img, characterName, species } = character;
  return (
    <Link href="#" className={styles.cardLink}>
    <article>
      <Card sx={{ maxWidth: 312 }}>
        <CardMedia
          component="img"
          alt={`${species} ${characterName}`}
          height="168"
          image={img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {characterName}
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
