import { Button, Card, CardContent, CardHeader, Grid, Typography } from "@material-ui/core";
import Icone from "./icone";

const style = {
  my: 1
}

export default function Tarefa({ titulo, data, descricao, editar, excluir }) {
  return (
    <Grid container sx={style} spacing={3}>
      <Grid item xs={6}>
        <Card>
          <CardHeader title={data} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {descricao}
              </Grid>
            </Grid>
          </CardContent>
          <Button onClick={editar}>Editar</Button>
          <Button onClick={excluir}>Remover</Button>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Typography fontSize={48} >{titulo}</Typography>
      </Grid>
    </Grid>
  );
}
