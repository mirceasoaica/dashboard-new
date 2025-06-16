import { NavigateOptions, To, useLocation, useNavigate } from "react-router-dom"

export function useModalNavigate(): (to: To, options?: NavigateOptions) => void | Promise<void> {
  const location = useLocation();
  const navigate = useNavigate();

  return (to: To, options?: NavigateOptions): void | Promise<void> => {
    navigate(to, {
        ...(options || {}),
        state: {
            background: location,
        }
    });
  };
}
