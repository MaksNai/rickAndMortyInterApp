import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./locationCard.module.scss";

export function LocationCard({ locations }) {
  const { locationName, dimension } = locations;
  return (
    <a href="#" className={styles.cardLink}>
      <Card
        sx={{
          maxWidth: 240,
          minWidth: 240,
          minHeight: 128,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
        className={styles.card}
      >
        <CardContent>
          <Typography sx={{ fontSize: 20, marginBottom: 0 }} color="black" gutterBottom>
            {locationName}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {dimension}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}
