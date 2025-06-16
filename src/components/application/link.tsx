import { Link, LinkProps, useLocation } from "react-router-dom";

export default function (props: LinkProps & {modal?: boolean}) {
    const {modal, children, ...options} = props;
    const location = useLocation();

    return <Link {...options} state={modal ? {
        background: location,
        type: 'sheet',
    } : {}}>{children}</Link>
}