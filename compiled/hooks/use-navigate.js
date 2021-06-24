import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import voca from "voca";
export function useNavigate() {
    const history = useHistory();
    const navigate = useCallback((path) => history.push(path), []);
    const withParames = (path, params) => {
        let to = voca(path);
        Object.keys(params).forEach((key) => {
            to = to.replaceAll(`:${key}`, params[key]);
        });
        return navigate(to.value());
    };
    const back = () => history.goBack();
    const callback = useCallback((path, params = {}) => {
        return () => {
            if (params) {
                return withParames(path, params);
            }
            navigate(path);
        };
    }, []);
    return { navigateHandler: callback, navigate, back };
}
