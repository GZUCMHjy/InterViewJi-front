// 用于检验用户是否有权限
import ACCESS_ENUM from "@/access/accessEnum";
import {log} from "node:util";
// 当前用户有什么权限，以及当前访问的页面需要什么权限
// 因此有两个参数
/**
 * 检查权限（判断当前登录用户是否具有某个权限）
 * @param loginUser
 * @param needAccess
 */
const checkAccess = (loginUser:API.LoginUserVO,needAccess= ACCESS_ENUM.NOT_LOGIN) =>{
    const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
    // 不需要登录，访客模式
    if (needAccess === ACCESS_ENUM.NOT_LOGIN){
        return true;
    }
    // 需要登录
    if(needAccess === ACCESS_ENUM.USER){
        if(loginUserAccess === ACCESS_ENUM.NOT_LOGIN){
            // 直接返回
            return false;
        }
    }
    if(needAccess == ACCESS_ENUM.ADMIN){
        if(loginUserAccess != ACCESS_ENUM.ADMIN){
            return false;
        }
    }
    return true;
}
export default checkAccess;
