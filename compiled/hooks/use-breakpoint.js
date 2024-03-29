import { useMediaQuery, useTheme } from "@material-ui/core";
export function useBreakpoint(breakpoint) {
    const theme = useTheme();
    const mediaQuery = useMediaQuery(theme.breakpoints.down(breakpoint));
    return mediaQuery;
}
