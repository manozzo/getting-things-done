import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { MoreVertical } from "react-feather";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import DoneIcon from "@material-ui/icons/Done";

export default function Tarefa({
  titulo,
  inicio,
  fim,
  descricao,
  editar,
  excluir,
  isComplete,
  concluir,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const openAction = Boolean(anchorEl);

  const handleClick = (el) => setAnchorEl(el.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Grid container sx={{ my: 1 }} spacing={3}>
      <Grid item xs={8}>
        <Card
          sx={{
            boxShadow:
              isComplete ? "inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff" : "-5px 5px 10px rgba(185, 185, 185, 0.2), 5px -5px 10px rgba(185, 185, 185, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(185, 185, 185, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(185, 185, 185, 0.5)",
            p: 1,
            backgroundColor: "#E0E0E0",
          }}
        >
          <CardHeader
            action={
              <>
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
                <IconButton>
                  <Checkbox
                    disableRipple
                    onChange={concluir}
                    checked={isComplete}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<DoneIcon color="success"/>}
                  />
                </IconButton>
              </>
            }
            title={`${inicio} - ${fim}`}
          />

          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ textDecoration: isComplete ? "line-through" : "none"}} >{descricao}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h2">{titulo}</Typography>
      </Grid>
    </Grid>
  );
}
