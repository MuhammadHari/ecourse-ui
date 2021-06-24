import { useMediaQuery, useTheme } from "@material-ui/core";
export function useResposiveCycles({ sm, lg, md }) {
    const theme = useTheme();
    const isCurrentBreakpoint = (v) => useMediaQuery(v);
    const isMd = isCurrentBreakpoint(theme.breakpoints.only("md"));
    const isLg = isCurrentBreakpoint(theme.breakpoints.only("lg"));
    if (isLg) {
        return lg ?? md ?? sm;
    }
    if (isMd) {
        return md ?? sm;
    }
    return sm;
}
