import * as React from "react";
import { Button, makeStyles, SvgIcon } from '@mui/material';
import { ReactComponent as GoogleIcon} from '../../assets/Google_G_Logo.svg'

interface GoogleButtonProps {
    onClick: () => void;
}
export default function GoogleButton(props: GoogleButtonProps) {
    
    return ( <Button
        // className={classes.googleLogin}
        onClick = {props.onClick}
        variant="contained"
      >
        <SvgIcon component={GoogleIcon}></SvgIcon>

      &nbsp;

        Continue with Google
      </Button>);
}