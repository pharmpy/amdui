import {getInitColorSchemeScript} from '@mui/material/styles';

export function onRenderBody({setPreBodyComponents}) {
	setPreBodyComponents([getInitColorSchemeScript()]);
}
