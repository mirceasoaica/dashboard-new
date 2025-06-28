import { Link as NativeLink, LinkProps, useLocation } from "react-router-dom";

export default Link

function Link(props: LinkProps & { modal?: boolean }) {
    const {modal, children, ...options} = props;
    const location = useLocation();

    return <NativeLink {...options} state={modal ? {
        background: location,
    } : {}}>{children}</NativeLink>
}