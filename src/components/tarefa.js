import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { MoreVertical } from "react-feather";
const style = {
  my: 1,
};

export default function Tarefa({
  titulo,
  inicio,
  fim,
  descricao,
  editar,
  excluir,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const openAction = Boolean(anchorEl);

  const handleClick = (el) => setAnchorEl(el.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Grid container sx={style} spacing={3}>
      <Grid item xs={6}>
        <Card>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertical
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={openAction ? "true" : undefined}
                  onClick={handleClick}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openAction}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={editar}>Editar</MenuItem>
                  <MenuItem onClick={excluir}>Excluir</MenuItem>
                </Menu>
              </IconButton>
            }
            title={`${inicio} - ${fim}`}
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>{descricao}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Typography fontSize={48}>{titulo}</Typography>
      </Grid>
    </Grid>
  );
}
