import { Link } from 'react-router-dom'
import { FC } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import styles from './episodeCard.module.scss'
import { EpisodeCardProps } from '../../interfaces/interfaces'

export const EpisodeCard: FC<EpisodeCardProps> = ({ episodeData }: EpisodeCardProps) => {
  const { name, air_date, episode, id } = episodeData
  const episodeLink = `/episodes/${id}`
  return (
    <Link to={episodeLink} className={styles.cardLink}>
      <Card
        sx={{
          minWidth: 240,
          minHeight: 128,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
        className={styles.card}
      >
        <CardContent>
          <Typography sx={{ fontSize: 20, marginBottom: 0 }} color="black" gutterBottom>
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {air_date}
          </Typography>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            fontWeight="bold"
            textTransform="uppercase"
            paddingTop="5px"
          >
            {episode}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
