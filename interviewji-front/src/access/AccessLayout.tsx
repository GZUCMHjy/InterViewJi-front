import {withRouter} from "next/router";
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {findAllMenuItemByPath} from "../../config/menu";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";

/**
 * 统一权限校验拦截器
 * @param children
 * @constructor
 */
const AccessLayout: React.FC<
    Readonly<{
        children: React.ReactNode;
    }>
> = ({children}) => {
    const pathname = usePathname();
    const loginUser = useSelector((state:RootState) => state.loginUser);
    const menu = findAllMenuItemByPath(pathname) || {};
    const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;
    console.log("" + loginUser)
    console.log("需要的权限" +needAccess)
    const canAccess = checkAccess(loginUser,needAccess);
    console.log(canAccess)
    if(!canAccess){
        return <Forbidden/>
    }
    return  <>{children}</>;
};
export default AccessLayout;
