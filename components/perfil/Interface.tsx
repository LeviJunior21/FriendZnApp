import { Navigation } from "../../utils/interfaces";

type PerfilProps = {
    route: {
        params: {
            id: number,
            navigation: Navigation
        };
    };
};

export { PerfilProps }